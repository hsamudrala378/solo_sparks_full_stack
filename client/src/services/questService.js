import API from './api';

export const getQuests = async () => {
  const res = await API.get('/quests');
  return res.data;
};

export const generateQuest = async () => {
  const res = await API.post('/quests/generate');
  return res.data;
};

export const completeQuest = async (questId) => {
  const res = await API.put(`/quests/${questId}/complete`);
  return res.data;
};
