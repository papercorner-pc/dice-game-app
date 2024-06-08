import {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {SafeScreen} from '../../components/template';
import bg from '../../theme/assets/images/gameBg.png';
import cardAce from '../../theme/assets/images/cardAce.png';
import cardHeart from '../../theme/assets/images/cardHeart.png';
import cardClaver from '../../theme/assets/images/cardClaver.png';
import cardDiamond from '../../theme/assets/images/cardDiamond.png';
import cardFlag from '../../theme/assets/images/cardFlag.png';
import cardMoon from '../../theme/assets/images/cardMoon.png';
import nextArrow from '../../theme/assets/images/nextArrow.png';
import backIcon from '../../theme/assets/images/back.png';
import coinIcon from '../../theme/assets/images/coins.png';
import FastImage from 'react-native-fast-image';
import {FontFamily} from '../../theme/fonts';
import {goBack, navigate} from '../../navigators/utils';
import {customToastMessage} from '../../utils/UtilityHelper';
import {useFocusEffect} from '@react-navigation/native';
import GamePaymentModal from './GamePaymentScreen';

const GameJoin = props => {
  const {game} = props.route.params;
  const [selectedCard, setSelectedCard] = useState(0);
  const [visiblePaymentModal, setVisiblePaymentModal] = useState(false);
  useFocusEffect(
    useCallback(() => {
      Orientation.lockToLandscape();

      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []), // Empty array means it will run every time the screen is focused
  );
  const onPressCard = number => {
    setSelectedCard(number);
    toggleModal();
  };
  const toggleModal = () => {
    setVisiblePaymentModal(!visiblePaymentModal);
  };
  return (
    <SafeScreen>
      <View style={styles.container}>
        <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
          <View style={{flexDirection: 'row', flex: 1, padding: 10}}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                  goBack();
                }}>
                <Image
                  style={{height: 24, width: 24, marginRight: 24}}
                  source={backIcon}
                  resizeMode="contain"
                  tintColor={'#FFF'}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 10}}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Pressable
                  style={[
                    styles.cardContainer,
                    selectedCard === 1 && styles.selectedCard,
                  ]}
                  onPress={() => {
                    onPressCard(1);
                  }}>
                  <ImageBackground
                    source={cardHeart}
                    resizeMode="cover"
                    style={styles.image}
                  />
                </Pressable>
                <Pressable
                  style={[
                    styles.cardContainer,
                    selectedCard === 2 && styles.selectedCard,
                  ]}
                  onPress={() => {
                    onPressCard(2);
                  }}>
                  <ImageBackground
                    source={cardAce}
                    resizeMode="cover"
                    style={styles.image}
                  />
                </Pressable>
                <Pressable
                  style={[
                    styles.cardContainer,
                    selectedCard === 3 && styles.selectedCard,
                  ]}
                  onPress={() => {
                    onPressCard(3);
                  }}>
                  <ImageBackground
                    source={cardClaver}
                    resizeMode="cover"
                    style={styles.image}
                  />
                </Pressable>
                <Pressable
                  style={[
                    styles.cardContainer,
                    selectedCard === 4 && styles.selectedCard,
                  ]}
                  onPress={() => {
                    onPressCard(4);
                  }}>
                  <ImageBackground
                    source={cardDiamond}
                    resizeMode="cover"
                    style={styles.image}
                  />
                </Pressable>
              </View>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Pressable
                  style={[
                    styles.cardContainer,
                    selectedCard === 5 && styles.selectedCard,
                  ]}
                  onPress={() => {
                    onPressCard(5);
                  }}>
                  <ImageBackground
                    source={cardMoon}
                    resizeMode="cover"
                    style={styles.image}
                  />
                </Pressable>
                <View style={{flex: 2, backgroundColor: '#A49C9C'}} />
                <Pressable
                  style={[
                    styles.cardContainer,
                    selectedCard === 6 && styles.selectedCard,
                  ]}
                  onPress={() => {
                    onPressCard(6);
                  }}>
                  <ImageBackground
                    source={cardFlag}
                    resizeMode="cover"
                    style={styles.image}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.nextButtonContainer}>
              {/* <Pressable
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={navigateToNext}>
                <Text style={styles.nextText}>Next</Text>
                <FastImage
                  source={nextArrow}
                  resizeMode="contain"
                  style={{height: 16, width: 16}}
                />
              </Pressable> */}
            </View>
          </View>
        </ImageBackground>
      </View>
      <GamePaymentModal
        visible={visiblePaymentModal}
        onClose={toggleModal}
        selectedCard={selectedCard}
        game={game}
      />
    </SafeScreen>
  );
};
export default GameJoin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    // justifyContent: 'center',
  },
  cardContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  selectedCard: {
    borderWidth: 1,
    borderColor: '#11B03E',
  },
  nextButtonContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  nextText: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsMedium,
    color: '#FFF',
  },
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
