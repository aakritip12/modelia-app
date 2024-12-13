import React, { useState, ReactNode, useCallback } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-96 p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const ModalWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <Modal isOpen={isOpen} onClose={close}>
      {children}
    </Modal>
  );

  return { open, close, Modal: ModalWrapper };
};
