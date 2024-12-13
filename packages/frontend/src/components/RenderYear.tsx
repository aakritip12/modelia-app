import { DragDrop } from '../commonComponents'; // The drag-and-drop functionality for messages
import { Message } from '../types'; // Assuming the Message type is defined somewhere

// Component to render each individual message tile
const renderComponent = (item: Message) => {
  const { date, message } = item || {};
  return (
    <div className="bg-transparent">
      <p className="text-xs text-gray-500">{date}</p>
      <p className="text-xs font-medium">{message}</p>
    </div>
  );
};

// RenderYear component that shows messages grouped by year
const RenderYear = ({
  year,
  listofItems,
}: {
  year: string;
  listofItems: Message[];
}) => {
  return (
    <div className="flex-1 min-w-[300px] bg-purple-light rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4">{year}</h2>
      <div className="max-h-[300px] overflow-y-auto">
        <DragDrop
          listofItems={listofItems} // Pass the messages of this year
          renderTiles={renderComponent} // Define how each tile is rendered
          groupId={`${year}`} // The group ID for the drag-and-drop functionality
        />
      </div>
    </div>
  );
};

export default RenderYear;
