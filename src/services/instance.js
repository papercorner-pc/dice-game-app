import ky from 'ky';
import {MMKV} from 'react-native-mmkv';
import {navigateAndSimpleReset} from '../navigators/utils';
import {Alert, Platform} from 'react-native';
import {refreshToken} from './auth/auth';
import {useMutation} from '@tanstack/react-query';
// import uuid from 'react-native-uuid';
import {storage} from '../App';
const LOCAL_IP = '192.168.90.127'; // Replace with your local IP address
// const prefixUrl = `http://10.0.2.2:8000/api/`;
const prefixUrl = `https://www.dicedash.papercorner.in/api/`;
const token = storage.getString('auth_token');
const userData = storage.getString('user_data');
console.log('--prefixUrl', token);
const afterResponse = async (request, options, response) => {
  console.log('--responses', response);
  console.log('option', options);
  if (response.status === 401) {
    const fcm_token = storage.getString('fcm_token');
    if (userData) {
      const user = JSON.parse(userData);
      const payload = {
        user_id: user.id,
        device_type: Platform.OS,
        // device_token: uuid.v4(),
        fcm_token: fcm_token,
      };
      const token = await instance
        .post('auth/refreshToken', {json: payload})
        .json();
      storage.set('auth_token', token.data.auth_token);
      const refreshToken = token.data.auth_token;
      // // Retry with the token
      request.headers.set('Authorization', `Bearer ${refreshToken}`);
      return ky(request);
    }
  }
};

const beforeRequest = async request => {
  const token = storage.getString('auth_token');
  console.log('--request', request);
  console.log('--token', token);
  if (token) {
    const header = request.headers.get('Authorization');
    if (!header?.startsWith('Basic'))
      request.headers.append('Authorization', `Bearer ${token}`);
  }
};
export const instance = ky.extend({
  hooks: {afterResponse: [afterResponse], beforeRequest: [beforeRequest]},
  prefixUrl,
  headers: {
    Accept: 'application/json',
  },
});
