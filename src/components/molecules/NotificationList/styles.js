import { StyleSheet, Platform } from 'react-native'
import { Colors } from '../../../theme/colors'
import { FontFamily } from '../../../theme/fonts'

export default StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    // paddingVertical: 20,
    backgroundColor: Colors.white,
    flex: 1
  },
  notificationContainer: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.09,
    shadowRadius: 4.65,
    elevation: 8,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: Colors.lightGray,
    borderWidth: 0.5,
  },
  notificationImageContainer: {
    height: 150,
  },
  notificationImageIcon: {
    height: '100%',
    width: '100%',
  },
  notificationTitle: {
    // fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: FontFamily.montserratSemiBold,
    color: Colors.black
  },
  notificationMessage: {
    // fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FontFamily.montserratMedium,
    color: Colors.placeHolder,
    paddingVertical: 5,
  },
  notificationIndicator: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: Colors.red,
    height: 8,
    width: 8,
    borderRadius: 8 / 2,
    marginHorizontal: 10,
    marginVertical: 5,
    alignSelf: "flex-end"
  },
  topContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    flex: 1,
  },
  bottomContainer: {
    paddingVertical: 5,
  },
  dateText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    fontFamily: FontFamily.montserratMedium,
    color: Colors.placeHolder,
  },
})
