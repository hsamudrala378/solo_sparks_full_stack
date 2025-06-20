import API from './api';

export const login = async (data) => {
  const res = await API.post('/auth/login', data);
  localStorage.setItem('token', res.data.token);
};

export const register = async (data) => {
  const res = await API.post('/auth/register', data);
  return res.data;
};
