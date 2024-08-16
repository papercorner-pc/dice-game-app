import {instance} from '../instance';

export const login = async payload => {
  try {
    const response = await instance.post(`user/login`, {json: payload}).json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};

export const createAccount = async payload => {
  try {
    const response = await instance.post(`create-users`, {json: payload}).json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};

export const otpVerify = async payload => {
  try {
    const response = await instance.post(`otp_verify`, {json: payload}).json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};

export const logout = async payload => {
  try {
    const response = await instance.post(`user-logout`, {json: payload}).json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};
