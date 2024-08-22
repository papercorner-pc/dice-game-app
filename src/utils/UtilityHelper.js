import { showMessage } from 'react-native-flash-message';
import { FontFamily } from '../theme/fonts';
import Toast from 'react-native-toast-message';

export function validatePassword(text) {
  const reg = /^.{4,}$/;
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
  Toast.show({
    type: type,
    text1: message,
  });
  // showMessage({
  //   message: message,
  //   type: type,
  //   statusBarHeight: 40,
  //   titleStyle: {fontSize: 14, fontFamily: FontFamily.poppinsMedium},
  // });
};

export const dateFormate = (date) => {
  const [year, month, day] = date.split('-');
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate
}

export const timeFormate = (time) => {
  const [hours24, minutes, seconds] = time.split(':');

  let hours12 = parseInt(hours24, 10);
  const period = hours12 >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours12 = hours12 % 12 || 12; // Convert 0 to 12 for midnight and adjust other hours

  // Format hours to have leading zero if needed
  const formattedTime = `${String(hours12).padStart(2, '0')}:${minutes} ${period}`;
  return formattedTime
}