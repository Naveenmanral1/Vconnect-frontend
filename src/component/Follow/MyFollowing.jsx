import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowedPages } from '../../store/followSlice';
import Modal from '../ExtraComp/Modal';

function MyFollowings({ isOpen, onClose, followingCount }) {
  const dispatch = useDispatch();
  const followerId = useSelector((state) => state.profiles.profile.owner);
  const {
    myFollowings = [],
    loading,
    error,
  } = useSelector((state) => state.follows);

  useEffect(() => {
    if (isOpen && followerId) {
      dispatch(getFollowedPages(followerId));
    }
  }, [dispatch, isOpen, followerId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Following">
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {myFollowings.length > 0 ? (
        myFollowings.map((following) => (
          <div
            key={following?.followedPage?._id}
            className="flex items-center gap-3 mb-3"
          >
            <img
              src={
                following?.followedPage?.avatar || 'https://shorturl.at/aA6Ek'
              }
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-gray-800">
              {following?.followedPage?.fullName}
            </span>
          </div>
        ))
      ) : (
        <p className="text-gray-500">You are not following anyone yet.</p>
      )}
    </Modal>
  );
}

export default MyFollowings;
