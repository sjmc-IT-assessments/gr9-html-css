import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';

const SubmitModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  selectedTopic 
}) => {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(name, studentClass);
    setName('');
    setStudentClass('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Submit Your Work</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block mb-1">
              Class <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your class (e.g., 9A)"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 p-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!name || !studentClass || !selectedTopic}
              className="flex-1 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;