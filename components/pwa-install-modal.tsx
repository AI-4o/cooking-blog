import React from 'react';

const PwaModal = ({ onClose, onInstall, show }: any) => {
  if (!show) {
    return null;
  }

  return (
    <div>
      <div className="fixed inset-0 text-black z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
          <h2 className="text-xl font-bold mb-4">Install PWA</h2>
          <p className="mb-4">To install this app, click the button below.</p>
          <div className="flex gap-4 ">
            <button
              onClick={onInstall}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Install
            </button>
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PwaModal;
