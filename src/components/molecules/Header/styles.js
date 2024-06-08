import { StyleSheet, Platform } from 'react-native'
import { Colors } from '../../../theme/colors'
import { FontFamily } from '../../../theme/fonts'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  mainHeadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
   
  },
  mainHeading: {
    fontSize: 18,
    color: Colors.black,
    fontFamily: FontFamily.montserratSemiBold,
  },
  dateText: {
    fontSize: 14,
    color: Colors.placeHolder,
    fontFamily: FontFamily.montserratMedium,
  },
  backIcon: {
    height: 28,
    width: 24,
  },
  logoContainer: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 64,
    alignItems: 'center',
    paddingRight: 40,
    paddingBottom: 10,
    borderBottomColor: 'rgba(51, 51, 51, 0.15)',
    borderBottomWidth: 1,
    justifyContent :'center',
  },
})
