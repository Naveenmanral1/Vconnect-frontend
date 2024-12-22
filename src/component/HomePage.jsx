import React, { useEffect } from 'react';
import Card from './Post/Card';
import ActivityFeed from './Post/UploadPostBar';
import { fetchAllPosts } from '../store/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    const loadAllPosts = async () => {
      await dispatch(fetchAllPosts({ queryParams: {} })).unwrap();
    };
    loadAllPosts();
  }, [dispatch]);

  if (loading) {
    <div className="w-full h-screen flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
  </div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(posts)) {
    console.log('posts is invalid:', posts);
  }

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
            <div onClick={() => navigate('/home')}>
              <h1 className="border-b-2 border-orange-600 py-1">All Posts</h1>
            </div>
            <div onClick={() => navigate('/following-posts')}>
              <h1>Followings</h1>
            </div>
          </div>

          {posts && posts.length > 0 ? (
            posts.map((post) =>
              post._id ? (
                <Card
                  key={post._id}
                  isLiked={post.isLiked}
                  _id={post._id}
                  likesCount={post.likesCount}
                  owner={post.owner}
                  createdAt={post.createdAt}
                  ownerName={post.ownerName}
                  ownerAvatar={post.ownerAvatar}
                  image={post.image}
                  description={post.description}
                />
              ) : null
            )
          ) : (
            <div>No posts available</div>
          )}
        </div>
      </div>
    </main>
  );
}

export default HomePage;
