import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials, logout } from '../store/auth/AuthSlice';
import { checkTokenValidity } from '../utils/tokenUtils';

const AuthChecker = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const validateToken = async () => {
      if (isAuthenticated && token) {
        const isValid = await checkTokenValidity(token);
        if (!isValid) {
          dispatch(logout());
          navigate('/auth/login');
        }
      }
    };

    validateToken();

    const intervalId = setInterval(validateToken, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [dispatch, navigate, isAuthenticated, token]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (storedToken && user && !isAuthenticated) {
      dispatch(setCredentials({ user, token: storedToken }));
    }
  }, [dispatch, isAuthenticated]);

  return <>{children}</>;
};

export default AuthChecker;