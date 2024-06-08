import {StyleSheet, Text, View} from 'react-native';
import {navigate} from '../../../navigators/utils';
import {Colors} from '../../../theme/colors';
import {FontFamily} from '../../../theme/fonts';
import ButtonComponent from '../Button';
import heart from '../../../theme/assets/images/heart.png';
import FastImage from 'react-native-fast-image';

const SelectedCard = ({image}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Choose Your Lucky Charm</Text>
      <Text style={styles.subTitle}>
        Make sure you've selected your favorite symbol
      </Text>
      <View style={styles.cardImageContainer}>
        <FastImage
          source={image}
          style={{
            height: 32,
            width: 32,
          }}
          resizeMode="contain"
        />
      </View>
      <ButtonComponent
        buttonColor="#DC9C40"
        wrapperStyles={{
          marginBottom: 10,
        }}
        textStyles={{
          color: '#090D12',
          fontSize: 16,
          fontFamily: FontFamily.montserratRegular,
        }}
        text={'Continue'}
        onPress={() => {
          navigate('GamePaymentScreen');
        }}
      />
    </View>
  );
};
export default SelectedCard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  cardImageContainer: {
    backgroundColor: '#F8EAF9',
    height: 64,
    width: 64,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsSemiBold,
    color: '#070A0D',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 12,
    fontFamily: FontFamily.poppinsRegular,
    color: '#675175',
    marginBottom: 10,
  },
});
