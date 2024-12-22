import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Container from '../ExtraComp/Container';
import { updatePassword } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

function AccountSettings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    resetField,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await dispatch(getCurrentUser()).unwrap();
      if (data) {
        setUser(data);
      }
    };
    fetchUser();
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(
      updatePassword({
        oldPassword: data?.oldPassword,
        newPassword: data?.newPassword,
      })
    );
    navigate('/home');
    resetField('oldPassword');
    resetField('newPassword');
    resetField('confirmPassword');
  };

  return (
    <Container>
      <div className="min-h-screen bg-gray-50 flex flex-col max-w-xl mx-auto items-center px-5 py-8">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-300">
            <h1 className="text-2xl font-semibold text-gray-800">
              Account Settings
            </h1>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm">
              View Profile
            </button>
          </div>

          <div className="flex mt-6">
            <div className="w-full pl-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Login Information
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Current Password (required to update email or change current
                password)
              </p>

              <form
                className="mt-6 space-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    {...register('oldPassword', {
                      required: 'Current password is required',
                    })}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your current password"
                  />
                  {errors.currentPassword && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Account Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <p className="text-sm text-blue-600">
                    Leave password fields blank for no change
                  </p>
                  <label className="block text-sm font-medium text-gray-700 mt-4">
                    Add Your New Password
                  </label>
                  <input
                    type="password"
                    {...register('newPassword', {
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter new password"
                  />
                  {errors.newPassword && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Your New Password
                  </label>
                  <input
                    type="password"
                    {...register('confirmPassword', {
                      validate: {
                        matchesNewPassword: (value) =>
                          value === getValues('newPassword') ||
                          'Passwords do not match',
                      },
                    })}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Repeat new password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-purple-800 text-white py-2 px-4 rounded-md shadow-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AccountSettings;
