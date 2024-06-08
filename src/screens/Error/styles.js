import { StyleSheet } from 'react-native'
import { FontFamily } from '../../theme/fonts'
import { Colors } from '../../theme/colors'
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: 'flex-end',
    flex: 1,
    padding: 16,
    paddingVertical: 50,
  },
  titleMessageText: {
      fontFamily: FontFamily.montserratSemiBold,
      fontSize: 18,
      color: Colors.placeHolder,
      paddingVertical: 15,
      textAlign: 'center'
  },
  friendlyMessageText: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: 14,
    color: Colors.gray,
    paddingVertical: 15,
  },
  messageContainer: {flex: 1, paddingBottom: 120, justifyContent: 'flex-end', alignItems: 'center' },
  imageIcon: {height: 120, width: 120},
  imageContainer: {
      paddingBottom: 10
  },
  searchEmptyImageContainer: {
    height: 150,
    width: 150,
    borderRadius: 150/2,
    backgroundColor: Colors.appBackground,
    justifyContent: 'center',
    alignItems: 'center'
  },
})