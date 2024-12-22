import { BiSolidLike } from 'react-icons/bi';
import { GoComment } from 'react-icons/go';

import React, { useEffect, useState } from 'react';
import { togglePostLike } from '../../store/likeSlice';
import { useDispatch } from 'react-redux';
import { fetchLikes } from '../../store/likeSlice';
import LikesModal from './LikesDetail';

function Like({ isLiked, likesCount = 0, postId, size }) {
  const dispatch = useDispatch();
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [localLikesCount, setLocalLikesCount] = useState(likesCount);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLikeToggle = () => {
    if (localIsLiked) {
      setLocalLikesCount((prev) => prev - 1);
    } else {
      setLocalLikesCount((prev) => prev + 1);
    }

    setLocalIsLiked((prev) => !prev);

    if (postId) {
      dispatch(togglePostLike(postId));
    }
  };

  const handleOpenModal = () => {
    if (postId) {
      dispatch(fetchLikes(postId));
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setLocalIsLiked(isLiked);
    setLocalLikesCount(likesCount);
  }, [isLiked, likesCount]);

  return (
    <>
      <div>
        <div className="flex items-center justify-between text-gray-600 m-2">
          <div
            onClick={handleOpenModal}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <BiSolidLike size={24} />
            <span className="text-gray-700">{localLikesCount}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-900 hover:text-blue-800">
            <span className="text-gray-400"></span>
          </div>
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        <div className="flex items-center justify-between text-gray-600 ml-4 sm:ml-16 sm:mr-16">
          <div className="flex items-center gap-2">
            <BiSolidLike
              size={24}
              onClick={handleLikeToggle}
              className={`cursor-pointer ${localIsLiked ? 'text-blue-600' : ''}`}
            />
            <span className="text-black">Like</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 hover:text-blue-800">
            <GoComment size={24} />
            <span className=" text-gray-300">Comment</span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <LikesModal isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default Like;
