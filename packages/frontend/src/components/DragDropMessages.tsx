import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Message } from '../types'; // Assuming the Message type is defined somewhere

// Lazy load RenderYear component
const RenderYear = React.lazy(() => import('./RenderYear'));

const DragDropMessages = ({
  groupedList,
}: {
  groupedList: Record<string, Message[]>;
}) => {
  const [visibleYears, setVisibleYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [allYearsLoaded, setAllYearsLoaded] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // Reference for the load more trigger
  const [isAtBottom, setIsAtBottom] = useState(false);

  const loadMoreYears = () => {
    setLoading(true);
    setTimeout(() => {
      const remainingYears = Object.keys(groupedList).slice(
        visibleYears.length,
        visibleYears.length + 4,
      );

      if (remainingYears.length === 0) {
        setAllYearsLoaded(true); // No more years to load
      }

      setVisibleYears((prev) => [...prev, ...remainingYears]);
      setLoading(false);
    }, 500); // Simulate a network delay
  };

  useEffect(() => {
    // Initial load of the first 4 years
    setVisibleYears(Object.keys(groupedList).slice(0, 4));
  }, [groupedList]);

  useEffect(() => {
    // Intersection observer to trigger loading when scrolled to the bottom
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAtBottom(true);
        } else {
          setIsAtBottom(false);
        }
      },
      {
        rootMargin: '0px',
        threshold: 1.0, // Trigger when the element is fully visible
      },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Trigger load more years when scrolled to bottom and not already loading
    if (isAtBottom && !loading && !allYearsLoaded) {
      loadMoreYears();
    }
  }, [isAtBottom, loading, allYearsLoaded]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {visibleYears.map((year) => (
        <Suspense key={year} fallback={<div>Loading year {year}...</div>}>
          <RenderYear year={year} listofItems={groupedList[year]} />
        </Suspense>
      ))}
      {loading && !allYearsLoaded ? (
        <div className="text-center mt-4">Loading more years...</div>
      ) : (
        <div ref={loadMoreRef} className="h-2"></div> // Invisible trigger element at the bottom
      )}
    </div>
  );
};

export { DragDropMessages };
