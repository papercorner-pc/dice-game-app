import {config} from '../theme/_config';
export const generateFontColors = configuration => {
  return Object.entries(configuration.fonts.colors ?? {}).reduce(
    (acc, [key, value]) => {
      return Object.assign(acc, {
        [`${key}`]: {
          color: value,
        },
      });
    },
    {},
  );
};
export const generateFontSizes = () => {
  return config.fonts.sizes.reduce((acc, size) => {
    return Object.assign(acc, {
      [`size_${size}`]: {
        fontSize: size,
      },
    });
  }, {});
};
export const staticFontStyles = {
  bold: {
    fontWeight: 'bold',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  alignCenter: {
    textAlign: 'center',
  },
};
export const FontFamily = {
  montserratBlack: 'Montserrat-Black',
  montserratLight: 'Montserrat-Light',
  montserratMedium: 'Montserrat-Medium',
  montserratRegular: 'Montserrat-Regular',
  montserratSemiBold: 'Montserrat-SemiBold',
  montserratExtraBold: 'Montserrat-ExtraBold',
  poppinsBlack: 'Poppins-Black', //900
  poppinsExtraBold: 'Poppins-ExtraBold', //800
  poppinsBold: 'Poppins-Bold', //700,
  poppinsSemiBold: 'Poppins-SemiBold', //600
  poppinsMedium: 'Poppins-Medium', //500
  poppinsRegular: 'Poppins-Regular', //400
  poppinsLight: 'Poppins-Light', //300
  poppinsExtraLight: 'Poppins-ExtraLight', //200
  poppinsThin: 'Poppins-Thin', //100
};
