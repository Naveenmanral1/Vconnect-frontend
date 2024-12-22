import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../store/authSlice';

function Navbar({ toggleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await dispatch(getCurrentUser()).unwrap();
      if (data) {
        setUser(data);
      }
    };
    fetchUser();
  }, [dispatch]);

  const handleAvatarClick = () => {
    if (user?.avatar) {
      navigate(`/profile/${user._id}`);
    } else {
      navigate('/add-profile');
    }
  };

  return (
    <nav className="bg-white text-black fixed top-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center ">
          <div
            className="p-2 cursor-pointer rounded text-gray-700 sm:hidden"
            onClick={toggleSidebar}
          >
            <GiHamburgerMenu size={24} />
          </div>

          <div
            onClick={() => navigate('/home')}
            className="flex items-center pl-2 sm:pl-6 "
          >
            <img
              src="https://img.freepik.com/free-vector/illustration-share-icon_53876-5620.jpg?t=st=1733990994~exp=1733994594~hmac=3a05ec8cc7a4e3c56f5e45f0219d72a4b0f4fada424a0afedec34df461ec97a6&w=826"
              alt="logo"
              className="w-12 h-12 rounded-full -rotate-90"
            />

            <div className="flex  ml-3 items-center">
              <h2 className="hidden sm:block font-semibold text-lg text-gray-800">
                V
              </h2>
              <h4 className="hidden sm:block font-semibold text-lg text-gray-800">
                Connect
              </h4>
            </div>
          </div>
        </div>
        <div className="flex items-center ">
          <img
            onClick={handleAvatarClick}
            src={user?.avatar}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3 hidden sm:block">
            <h4 className="font-semibold text-gray-800">{user?.fullName}</h4>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
