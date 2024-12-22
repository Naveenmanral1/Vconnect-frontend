import React from 'react';
import Dropdown from '../ExtraComp/DropDown';
import parse from 'html-react-parser';
import Like from '../Like/Like';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Card = ({
  isLiked,
  _id,
  likesCount,
  owner,
  createdAt,
  ownerName,
  ownerAvatar,
  image,
  description,
}) => {
  const currentUser = useSelector((state) => state.auth.userData);
  const isAuthor = currentUser ? owner === currentUser._id : false;
  const navigate = useNavigate();

  return (
    <div className="bg-white border rounded-lg shadow-md p-4 max-w-xl mx-auto">
      <div className="flex justify-between">
        <div className="flex items-center justify-between mb-4">
          <img
            onClick={() => navigate(`/profile/${owner}`)}
            src={ownerAvatar}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <h4 className="font-semibold text-gray-800">{ownerName}</h4>
            <p className="text-sm text-gray-500">{createdAt}</p>
          </div>
        </div>
        <div className="p-2 cursor-pointer text-gray-500 rounded">
          {isAuthor && <Dropdown _id={_id} />}
        </div>
      </div>

      <div className="text-gray-700 mb-4">{parse(description || '')}</div>

      <div className="mb-4">
        <img src={image} alt="Scenery" className="w-full rounded-lg" />
      </div>
      <div>
        <Like
          isLiked={isLiked}
          likesCount={likesCount}
          postId={_id}
          size={25}
        />
      </div>
    </div>
  );
};

export default Card;
