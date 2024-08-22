import { useCallback, useEffect, useState } from 'react';
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
import { SafeScreen } from '../../components/template';
import bg from '../../theme/assets/images/gameBg.png';
import cardAce from '../../theme/assets/images/cardAce.png';
import cardHeart from '../../theme/assets/images/cardHeart.png';
import cardClaver from '../../theme/assets/images/cardClaver.png';
import cardDiamond from '../../theme/assets/images/cardDiamond.png';
import cardFlag from '../../theme/assets/images/cardFlag.png';
import cardMoon from '../../theme/assets/images/cardMoon.png';
import nextArrow from '../../theme/assets/images/nextArrow.png';
import backIcon from '../../theme/assets/images/back.png';
import lockIcon from '../../theme/assets/images/lock.png';
import FastImage from 'react-native-fast-image';
import { FontFamily } from '../../theme/fonts';
import { goBack, navigate, navigateAndSimpleReset } from '../../navigators/utils';
import { customToastMessage } from '../../utils/UtilityHelper';
import { useFocusEffect } from '@react-navigation/native';
import GamePaymentModal from './GamePaymentScreen';
import banner from '../../theme/assets/images/banner.png';
import { useMutation } from '@tanstack/react-query';
import { gameCardBalance } from '../../services/game/game';

