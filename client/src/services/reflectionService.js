import API from './api';

export const submitReflection = async (questId, formData) => {
  const res = await API.post(`/reflections/${questId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};
