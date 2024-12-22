import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggelFollow } from '../../store/followSlice.js';
import MyFollowings from './MyFollowing.jsx';
import PageFollowers from './PageFollowers.jsx';
import { Button } from '../LogSignExtra/index.js';

function FollowCount({ isFollowed, followersCount, followedCount }) {
  const [localIsFollowed, setLocalIsFollowed] = useState(isFollowed);
  const [localFollowersCount, setLocalFollowersCount] = useState(followersCount);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const profile = useSelector((state) => state.profiles.profile);
  const isUser = profile && userData ? profile.owner === userData._id : false;

  const pageId = profile?.owner;

  const handleFollow = () => {
    dispatch(toggelFollow(pageId));
    setLocalIsFollowed((prev) => !prev);
    setLocalFollowersCount((prev) => (localIsFollowed ? prev - 1 : prev + 1));
  };

  const handleOpenFollowerModal = () => {
    if (pageId) {
      setIsModalOpen(true);
    }
  };

  const handleCloseFollowerModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenFollowingModal = () => {
    setIsFollowingModalOpen(true);
  };

  const handleCloseFollowingModal = () => {
    setIsFollowingModalOpen(false);
  };

  useEffect(() => {
    setLocalIsFollowed(isFollowed);
    setLocalFollowersCount(followersCount);
  }, [isFollowed, followersCount]);

  return (
    <>
      <div className="flex items-center gap-2">
        {!isUser && (
          <Button
            onClick={handleFollow}
            className={`border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 ${
              localIsFollowed ? 'bg-gray-300' : 'bg-purple-500'
            }`}
          >
            {localIsFollowed ? 'Following' : 'Follow'}
          </Button>
        )}
        <span
          className="text-md mr-3 cursor-pointer text-blue-500 underline"
          onClick={handleOpenFollowerModal}
        >
          {localFollowersCount} Followers
        </span>

        {isModalOpen && (
          <PageFollowers
            isOpen={isModalOpen}
            onClose={handleCloseFollowerModal}
          />
        )}

        <span
          className="text-md cursor-pointer text-blue-500 underline"
          onClick={handleOpenFollowingModal}
        >
          {followedCount} Following
        </span>

        {isFollowingModalOpen && (
          <MyFollowings
            isOpen={isFollowingModalOpen}
            onClose={handleCloseFollowingModal}
          />
        )}
      </div>
    </>
  );
}

export default FollowCount;
