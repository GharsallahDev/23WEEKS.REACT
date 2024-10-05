import config from 'src/config';
import { store } from '../store/Store';
import { logout } from '../store/auth/AuthSlice';

export const apiRequest = async (url, options = {}) => {
  const token = store.getState().auth.token;

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(`${config.apiUrl}${url}`, options);

    if (response.status === 401) {
      store.dispatch(logout());
      window.location.href = '/auth/login';
      throw new Error('Unauthorized');
    }

    return response;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};