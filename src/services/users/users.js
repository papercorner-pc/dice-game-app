import { instance } from "../instance";

export const getProfile = async () => {
  const response = await instance.get(`user/profile`).json();
  return response;
};
export const updateProfile = async (payload) => {
  try {
    const response = await instance
      .post(`user/edit-profile`, { json: payload })
      .json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};

export const updatePassword = async (payload) => {
  try {
    const response = await instance
      .post(`user/change-password`, { json: payload })
      .json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};

export const fetchPrivacyPolicy = async () => {
  const response = await instance.get(`get-privacy-policy`).json();
  return response;
};



export default {
  getProfile,
  updateProfile,
  fetchPrivacyPolicy,
};
