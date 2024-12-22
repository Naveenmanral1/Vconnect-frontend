import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../LogSignExtra/index';
import { loginUser, getCurrentUser } from '../../store/authSlice';
import AuthContainer from '../AuthContainer';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(loginUser(data)).unwrap();
      const user = await dispatch(getCurrentUser()).unwrap();
      if (user && response) {
        navigate('/home');
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <AuthContainer
      title="Sign in to your account"
      subtitle="Don't have an account? "
      linkText="Sign Up"
      linkTo="/signup"
    >
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
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
          Sign In
        </Button>
      </form>
    </AuthContainer>
  );
}

export default Login;
