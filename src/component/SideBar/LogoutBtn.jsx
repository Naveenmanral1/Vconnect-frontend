import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/authSlice';

function LogoutBtn({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    try {
      dispatch(logoutUser());
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex gap-2" onClick={logoutHandler}>
      {children}
    </div>
  );
}

export default LogoutBtn;
