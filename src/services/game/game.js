import { instance } from '../instance';

export const createGame = async payload => {
  try {
    const response = await instance
      .post(`admin/create-game`, { json: payload })
      .json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};

export const joinGame = async payload => {
  try {
    const response = await instance.post(`games/join`, { json: payload }).json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};

export const gameList = async payload => {
  try {
    const response = await instance.post(`game/list`, { json: payload }).json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};

export const gameDetails = async payload => {
  try {
    const response = await instance.post(`game/detail`, { json: payload }).json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};

export const getJoinedUserList = async payload => {
  try {
    const response = await instance
      .post(`game/joined-users`, { json: payload })
      .json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};

export const getUserSingleGameList = async payload => {
  try {
    const response = await instance
      .post(`single/game-list`, { json: payload })
      .json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};

export const announceGameResult = async payload => {
  try {
    const response = await instance
      .post(`result/announce`, { json: payload })
      .json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};


export const walletRecharge = async payload => {
  try {
    const response = await instance
      .post(`user-wallet/recharge`, { json: payload })
      .json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};

export const walletHistory = async () => {
  try {
    const response = await instance.get(`user-wallet/history`).json();
    return response;
  } catch (error) {
    throw await error.response.json();
  }
};