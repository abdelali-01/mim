import { useState } from 'react';
import { Modal } from '../ui/modal';

import DatePicker from '../form/date-picker';
import { AppDispatch } from '@/store/store';
import { addTrodatRegisterPage } from '@/store/trodat-register/trodatRegisterHandler';
import { useDispatch } from 'react-redux';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTrodatPageModal({ isOpen, onClose }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    try {
      if (selectedDate) {
        // Set the time to noon to avoid timezone issues
        const date = new Date(selectedDate);
        date.setHours(12, 0, 0, 0);
        await dispatch(addTrodatRegisterPage(date));
      }
      onClose();
    } catch (error) {
      console.error('Error adding page:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] p-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white/90">
          Add New Trodat Page
        </h3>
        
        <div className="mt-4">
          <DatePicker
            id="trodat-page-date"
            label="Select Date"
            placeholder="Choose a date"
            defaultDate={selectedDate || undefined}
            onChange={(dates) => {
              if (dates && dates.length > 0) {
                setSelectedDate(dates[0]);
              }
            }}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Add Page
          </button>
        </div>
      </div>
    </Modal>
  );
} 