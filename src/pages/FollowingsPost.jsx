import React, { useEffect } from 'react';
import Card from '../component/Post/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getPostByFollowedUser } from '../store/postSlice';
import { useNavigate } from 'react-router-dom';
import HomePageLayout from '../component/ExtraComp/HomepageLayout';

function PostByMyFollowing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    followedPosts = [],
    loading,
    error,
  } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPostByFollowedUser({ queryParams: {} }));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
    </div>
    );
  }

  return (
    <div>
      <HomePageLayout>
        {followedPosts && followedPosts.length > 0 ? (
          followedPosts.map((post) =>
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

export default PostByMyFollowing;
