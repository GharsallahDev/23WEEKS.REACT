import config from 'src/config';

export const checkTokenValidity = async (token) => {
  try {
    const response = await fetch(`${config.apiUrl}/auth/validate-token`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data.isValid;
    }
    return false;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};