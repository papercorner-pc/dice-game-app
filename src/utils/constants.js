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
  live: 'Live',
  resultWaiting:'Result Waiting',
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
  // {
  //   id: 3,
  //   icon: callIcon,
  //   title: 'Contact us',
  //   navigate: '',
  // },
  {
    id: 4,
    icon: privacyIcon,
    title: 'Privacy policy',
    navigate: 'PrivacyPolicy',
  },
  // {
  //   id: 5,
  //   icon: reviewIcon,
  //   title: 'Review',
  //   navigate: '',
  // },
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

export const streamData = {
  apiKey: "j4rr4zywt4vv",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4ifQ.ZjBDaE5944mDjd6lA4z7hdpxInE1Ri2UIiWXIrGFl4w",
  callId: "dice_dash",
  userId: "admin"
}

// export const streamData = {
//   apiKey: "mmhfdzb5evj2",
//   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiSm9ydXVzX0NfQmFvdGgiLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0pvcnV1c19DX0Jhb3RoIiwiaWF0IjoxNzE4NDYyNTY1LCJleHAiOjE3MTkwNjczNzB9.Y-qkPvpl-5-LAmUCPcAEUN_IKJF9AWeEg4QgDT_SKdg",
//   callId: "RLRaEw9hi5Aq",
//   userId: "Joruus_C_Baoth"
// }