import { useEffect, useState } from 'react';

import { useModal } from '../commonComponents';
import { AddTileForm, DragDropMessages } from '../components';
import { Message } from '../types';

const groupByYear = (messages: Message[], isSorted: boolean) => {
  return messages.reduce(
    (acc, curr) => {
      const year = curr.date.split('-')[0]; // Extract the year from the date
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(curr);

      // Sort the messages for the year if isSorted is true
      if (isSorted) {
        acc[year].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
      }

      return acc;
    },
    {} as Record<string, Message[]>,
  );
};

const MessageList = () => {
  const [loading, setLoading] = useState(true);
  const [isSorted, setIsSorted] = useState(false);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [orderedList, setOrderedList] = useState<Record<string, Message[]>>({});
  const { open, close, Modal } = useModal();

  const handleNewTileSubmit = (formInput?: Message) => {
    if (formInput !== undefined) {
      const newList = [...messageList, {...formInput, isNew: true}];
      setMessageList(newList); // Update the message list
      const groupedList = groupByYear(newList, isSorted); // Group messages by year
      setOrderedList(groupedList); // Update ordered list
    }
    close();
  };

  const orderList = (shouldSort: boolean) => {
    setIsSorted(shouldSort);
    const tempList = messageList.map((msg) => ( { ...msg, isNew: false }));
    setMessageList(tempList);
    const groupedList = groupByYear(tempList, shouldSort);
    setOrderedList(groupedList);
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/messages`,
      );
      const data: Message[] = await response.json();
      setMessageList(data);
      const groupedList = groupByYear(data, false);
      setOrderedList(groupedList);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []); // This will run only once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Modal>
        <h2 className="text-lg font-bold mb-4">Add New Tile</h2>
        <p className="text-gray-700 mb-4">This is the modal content.</p>
        <AddTileForm
          onClose={(newTileData) => handleNewTileSubmit(newTileData)}
        />
      </Modal>
      <div className="flex justify-end p-4 space-x-4">
        <button
          className="bg-yellow-mustard text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-green-dark active:bg-green-dark focus:outline-none transition duration-300"
          onClick={open}
        >
          Add New Tile
        </button>
        <button
          className={`bg-pink-light text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-magenta-light hover:border-magenta-light active:magenta-light focus:outline-none transition duration-300 border-b-4
            ${!isSorted ? 'border-magenta-light' : 'border-pink-light'}
            `}
          onClick={() => orderList(false)}
        >
          Initial Order
        </button>
        <button
          className={`bg-pink-light text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-magenta-light hover:border-magenta-light active:magenta-light focus:outline-none focus:magenta-light transition duration-300 border-b-4
            ${isSorted ? 'border-magenta-light' : 'border-pink-light'}`}
          onClick={() => orderList(true)}
        >
          Sorted Order
        </button>
      </div>

      <DragDropMessages groupedList={orderedList} />
    </div>
  );
};

export { MessageList };
