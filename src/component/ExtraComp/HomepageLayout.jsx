import React from 'react';
import ActivityFeed from '../Post/UploadPostBar';
import { useNavigate, useLocation } from 'react-router-dom';

function HomePageLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <main className="sm:ml-16 md:ml-64 bg-gray-50 min-h-screen">
      <div
        id="home"
        className="flex justify-center sm:space-x-5 min-h-screen bg-zinc-50 shadow-md p-4 sm:p-6 pt-20 sm:mt-10"
      >
        <div className="flex flex-col gap-y-5 sm:mt-4">
          <div className="text-2xl font-bold ml-2 text-gray-700">
            <h1>Activity Feed</h1>
          </div>
          <ActivityFeed />
          <div className="flex ml-2 gap-12 text-gray-700 font-medium">
            <div
              onClick={() => navigate('/home')}
              className={`py-1 cursor-pointer ${location.pathname === '/home' ? 'border-b-2 border-orange-600' : ''}`}
            >
              <h1>All Posts</h1>
            </div>

            <div
              onClick={() => navigate('/following-posts')}
              className={`py-1 cursor-pointer ${location.pathname === '/following-posts' ? 'border-b-2 border-orange-600' : ''}`}
            >
              <h1>Followings</h1>
            </div>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}

export default HomePageLayout;
