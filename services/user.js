// services/user.js
import axiosInstance from './axiosInstance';

export const getUserData = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUserData = async (userId, data) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
