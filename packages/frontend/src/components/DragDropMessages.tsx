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

const RenderYear = ({
    year,
    listofItems,
  }: {
    year: string;
    listofItems: Message[];
  }) => (
    <div className="flex-1 min-w-[300px] bg-purple-light rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4">{year}</h2>
      <div className="max-h-[300px] overflow-y-auto">
        <DragDrop
          listofItems={listofItems}
          renderTiles={renderComponent}
          groupId={`${year}`}
        />
      </div>
    </div>
  );

  
  export default RenderYear

const DragDropMessages = ({
  groupedList,
}: {
  groupedList: Record<string, Message[]>;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
    {Object.keys(groupedList).map((year) => ( <RenderYear key={year} year={year} listofItems={groupedList[year]} />
    ))}
  </div>
);

export { DragDropMessages };
