import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPageFollower } from '../../store/followSlice';
import Modal from '../ExtraComp/Modal';
function PageFollowers({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const pageId = useSelector((state) => state.profiles.profile?.owner);
  const {
    pageFollowers = [],
    loading,
    error,
  } = useSelector((state) => state.follows);

  useEffect(() => {
    if (isOpen && pageId) {
      dispatch(getUserPageFollower(pageId));
    }
  }, [dispatch, isOpen, pageId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Followers">
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {pageFollowers.length > 0 ? (
        pageFollowers.map((followers) => (
          <div
            key={followers?.follower?._id}
            className="flex items-center gap-3 mb-3"
          >
            <img
              src={followers?.follower?.avatar || 'https://shorturl.at/aA6Ek'}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-gray-800">
              {followers?.follower?.fullName}
            </span>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No followers yet.</p>
      )}
    </Modal>
  );
}

export default PageFollowers;
