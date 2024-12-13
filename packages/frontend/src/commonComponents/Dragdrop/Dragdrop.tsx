import { ReactNode, useEffect, useState } from 'react';
import './DragDrop.css'; // Add animation styles here

interface BaseTile {
  isNew?: boolean; // Make it optional if not all items have this property
}
interface DragDropProps<T extends BaseTile> {
  listofItems: T[];
  renderTiles: (item: T) => ReactNode;
  groupId: string | null;
}

const DragDrop = <T extends BaseTile,>({
  listofItems,
  renderTiles,
  groupId,
}: DragDropProps<T>) => {
  const [tiles, setTiles] = useState<T[]>([]);
  const [draggedTile, setDraggedTile] = useState<number | null>(null);
  const [droppedTileIndex, setDroppedTileIndex] = useState<number | null>(null);
  const [draggedGroup, setDraggedGroup] = useState<string | null>(null);

  const handleDragStart = (index: number): void => {
    setDraggedTile(index);
    setDraggedGroup(groupId);
  };

  const handleDragOver = (index: number): void => {
    if (draggedTile === null || draggedTile === index) return;

    const newTiles = [...tiles];
    const draggedTileContent = newTiles[draggedTile];
    newTiles.splice(draggedTile, 1); // Remove the dragged tile
    newTiles.splice(index, 0, draggedTileContent); // Add it at the new position

    setDraggedTile(index); // Update dragged index
    setTiles(newTiles); // Update the state with the new order
  };

  const handleDrop = (index: number): void => {
    setDraggedTile(null); // Reset dragged tile
    setDroppedTileIndex(index); // Highlight the dropped tile
    setTimeout(() => setDroppedTileIndex(null), 300);
  };

  useEffect(() => {
    setTiles(listofItems);
  }, [listofItems]);

  const getBackgroundClass = (tile: T, index: number): string => {
    if (droppedTileIndex === index && draggedGroup === groupId) {
      return 'bg-green-100 animate-bounce';
    }
    if (tile.isNew) {
      return 'animate-color-change';
    }
    return 'bg-white';
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-4">
      {tiles.map((tile, index) => (
        <div
          key={index}
          className={`p-3 shadow-md rounded-md border border-gray-200 hover:shadow-lg transition-transform duration-300 ease-in-out cursor-pointer
            ${getBackgroundClass(tile, index)}
            ${draggedTile === index ? 'scale-105' : ''}
            `}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => {
            e.preventDefault(); // Prevent default to allow drop
            handleDragOver(index);
          }}
          onDrop={() => handleDrop(index)}
        >
          {renderTiles(tile)}
        </div>
      ))}
    </div>
  );
};

export { DragDrop };
