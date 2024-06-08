import { instance } from "@/services/instance";
import { userSchema } from "@/types/schemas/user";
export const getProfile = async () => {
  const response = await instance.get(`getProfile`).json();
  return response;
};
export const updateProfile = async (payload) => {
  try {
    const response = await instance
      .post(`update/profile`, { json: payload })
      .json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};
export const updateImage = async (payload) => {
  try {
    const response = await instance
      .post(`update/image`, { json: payload })
      .json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};
export const addAddress = async (payload) => {
  try {
    const response = await instance
      .post(`user/address`, { json: payload })
      .json();
    console.log("----address", response);
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};
export const getAddressBook = async () => {
  const response = await instance.get(`addressBook`).json();
  return response;
};
export const editAddress = async (payload) => {
  try {
    const response = await instance
      .post(`user/address/${payload.address_id}`, { json: payload.body })
      .json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};

export const getLatestActiveOrder = async () => {
  try {
    const response = await instance
      .post(`get-latest-active-order`)
      .json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};
export const fetchMobileBanner = async () => {
  const response = await instance.get(`fetch-mobile-banners`).json();
  return response;
};

export const deleteAddress = async (id) => {
  const response = await instance.get(`delete/address/${id}`).json();
  return response;
};

export const fetchPrivacyPolicy = async () => {
  const response = await instance.get(`get-privacy-policy`).json();
  return response;
};

export default {
  getProfile,
  addAddress,
  getAddressBook,
  editAddress,
  updateProfile,
  fetchMobileBanner,
  fetchPrivacyPolicy,
  deleteAddress,
  updateImage,
  getLatestActiveOrder
};
