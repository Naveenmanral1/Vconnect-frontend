import React, { useEffect } from 'react';
import HomePageLayout from '../component/ExtraComp/HomepageLayout';
import Card from '../component/Post/Card';
import { fetchAllPosts } from '../store/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Homepage() {
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
    return (
      <div className="w-full h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
    </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(posts)) {
    console.log('posts is invalid:', posts);
  }

  return (
    <div>
      <HomePageLayout>
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
      </HomePageLayout>
    </div>
  );
}

export default Homepage;
