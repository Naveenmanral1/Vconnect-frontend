import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { deletePost, fetchAllPosts } from '../../store/postSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Dropdown({ _id }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    if (_id) {
      await dispatch(deletePost({ _id })).then(() => navigate('/home'));
      dispatch(fetchAllPosts({ queryParams: {} }));
    }
  };

  return (
    <div className="relative inline-block  text-left text-gray-500 ">
      <FaEllipsisH onClick={toggleDropdown} size={14} />

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 w-full">
            <div
              className="w-full hover:bg-gray-100 rounded "
              onClick={() => navigate(`/edit-post/${_id}`)}
            >
              <button className="block px-4 py-2 text-sm text-gray-700  hover:text-gray-900">
                Edit
              </button>
            </div>
            <div
              className="w-full  hover:bg-gray-100 rounded"
              onClick={handleDelete}
            >
              <button className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
