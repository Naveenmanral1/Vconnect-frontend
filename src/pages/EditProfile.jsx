import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditProfileDetails from '../component/Profile/EditProfileDetail';
import { getProfileById } from '../store/profileSlice';

function EditProfile() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const profile = useSelector((state) => state.profiles.profile);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        if (!profile || profile._id !== _id) {
          await dispatch(getProfileById(_id)).unwrap();
        }
      } catch (error) {
        console.error('Error fetching profile:', error.message);
        navigate('/home');
      }
      setIsLoading(false);
    };
    loadProfile();
  }, [dispatch, _id, navigate]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <EditProfileDetails profile={profile} />
    </div>
  );
}

export default EditProfile;
