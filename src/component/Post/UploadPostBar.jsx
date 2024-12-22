import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HiCamera } from 'react-icons/hi2';
import { HiGif } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../store/authSlice';

function ActivityFeed() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await dispatch(getCurrentUser()).unwrap();
      if (data) {
        setUser(data);
      }
    };
    fetchProfile();
  }, [dispatch]);

  const navigate = useNavigate();

  return (
    <div>
      <div
        onClick={() => navigate(`/add-post`)}
        className="bg-white border rounded-lg shadow-sm  max-w-xl "
      >
        <div className="flex items-center p-4 ">
          <div className="flex items-center ">
            <img
              src={user?.avatar}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="ml-3 text-gray-500">
            <h1>Share what's on your mind, {user?.fullName}.....</h1>
          </div>
        </div>

        <div className="border-t border-gray-300 "></div>

        <div className="flex items-center gap-4 text-gray-500 ml-4 p-3">
          <div className="flex items-center gap-2">
            <HiCamera size={24} />
          </div>
          <div className="flex items-center gap-2">
            <HiGif size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityFeed;
