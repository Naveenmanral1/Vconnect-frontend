import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './component/SideBar/Sidebar';
import Navbar from './component/Header/Navbar';
import { getCurrentUser } from './store/authSlice';
import { useDispatch } from 'react-redux';

import './App.css';

function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const excludePaths = ['/', '/signup'];
  const isDashboardPage = excludePaths.includes(location.pathname);

  useEffect(() => {
    getCurrentUser();
  }, [dispatch]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="">
      <div>
        {!isDashboardPage && (
          <Navbar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        )}
        {!isDashboardPage && (
          <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        )}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
