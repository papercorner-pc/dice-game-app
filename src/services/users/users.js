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


export const uploadImage = async (payload) => {
  try {
    const response = await instance
      .post(`update/profile-image`, { body: payload })
    return response.json();
  } catch (error) {
    if (error.response) {
      const errorData = await error.response.json();
      console.log("---error", errorData);
      throw errorData;
    } else {
      const errorData = await error.message;
      console.log("---error message", errorData);
      throw errorData;
    }
  }
};


export default {
  getProfile,
  updateProfile,
  fetchPrivacyPolicy,
};
