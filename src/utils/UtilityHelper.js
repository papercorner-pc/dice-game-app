import {showMessage} from 'react-native-flash-message';
import {FontFamily} from '../theme/fonts';

export function validatePassword(text) {
  const reg = /^.{8,}$/;
  if (reg.test(text) === false) {
    return false;
  }

  return true;
}
export function validatePhone(text) {
  const reg = /^[6-9]\d{9}$/;
  if (reg.test(text) === false) {
    return false;
  }

  return true;
}

export const customToastMessage = (message, type) => {
  showMessage({
    message: message,
    type: type,
    statusBarHeight: 40,
    titleStyle: {fontSize: 14, fontFamily: FontFamily.poppinsMedium},
  });
};
