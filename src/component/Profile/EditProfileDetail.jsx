import React, { useEffect } from 'react';
import Container from '../ExtraComp/Container';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createProfile, updateProfile } from '../../store/profileSlice';
import { useSelector, useDispatch } from 'react-redux';

function EditProfileDetails({ profile }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.profiles.loading);
  const { _id } = useParams();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      gender: profile?.gender || "",
      city: profile?.city || "",
      dateofBirth: profile?.dateofBirth || "",
      bio: profile?.bio || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const profileData = new FormData();
      profileData.append("firstName", data.firstName || profile?.firstName);
      profileData.append("lastName", data.lastName || profile?.lastName);
      profileData.append("gender", data.gender || profile?.gender);
      profileData.append("dateofBirth", data.dateofBirth || profile?.dateofBirth);
      profileData.append("city", data.city || profile?.city);
      profileData.append("bio", data.bio || profile?.bio);

      if (data.avatar?.[0]) {
        profileData.append("avatar", data.avatar[0]);
      }
      if (data.cover?.[0]) {
        profileData.append("cover", data.cover[0]);
      }

      if (profile) {
        await dispatch(updateProfile({ _id: profile._id, updateData: profileData })).unwrap();
      } else {
        await dispatch(createProfile(profileData)).unwrap();
      }
      navigate(`/home`);
    } catch (error) {
      console.error("Error in submitting profile:", error);
      alert(error?.message || "Failed to update profile");
    }
  };

  useEffect(() => {
    if (profile) {
      setValue("firstName", profile.firstName);
      setValue("lastName", profile.lastName);
      setValue("gender", profile.gender);
      setValue("dateofBirth", profile.dateofBirth);
      setValue("city", profile.city);
      setValue("bio", profile.bio);
    }
  }, [profile, setValue]);

  return (
    <Container>
      <div className="bg-gray-50 max-w-4xl mx-auto min-h-screen">
        <div className="p-6 sm:p-16 mt-14">
          <div className="flex justify-between max-w-4xl mx-auto p-2 px-2 mb-3">
            <div>
              <h1 className="text-2xl font-semibold">Edit Profile</h1>
            </div>
            <div className="flex">
              <button
                className="text-gray-900 bg-gray-200 p-2 rounded-md px-4 hover:underline"
                onClick={() => navigate(`/profile/${_id}`)}
              >
                View Profile
              </button>
            </div>
          </div>

          <div className="sm:flex sm:items-start max-w-4xl mx-auto">
            <div className="min-h-screen bg-gray-50 flex flex-col max-w-4xl mx-auto items-center">
              <div className="w-full max-w-4xl border bg-white rounded-lg shadow-md p-5 pr-9">
                <div className="flex">
                  <div className="w-full pl-6">
                    <h2 className="text-lg font-semibold text-gray-800">Edit Information</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                          type="text"
                          {...register('firstName', { required: 'First name is required' })}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                          type="text"
                          {...register('lastName', { required: 'Last name is required' })}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                          {...register('gender', { required: 'Gender is required' })}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        {errors.gender && (
                          <p className="text-red-500 text-sm">{errors.gender.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mt-4">Date of Birth</label>
                        <input
                          type="date"
                          {...register('dateofBirth', { required: 'Date of Birth is required' })}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                        {errors.dateofBirth && (
                          <p className="text-red-500 text-sm">{errors.dateofBirth.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <input
                          type="text"
                          {...register('city', { required: 'State is required' })}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Enter your city"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm">{errors.city.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mt-4">Bio</label>
                        <input
                          type="text"
                          {...register('bio', { required: 'Bio is required' })}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                        {errors.bio && (
                          <p className="text-red-500 text-sm">{errors.bio.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mt-4">Avatar</label>
                        <input
                          type="file"
                          {...register('avatar')}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          accept="image/*"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mt-4">Cover Image</label>
                        <input
                          type="file"
                          {...register('cover')}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          accept="image/*"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-purple-800 text-white py-2 px-4 rounded-md shadow-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      >
                        {profile
                          ? loading
                            ? "Updating..."
                            : "Update Profile"
                          : loading
                          ? "Submitting..."
                          : "Submit Profile"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default EditProfileDetails;




// import React, { useEffect } from 'react';
// import Container from '../ExtraComp/Container';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { createProfile, updateProfile } from '../../store/profileSlice';
// import { useSelector, useDispatch } from 'react-redux';

// function EditProfileDetails({ profile }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const loading = useSelector((state) => state.profiles.loading);
//   const { _id } = useParams();

//   const {
//     register,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       username: profile?.username || "",
//       location: profile?.location || "",
//       dateofBirth: profile?.dateofBirth || "",
//       bio: profile?.bio || "",
//     },
//   });

//   const onSubmit = async (data) => {
//     try {
//       const profileData = new FormData();
//       profileData.append("username", data.username || profile?.username);
//       profileData.append("dateofBirth", data.dateofBirth || profile?.dateofBirth);
//       profileData.append("location", data.location || profile?.location);
//       profileData.append("bio", data.bio || profile?.bio);

//       if (data.avatar?.[0]) {
//         profileData.append("avatar", data.avatar[0]);
//       }
//       if (data.cover?.[0]) {
//         profileData.append("cover", data.cover[0]);
//       }

//       if (profile) {
//         await dispatch(updateProfile({ _id: profile._id, updateData: profileData })).unwrap();
//       } else {
//         await dispatch(createProfile(profileData)).unwrap();
//       }
//       navigate(`/home`);
//     } catch (error) {
//       console.error("Error in submitting profile:", error);
//       alert(error?.message || "Failed to update profile");
//     }
//   };

//   useEffect(() => {
//     if (profile) {
//       setValue("username", profile.username);
//       setValue("dateofBirth", profile.dateofBirth);
//       setValue("location", profile.location);
//       setValue("bio", profile.bio);
//     }
//   }, [profile, setValue]);



//   return (
//     <Container>
//       <div className="bg-gray-50 max-w-4xl mx-auto min-h-screen">
//         <div className="p-6 sm:p-16 mt-14">
//           <div className="flex justify-between max-w-4xl mx-auto p-2 px-2 mb-3">
//             <div>
//               <h1 className="text-2xl font-semibold">Edit Profile</h1>
//             </div>
//             <div className="flex">
//               <button
//                 className="text-gray-900 bg-gray-200 p-2 rounded-md px-4 hover:underline"
//                 onClick={() => navigate(`/profile/${_id}`)}
//               >
//                 View Profile
//               </button>
//             </div>
//           </div>

//           <div className="sm:flex sm:items-start max-w-4xl mx-auto">
//             <div className="min-h-screen bg-gray-50 flex flex-col max-w-4xl mx-auto items-center">
//               <div className="w-full max-w-4xl border bg-white rounded-lg shadow-md p-5 pr-9">
//                 <div className="flex">
//                   <div className="w-full pl-6">
//                     <h2 className="text-lg font-semibold text-gray-800">Edit Information</h2>

//                     <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700">Full Name</label>
//                         <input
//                           type="text"
//                           {...register('username', { required: 'UserName is required' })}
//                           className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
//                           placeholder="Enter your Username"
//                         />
//                         {errors.username && (
//                           <p className="text-red-500 text-sm">{errors.username.message}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mt-4">Date of Birth</label>
//                         <input
//                           type="date"
//                           {...register('dateofBirth', { required: 'Date of Birth is required' })}
//                           className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
//                         />
//                         {errors.dateofBirth && (
//                           <p className="text-red-500 text-sm">{errors.dateofBirth.message}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700">Location</label>
//                         <input
//                           type="text"
//                           {...register('location', { required: 'Location is required' })}
//                           className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
//                           placeholder="Enter your location"
//                         />
//                         {errors.location && (
//                           <p className="text-red-500 text-sm">{errors.location.message}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mt-4">Bio</label>
//                         <input
//                           type="text"
//                           {...register('bio', { required: 'Bio is required' })}
//                           className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
//                         />
//                         {errors.bio && (
//                           <p className="text-red-500 text-sm">{errors.bio.message}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mt-4">Avatar</label>
//                         <input
//                           type="file"
//                           {...register('avatar')}
//                           className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
//                           accept="image/*"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mt-4">Cover Image</label>
//                         <input
//                           type="file"
//                           {...register('cover')}
//                           className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
//                           accept="image/*"
//                         />
//                       </div>

//                       <button
//                         type="submit"
//                         className="bg-purple-800 text-white py-2 px-4 rounded-md shadow-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
//                       >
//                         {profile
//                           ? loading
//                             ? "Updating..."
//                             : "Update Profile"
//                           : loading
//                           ? "Submitting..."
//                           : "Submit Profile"}
//                       </button>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// }

// export default EditProfileDetails;
