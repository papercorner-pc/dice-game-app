import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeScreen} from '../../components/template';
import {goBack} from '../../navigators/utils';
import {FontFamily} from '../../theme/fonts';
import backIcon from '../../theme/assets/images/back.png';
import iconAce from '../../theme/assets/images/iconAce.png';
import iconClaver from '../../theme/assets/images/iconClaver.png';
import iconDiamond from '../../theme/assets/images/iconDiamond.png';
import iconFlag from '../../theme/assets/images/iconFlag.png';
import iconHeart from '../../theme/assets/images/iconHeart.png';
import iconMoon from '../../theme/assets/images/iconMoon.png';
import JoinMessage from '../../components/molecules/JoinGameMessage';
import SelectedCard from '../../components/molecules/SelectedCard';
import Orientation from 'react-native-orientation-locker';
import {useEffect, useState} from 'react';

const SelectedCardScreen = props => {
  const {selectedCard} = props.route.params;
  const [image, setImage] = useState('');
  useEffect(() => {
    setSelectedCardImage();
  }, [selectedCard]);
  const setSelectedCardImage = () => {
    switch (selectedCard) {
      case 1:
        setImage(iconHeart);
        break;
      case 2:
        setImage(iconAce);
        break;
      case 3:
        setImage(iconClaver);
        break;
      case 4:
        setImage(iconDiamond);
        break;
      case 5:
        setImage(iconMoon);
        break;
      case 6:
        setImage(iconFlag);
        break;
      default:
        break;
    }
  };
  return (
    <SafeScreen>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            goBack();
          }}>
          <Image
            style={{height: 24, width: 24, marginRight: 24}}
            source={backIcon}
            resizeMode="contain"
            tintColor={'#FBFBFB'}
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>Join Now</Text>
      </View>
      <View style={styles.container}>
        <JoinMessage />
        <SelectedCard image={image} />
      </View>
    </SafeScreen>
  );
};

export default SelectedCardScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 80,
    backgroundColor: '#3B234C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsMedium,
    color: '#FBFBFB',
  },
  container: {
    flex: 1,
    backgroundColor: '#ECE9EE',
    padding: 10,
  },
});