const GameJoin = props => {
  const { game } = props.route.params;
  const [selectedCard, setSelectedCard] = useState(0);
  const [visiblePaymentModal, setVisiblePaymentModal] = useState(false);
  const [oneBalance, setOneBalance] = useState(null);
  const [twoBalance, setTwoBalance] = useState(null);
  const [threeBalance, setThreeBalance] = useState(null);
  const [fourBalance, setFourBalance] = useState(null);
  const [fiveBalance, setFiveBalance] = useState(null);
  const [sixBalance, setSixBalance] = useState(null);
  useFocusEffect(
    useCallback(() => {
      Orientation.lockToLandscape();

      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []), // Empty array means it will run every time the screen is focused
  );
  const mutation = useMutation({
    mutationFn: payload => {
      return gameCardBalance(payload);
    },
    onSuccess: data => {
      const balance = data?.balances;
      if (!!balance["1"]?.balance) {
        setOneBalance(balance["1"].balance)
      }
      if (!!balance["2"]?.balance) {
        setTwoBalance(balance["2"].balance)
      }
      if (!!balance["3"]?.balance) {
        setThreeBalance(balance["3"].balance)
      }
      if (!!balance["4"]?.balance) {
        setFourBalance(balance["4"].balance)
      }
      if (!!balance["5"]?.balance) {
        setFiveBalance(balance["5"].balance)
      }
      if (!!balance["6"]?.balance) {
        setSixBalance(balance["6"].balance)
      }
    },
    onError: error => {
      console.log('------ERROR joinGame -----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
    },
  });
  useEffect(() => {
    const payload = {
      game_id: game.id
    };
    const interval = setInterval(() => {
      mutation.mutate(payload);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
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
          <View style={{ flexDirection: 'row', flex: 1, padding: 10 }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                  // goBack();
                  navigateAndSimpleReset("HomeRoot")
                }}>
                <Image
                  style={{ height: 24, width: 24, marginRight: 24 }}
                  source={backIcon}
                  resizeMode="contain"
                  tintColor={'#FFF'}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 10 }}>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <Pressable
                  style={[
                    styles.cardContainer,
                    selectedCard === 1 && styles.selectedCard,
                  ]}
                  disabled={parseInt(oneBalance) > 0 ? false : true}
                  onPress={() => {
                    onPressCard(1);
                  }}>
                  <ImageBackground
                    source={cardHeart}
                    resizeMode="cover"
                    style={styles.image}
                  >
                    <View style={styles.backgroundContainer}>
                      {
                        !(parseInt(oneBalance) > 0) &&
                        <View style={styles.lockContainer}>
                          <FastImage
                            source={lockIcon}
                            style={{ height: 22, width: 22 }}
                            resizeMode="contain"
                          />
                        </View>
                      }
                    </View>
                  </ImageBackground>
                </Pressable>
                <Pressable
                  style={[
                    styles.cardContainer,
                    selectedCard === 2 && styles.selectedCard,
                  ]}
                  disabled={parseInt(twoBalance) > 0 ? false : true}
                  onPress={() => {
                    onPressCard(2);
                  }}>
                  <ImageBackground
                    source={cardAce}
                    resizeMode="cover"
                    style={styles.image}
                  >
                    <View style={styles.backgroundContainer}>
                      {
                        !(parseInt(twoBalance) > 0) &&
                        <View style={styles.lockContainer}>
                          <FastImage
                            source={lockIcon}
                            style={{ height: 22, width: 22 }}
                            resizeMode="contain"
                          />
                        </View>
                      }
                    </View>
                  </ImageBackground>
                </Pressable>
                <Pressable
                  style={[
                    styles.cardContainer,
                    selectedCard === 3 && styles.selectedCard,
                  ]}
                  disabled={parseInt(threeBalance) > 0 ? false : true}
                  onPress={() => {
                    onPressCard(3);
                  }}>
                  <ImageBackground
                    source={cardClaver}
                    resizeMode="cover"
                    style={styles.image}
                  >
                    <View style={styles.backgroundContainer}>
                      {
                        !(parseInt(threeBalance) > 0) &&
                        <View style={styles.lockContainer}>
                          <FastImage
                            source={lockIcon}
                            style={{ height: 22, width: 22 }}
                            resizeMode="contain"
                          />
                        </View>
                      }
                    </View>
                  </ImageBackground>
                </Pressable>
                <Pressable
                  style={[
                    styles.cardContainer,
                    selectedCard === 4 && styles.selectedCard,
                  ]}
                  disabled={parseInt(fourBalance) > 0 ? false : true}
                  onPress={() => {
                    onPressCard(4);
                  }}>
                  <ImageBackground
                    source={cardDiamond}
                    resizeMode="cover"
                    style={styles.image}
                  >
                    <View style={styles.backgroundContainer}>
                      {
                        !(parseInt(fourBalance) > 0) &&
                        <View style={styles.lockContainer}>
                          <FastImage
                            source={lockIcon}
                            style={{ height: 22, width: 22 }}
                            resizeMode="contain"
                          />
                        </View>
                      }
                    </View>
                  </ImageBackground>
                </Pressable>
              </View>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <Pressable
                  style={[
                    styles.cardContainer,
                    selectedCard === 5 && styles.selectedCard,
                  ]}
                  disabled={parseInt(fiveBalance) > 0 ? false : true}
                  onPress={() => {
                    onPressCard(5);
                  }}>
                  <ImageBackground
                    source={cardMoon}
                    resizeMode="cover"
                    style={styles.image}
                  >
                    <View style={styles.backgroundContainer}>
                      {
                        !(parseInt(fiveBalance) > 0) &&
                        <View style={styles.lockContainer}>
                          <FastImage
                            source={lockIcon}
                            style={{ height: 22, width: 22 }}
                            resizeMode="contain"
                          />
                        </View>
                      }
                    </View>
                  </ImageBackground>
                </Pressable>
                <View style={{ flex: 2, backgroundColor: '#FFF' }}>
                  <FastImage
                    source={banner}
                    style={{ flex: 1 }}
                    resizeMode="contain"
                  />
                </View>
                <Pressable
                  style={[
                    styles.cardContainer,
                    selectedCard === 6 && styles.selectedCard,
                  ]}
                  disabled={parseInt(sixBalance) > 0 ? false : true}
                  onPress={() => {
                    onPressCard(6);
                  }}>
                  <ImageBackground
                    source={cardFlag}
                    resizeMode="cover"
                    style={styles.image}
                  >
                    <View style={styles.backgroundContainer}>
                      {
                        !(parseInt(sixBalance) > 0) &&
                        <View style={styles.lockContainer}>
                          <FastImage
                            source={lockIcon}
                            style={{ height: 22, width: 22 }}
                            resizeMode="contain"
                          />
                        </View>
                      }
                    </View>
                  </ImageBackground>
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginHorizontal: 10
  },
  lockContainer: {
    height: 46,
    width: 46,
    padding: 10,
    backgroundColor: "#436375",
    borderWidth: 1,
    borderColor: "#EF080E",
    borderRadius: 100,
    margin: 5,
    justifyContent: "center",
    alignItems: "center"
  },
});
