import editIcon from '../theme/assets/images/editProfile.png';
import changeIcon from '../theme/assets/images/changePassword.png';
import callIcon from '../theme/assets/images/call.png';
import privacyIcon from '../theme/assets/images/privacy.png';
import reviewIcon from '../theme/assets/images/review.png';
import logoutIcon from '../theme/assets/images/logout.png';
import cardAce from '../theme/assets/images/cardAce.png';
import cardHeart from '../theme/assets/images/cardHeart.png';
import cardClaver from '../theme/assets/images/cardClaver.png';
import cardDiamond from '../theme/assets/images/cardDiamond.png';
import cardFlag from '../theme/assets/images/cardFlag.png';
import cardMoon from '../theme/assets/images/cardMoon.png';

export const type = {
  upComing: 'Upcoming',
  liveMatch: 'Live Matches',
  completed: 'Completed',
};

export const gType = {
  result: 'Results',
  upComing: 'Upcoming',
  liveMatch: 'Live Matches',
};

export const adminTab = {
  upComing: 'Upcoming',
  history: 'History',
};

export const paymentMethodListData = [
  {
    id: 1,
    title: 'Phone Pay',
    isSelected: true,
  },
  {
    id: 2,
    title: 'Google Pay',
    isSelected: false,
  },
];

export const gamePaymentList = [
  {
    id: 1,
    title: 'Wallet',
    isSelected: true,
  },
  {
    id: 2,
    title: 'Phone Pay',
    isSelected: false,
  },
  {
    id: 3,
    title: 'Google Pay',
    isSelected: false,
  },
];

export const profileList = [
  {
    id: 1,
    icon: editIcon,
    title: 'Edit profile',
    navigate: 'EditProfile',
  },
  {
    id: 2,
    icon: changeIcon,
    title: 'Change Password',
    navigate: 'UpdatePassword',
  },
  {
    id: 3,
    icon: callIcon,
    title: 'Contact us',
  },
  {
    id: 4,
    icon: privacyIcon,
    title: 'Privacy policy',
    navigate: 'PrivacyPolicy',
  },
  {
    id: 5,
    icon: reviewIcon,
    title: 'Review',
  },
  {
    id: 6,
    icon: logoutIcon,
    title: 'Logout',
    navigate: 'Logout',
  },
];

export const resultDiceCards = [
  {
    id: 1,
    bgImage: cardHeart,
    isSelected: false,
  },
  {
    id: 2,
    bgImage: cardAce,
    isSelected: false,
  },
  {
    id: 3,
    bgImage: cardClaver,
    isSelected: false,
  },
  {
    id: 4,
    bgImage: cardDiamond,
    isSelected: false,
  },
  {
    id: 5,
    bgImage: cardMoon,
    isSelected: false,
  },
  {
    id: 6,
    bgImage: cardFlag,
    isSelected: false,
  },
];
