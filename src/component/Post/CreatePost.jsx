import React, { useState, useEffect } from 'react';
import { IoImageOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../store/postSlice';

function CreatePost({ post }) {
  const { register, handleSubmit, reset, setValue, trigger } = useForm({
    defaultValues: {
      description: post?.description || '',
    },
  });

  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.posts);
  const currentUser = useSelector((state) => state.auth.userData);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setValue('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setValue('image', null);
  };

  const onSubmit = async (data) => {
    try {
      const postData = new FormData();
      postData.append(
        'description',
        data.description || post?.payload?.description
      );

      if (data.image?.[0]) {
        postData.append('image', data.image[0]);
      } else if (!post) {
        console.error('Image is required for a new post');
        return;
      }

      if (post?.payload) {
        await dispatch(
          updatePost({ _id: post.payload._id, updateData: postData })
        ).unwrap();
      } else {
        await dispatch(createPost(postData)).unwrap();
      }

      navigate('/home');
    } catch (error) {
      console.error('Error in submitting post:', error);
    }
  };

  useEffect(() => {
    if (post) {
      setValue('description', post.payload.description);
      setValue('image', post.payload.image || null);
      setImage(post.payload.image || null);
    }
  }, [post, setValue]);

  return (
    <div className="min-h-screen bg-gray-50 py-4  px-3 sm:px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg mt-2 sm:mt-16 border rounded-lg">
        <h2 className="text-lg sm:text-xl font-semibold my-4 mx-4">
          {post ? 'Edit Post' : 'Create Post'}
        </h2>
        <div>
          <div className="border-t border-gray-300 my-4"></div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-4 bg-white rounded-lg sm:space-y-6"
        >
          <div className="flex items-center space-x-4">
            <img
              src={currentUser.avatar}
              alt="User Avatar"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
            />
            <h2 className="text-sm sm:text-lg font-medium text-gray-800">
              {currentUser.fullName}
            </h2>
          </div>

          <textarea
            placeholder="Share what's on your mind..."
            className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm sm:text-base"
            rows="4"
            {...register('description')}
          ></textarea>

          {image || post?.payload?.image ? (
            <div className="relative">
              <img
                src={image || post.payload.image}
                alt="Uploaded"
                className="w-full max-h-48 sm:max-h-60 object-left object-contain rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 text-white p-1 rounded-full"
              >
                ✖
              </button>
            </div>
          ) : null}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                {...register('image', {
                  required: !post && 'Image is required',
                })}
              />
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200">
                <IoImageOutline size={20} />
                <span className="text-sm sm:text-base">Add Photos</span>
              </div>
            </label>

            <div className="flex space-x-2 sm:space-x-4 mt-4 sm:mt-0">
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="flex-1 bg-gray-300 text-gray-700 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-indigo-500 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base hover:bg-indigo-600"
              >
                {post
                  ? loading
                    ? 'Updating...'
                    : 'Update'
                  : loading
                    ? 'Submitting...'
                    : 'Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
