import React from 'react';
import { useSelector } from 'react-redux';

function LikesModal({ isOpen, onClose }) {
  const { likes = [], loading, error } = useSelector((state) => state.likes);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">People who liked this post</h2>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="max-h-64 overflow-y-auto">
          {likes.length > 0 ? (
            likes.map((like) => (
              <div
                key={like.profiles.owner}
                className="flex items-center gap-3 mb-3"
              >
                <img
                  src={like.profiles.avatar || 'https://shorturl.at/aA6Ek'}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-800">{like.profiles.firstName + " "+ like.profiles.lastName}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No likes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LikesModal;
