import { FormEvent, useState } from 'react';
import { Message } from '../types';

const AddTileForm = ({ onClose }: { onClose: (data?: Message) => void }) => {
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ date: '', message: '' });

  const isValidDate = (date: string): boolean => {
    const regex =
      /^(?:19|20)\d\d-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/;
    return regex.test(date);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validation
    let isValid = true;
    const newErrors = { date: '', message: '' };

    if (!date) {
      newErrors.date = 'Date is required';
      isValid = false;
    } else if (!isValidDate(date)) {
      newErrors.date = 'Invalid date format. Use YYYY-MM-DD';
      isValid = false;
    }

    if (!message) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      onClose({ date, message }); // Close modal on successful submission
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Submit Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="YYYY-MM-DD"
              className={`mt-1 p-2 w-full border ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              } rounded`}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className={`mt-1 p-2 w-full border ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              } rounded`}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => onClose()}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { AddTileForm };
