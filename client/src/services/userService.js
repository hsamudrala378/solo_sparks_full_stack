import API from './api';

export const getProgress = async () => {
  const res = await API.get('/user/progress');
  return res.data;
};
export const updateUserProfile = async (data) => {
  const res = await API.put('/user/profile', data);
  return res.data;
};