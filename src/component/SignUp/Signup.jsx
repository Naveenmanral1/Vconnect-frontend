import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../LogSignExtra/index';
import { loginUser, signupUser } from '../../store/authSlice';
import AuthContainer from '../AuthContainer';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(signupUser(data)).unwrap();
      const { email, password } = data;
      await dispatch(loginUser({ email, password })).unwrap();
      navigate('/home');
    } catch (error) {
      setError(error.message || 'An error occurred during signup.');
    }
  };

  return (
    <AuthContainer
      title="Sign up to create account"
      subtitle="Already have an account? "
      linkText="Sign In"
      linkTo="/"
    >
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        <Input
          label="UserName:"
          placeholder="Enter your username"
          {...register('fullName', { required: 'Name is required' })}
        />
        {errors.fullName && (
          <p className="text-red-600">{errors.fullName.message}</p>
        )}

        <Input
          label="Email:"
          placeholder="Enter your email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}

        <Input
          label="Password:"
          type="password"
          placeholder="Enter your password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}

        <Button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create Account
        </Button>
      </form>
    </AuthContainer>
  );
}

export default Signup;
