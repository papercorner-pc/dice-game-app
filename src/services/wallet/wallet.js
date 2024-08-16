import { instance } from "../instance";

export const agentWalletRecharge = async payload => {
    try {
        const response = await instance
            .post(`agent/wallet-recharge`, { json: payload })
            .json();
        return response;
    } catch (error) {
        throw await error.response.json();
    }
};

export const dealerCoinReq = async payload => {
    try {
        const response = await instance
            .post(`dealer/wallet-request`, { json: payload })
            .json();
        return response;
    } catch (error) {
        throw await error.response.json();
    }
};

export const dealerReqAcceptReject = async payload => {
    try {
        const response = await instance
            .post(`dealer/wallet-status-update`, { json: payload })
            .json();
        return response;
    } catch (error) {
        throw await error.response.json();
    }
};

export const agentReqAcceptReject = async payload => {
    try {
        const response = await instance
            .post(`agent/wallet-status-update`, { json: payload })
            .json();
        return response;
    } catch (error) {
        throw await error.response.json();
    }
};

export const adminWalletRecharge = async payload => {
    try {
        const response = await instance
            .post(`admin/wallet-recharge`, { json: payload })
            .json();
        return response;
    } catch (error) {
        throw await error.response.json();
    }
};

export const agentCoinReq = async payload => {
    try {
        const response = await instance
            .post(`agent/wallet-request`, { json: payload })
            .json();
        return response;
    } catch (error) {
        throw await error.response.json();
    }
};

export const getWalletReq = async () => {
    const response = await instance.get(`wallet-requests`).json();
    return response;
};