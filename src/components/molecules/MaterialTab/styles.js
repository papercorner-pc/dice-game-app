import {Colors} from '../../../theme/colors';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import {FontFamily} from '../../../theme/fonts';

export default StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selected: {
    // paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#412653',
    flex: 1,
    height: 30,
  },
  unselected: {
    // paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    height: 30,
  },
  selectedText: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: 12,
    color: Colors.white,
    paddingTop: 10,
    marginHorizontal: 10,
  },
  unSelectedText: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: 12,
    color: '#5F646A',
    paddingTop: 10,
    marginHorizontal: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    margin: 10,
    alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  indicator: {
    borderWidth: 4,
    lineHeight: 10,
    borderColor: Colors.themeColor,
    borderRadius: 6,
    width: 40,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
