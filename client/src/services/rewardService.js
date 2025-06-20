import API from './api';

export const getAllRewards = async () => {
  const res = await API.get('/rewards');
  return res.data;
};

export const redeemReward = async (rewardId) => {
  const res = await API.post(`/rewards/${rewardId}/redeem`);
  return res.data;
};
