import React, { useEffect } from 'react';
import { BiSpreadsheet } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import { IoHomeOutline } from 'react-icons/io5';
import { SlSettings } from 'react-icons/sl';
import { IoCreateOutline } from 'react-icons/io5';
import { MdOutlineLogout } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn';

const Sidebar = ({ isExpanded, toggleSidebar, shouldNavigate }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.userData);

  const handleAvatarClick = () => {
    if (currentUser?.avatar) {
      navigate(`/profile/${currentUser._id}`);
    } else {
      navigate('/add-profile');
    }
    if (isExpanded) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    if (shouldNavigate) {
      navigate('/home');
    }
  }, [shouldNavigate, navigate]);

  const handleNavigation = (path) => {
    navigate(path);
    if (isExpanded) {
      toggleSidebar();
    }
  };

  return (
    <>
      <aside
        className={`fixed sm:w-64 hidden md:block shadow-md left-0 top-12 h-full bg-white text-gray-800 transition-all duration-100`}
      >
        <div className="flex flex-col items-center justify-between h-full py-4">
          <div className="flex flex-col space-y-5 mt-8 text-gray-600">
            <div className="flex items-center gap-2 px-2 rounded cursor-pointer">
              <div
                onClick={() => navigate('/home')}
                className="flex items-center gap-2  rounded cursor-pointer"
              >
                <IoHomeOutline size={24} />
                <span>Home</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-2 rounded cursor-pointer">
              <div
                className="flex items-center gap-2  rounded cursor-pointer"
                onClick={handleAvatarClick}
              >
                <BsPerson size={24} />
                <span>Profile</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-2 rounded cursor-pointer">
              <div
                className="flex items-center gap-2  rounded cursor-pointer"
                onClick={() => navigate(`/add-post`)}
              >
                <IoCreateOutline size={24} />
                <span>Create</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-2 rounded cursor-pointer">
              <div
                className="flex items-center gap-2  rounded cursor-pointer"
                onClick={() => navigate(`/timeline/${currentUser._id}`)}
              >
                <BiSpreadsheet size={24} />
                <span>My Timeline</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 px-2 mb-5 rounded cursor-pointer">
              <div
                className="flex items-center gap-2  rounded cursor-pointer"
                onClick={() => navigate('/account')}
              >
                <SlSettings size={24} />
                <span>Setting</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-2 rounded cursor-pointer mb-16">
              <LogoutBtn>
                <MdOutlineLogout size={22} />
                <span>Logout</span>
              </LogoutBtn>
            </div>
          </div>
        </div>
      </aside>

      <aside
        className={`fixed left-0 top-12 mt-5  h-full shadow-md bg-white transition-all duration-100 z-50 ${
          isExpanded ? 'w-64' : 'w-16'
        } sm:top-12 sm:h-[calc(100%-3rem)] sm:block 
  ${isExpanded ? 'block' : 'hidden'} md:hidden lg:${
    isExpanded ? 'hidden' : 'hidden'
  }`}
      >
        <div className="flex flex-col justify-between h-full mt-5 items-center">
          <div>
            <div
              className={`p-2 cursor-pointer text-gray-700 rounded hidden sm:block`}
              onClick={toggleSidebar}
            >
              <GiHamburgerMenu size={24} />
            </div>

            <div className="flex flex-col space-y-5 pt-4">
              <div className="flex items-center gap-2 px-2 rounded cursor-pointer text-gray-500">
                <div
                  className="flex items-center gap-2  rounded cursor-pointer"
                  onClick={() => handleNavigation('/home')}
                >
                  <IoHomeOutline size={24} />
                  {isExpanded && (
                    <span className="text-gray-700 font-medium">Home</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 px-2 rounded cursor-pointer text-gray-500">
                <div
                  className="flex items-center gap-2  rounded cursor-pointer"
                  onClick={handleAvatarClick}
                >
                  <BsPerson size={24} />
                  {isExpanded && (
                    <span className="text-gray-700 font-medium">Profile</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 px-2 rounded cursor-pointer text-gray-500">
                <div
                  className="flex items-center gap-2  rounded cursor-pointer"
                  onClick={() => handleNavigation(`/add-post`)}
                >
                  <IoCreateOutline size={24} />
                  {isExpanded && (
                    <span className="text-gray-700 font-medium">Create</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 px-2 rounded cursor-pointer text-gray-500">
                <div
                  className="flex items-center gap-2  rounded cursor-pointer"
                  onClick={() => handleNavigation(`/timeline/${currentUser._id}`)}
                >
                  <BiSpreadsheet size={24} />
                  {isExpanded && (
                    <span className="text-gray-700 font-medium">My Timeline</span>
                  )}
                </div>
              </div>

              

            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 px-2 mb-5 rounded cursor-pointer text-gray-500">
              <div
                className="flex items-center gap-2  rounded cursor-pointer"
                onClick={() => handleNavigation('/account')}
              >
                <SlSettings size={24} />
                {isExpanded && (
                  <span className="text-gray-700 font-medium">Setting</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 px-2 rounded cursor-pointer text-gray-500 mb-20">
              <LogoutBtn>
                <MdOutlineLogout size={22} />
                {isExpanded && (
                  <span className="text-gray-700 font-medium">Logout</span>
                )}
              </LogoutBtn>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
