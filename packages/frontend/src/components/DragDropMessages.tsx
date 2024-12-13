import { DragDrop } from '../commonComponents';
import { Message } from '../types';

const renderComponent = (item: Message) => {
  const { date, message } = item || {};
  return (
    <div className="bg-transparent">
      <p className="text-xs text-gray-500">{date}</p>
      <p className="text-xs font-medium">{message}</p>
    </div>
  );
};

const DragDropMessages = ({
  groupedList,
}: {
  groupedList: Record<string, Message[]>;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
    {Object.keys(groupedList).map((year) => (
      <div
        key={year}
        className="flex-1 min-w-[300px] bg-purple-light rounded-lg shadow-lg p-4"
      >
        <h2 className="text-xl font-semibold mb-4">{year}</h2>
        <DragDrop
          listofItems={groupedList[year]}
          renderTiles={renderComponent}
          groupId={`${year}`}
        />
      </div>
    ))}
  </div>
);

export { DragDropMessages };
