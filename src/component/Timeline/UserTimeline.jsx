import React, { useEffect, useState } from 'react';
import Container from '../ExtraComp/Container';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FollowCount from '../Follow/FollowCount';
import { getProfileById } from '../../store/profileSlice';
import { fetchAllPosts } from '../../store/postSlice';
import Card from '../Post/Card';

function UserTimeline() {
  const [post, setPosts] = useState([]);
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profiles.profile);

  const currentUser = useSelector((state) => state.auth.userData);
  const isAuthor = currentUser ? _id === currentUser._id : false;

  useEffect(() => {
    const loadUserProfile = async () => {
      await dispatch(getProfileById(_id)).unwrap();
    };
    loadUserProfile();
  }, [_id, dispatch]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsResponse = await dispatch(fetchAllPosts([])).unwrap();
      if (postsResponse) {
        const userPosts = await postsResponse.filter(
          (post) => post.owner === _id
        );
        setPosts(userPosts);
      }
    };
    fetchPosts();
  }, [_id, dispatch]);

  return (
    <Container>
      {profile ? (
        <div>
          <div className="min-h-screen max-w-4xl mx-auto pt-0 p-4 bg-gray-50">
            <div className="border rounded-2xl relative bg-white">
              <div className="relative h-48">
                <img
                  src={profile.cover || 'https://shorturl.at/7BHNM'}
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-cover rounded-t-2xl"
                />
                <div className="relative pt-20 text-center">
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-36 h-36 rounded-full border-4 border-white mx-auto"
                  />
                  <h1 className="text-black text-xl font-semibold mt-2">
                    {profile.username}
                  </h1>
                </div>
              </div>

              <div className="flex justify-center ml-4 mt-24 mb-4 space-x-8">
                <FollowCount
                  isFollowed={profile.isFollowed}
                  followersCount={profile.followersCount}
                  followedCount={profile.followingCount}
                  pageId={profile.pageId}
                />
              </div>
            </div>

            <div className="mt-6 ml-6">
              <div className="max-w-4xl mx-auto flex space-x-6 text-sm font-medium text-gray-600">
                <button
                  onClick={() => {
                    navigate(`/profile/${_id}`);
                  }}
                  className="hover:text-gray-800 py-3"
                >
                  Profile
                </button>
                <button className="text-gray-800 border-b-2 border-orange-600 py-3">
                  Timeline
                </button>
              </div>
            </div>

            <div className="max-w-4xl mx-auto mt-6  space-y-6">
              <div className=" space-y-3">
                {post && post.length > 0 ? (
                  post.map((post) =>
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
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
      </div>
      )}
    </Container>
  );
}

export default UserTimeline;
