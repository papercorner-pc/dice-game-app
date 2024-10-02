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
import LivestreamModal from './LivestreamModal'
import banner from '../../theme/assets/images/banner.png';
import closeIcon from '../../theme/assets/images/close.png';
import { useMutation } from '@tanstack/react-query';
import { deleteJoinGame, gameCardBalance, gamePublishStatus } from '../../services/game/game';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import ButtonComponent from '../../components/molecules/Button';
import ViewLiveStream from '../../components/molecules/LiveStreaming';
import coinIcon from '../../theme/assets/images/coins.png';
import AnimationValue from '../../components/molecules/Animation/AnimationValue';

const GameJoin = props => {
  const { game } = props.route.params;
  const [selectedCard, setSelectedCard] = useState(0);
  const [visiblePaymentModal, setVisiblePaymentModal] = useState(false);
  const [visibleStreamModal, setVisibleStreamModal] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [oneBalance, setOneBalance] = useState(null);
  const [twoBalance, setTwoBalance] = useState(null);
  const [threeBalance, setThreeBalance] = useState(null);
  const [fourBalance, setFourBalance] = useState(null);
  const [fiveBalance, setFiveBalance] = useState(null);
  const [sixBalance, setSixBalance] = useState(null);
  const [oneCount, setOneCount] = useState(null);
  const [twoCount, setTwoCount] = useState(null);
  const [threeCount, setThreeCount] = useState(null);
  const [fourCount, setFourCount] = useState(null);
  const [fiveCount, setFiveCount] = useState(null);
  const [sixCount, setSixCount] = useState(null);
  const [isStreamStart, setIsStreamStart] = useState(false)
  const [countdown, setCountdown] = useState(null);
  const [disableJoin, setDisableJoin] = useState(false);
  const [countVal, setCountdownVal] = useState(null);
  const [oneAnimationCount, setOneAnimationCount] = useState(null);
  const [twoAnimationCount, setTwoAnimationCount] = useState(null);
  const [threeAnimationCount, setThreeAnimationCount] = useState(null);
  const [fourAnimationCount, setFourAnimationCount] = useState(null);
  const [fiveAnimationCount, setFiveAnimationCount] = useState(null);
  const [sixAnimationCount, setSixAnimationCount] = useState(null);
  useFocusEffect(
    useCallback(() => {
      Orientation.lockToLandscape();

      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []), // Empty array means it will run every time the screen is focused
  );
  const statusMutation = useMutation({
    mutationFn: payload => {
      return gamePublishStatus(payload);
    },
    onSuccess: data => {
      // console.log("------success game status", data);
      setIsStreamStart(data.is_publishable == 1 ? true : false)
    },
    onError: error => {
      console.log('------ERROR game status -----', error);
    },
  });
  const mutation = useMutation({
    mutationFn: payload => {
      return gameCardBalance(payload);
    },
    onSuccess: data => {
      // console.log("dataaaaaa=======", JSON.stringify(data), "date==", new Date());
      /* if (data?.countdown_status === 1) {
        setCountdownVal(null)
      } else {
        setCountdownVal(data?.countdown)
      } */
      setCountdownVal(data?.countdown)
      const balance = data?.balances;
      if (!!balance["1"]?.balance) {
        setOneBalance(balance["1"].balance)
      } else {
        setOneBalance(null)
      }
      if (!!balance["2"]?.balance) {
        setTwoBalance(balance["2"].balance)
      } else {
        setTwoBalance(null)
      }
      if (!!balance["3"]?.balance) {
        setThreeBalance(balance["3"].balance)
      } else {
        setThreeBalance(null)
      }
      if (!!balance["4"]?.balance) {
        setFourBalance(balance["4"].balance)
      } else {
        setFourBalance(null)
      }
      if (!!balance["5"]?.balance) {
        setFiveBalance(balance["5"].balance)
      } else {
        setFiveBalance(null)
      }
      if (!!balance["6"]?.balance) {
        setSixBalance(balance["6"].balance)
      } else {
        setSixBalance(null)
      }
      if (!!balance["1"]?.joins) {
        setOneCount(balance["1"].joins)
      } else {
        setOneCount(null)
      }
      if (!!balance["2"]?.joins) {
        setTwoCount(balance["2"].joins)
      } else {
        setTwoCount(null)
      }
      if (!!balance["3"]?.joins) {
        setThreeCount(balance["3"].joins)
      } else {
        setThreeCount(null)
      }
      if (!!balance["4"]?.joins) {
        setFourCount(balance["4"].joins)
      } else {
        setFourCount(null)
      }
      if (!!balance["5"]?.joins) {
        setFiveCount(balance["5"].joins)
      } else {
        setFiveCount(null)
      }
      if (!!balance["6"]?.joins) {
        setSixCount(balance["6"].joins)
      } else {
        setSixCount(null)
      }
      if (!!balance["1"]?.animation_key) {
        setOneAnimationCount(balance["1"].animation_key)
      } else {
        setOneAnimationCount(null)
      }
      if (!!balance["2"]?.animation_key) {
        setTwoAnimationCount(balance["2"].animation_key)
      } else {
        setTwoAnimationCount(null)
      }
      if (!!balance["3"]?.animation_key) {
        setThreeAnimationCount(balance["3"].animation_key)
      } else {
        setThreeAnimationCount(null)
      }
      if (!!balance["4"]?.animation_key) {
        setFourAnimationCount(balance["4"].animation_key)
      } else {
        setFourAnimationCount(null)
      }
      if (!!balance["5"]?.animation_key) {
        setFiveAnimationCount(balance["5"].animation_key)
      } else {
        setFiveAnimationCount(null)
      }
      if (!!balance["6"]?.animation_key) {
        setSixAnimationCount(balance["6"].animation_key)
      } else {
        setSixAnimationCount(null)
      }
    },
    onError: error => {
      console.log('------ERROR joinGame -----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
    },
  });
  const deleteMutation = useMutation({
    mutationFn: payload => {
      return deleteJoinGame(payload);
    },
    onSuccess: data => {
      console.log("------success deleteJoinGame", data);
      const payload = {
        game_id: game.id
      };
      mutation.mutate(payload);
      setVisibleModal(false);
    },
    onError: error => {
      console.log('------ERROR game status -----', error);
    },
  });
  useEffect(() => {
    const payload = {
      game_id: game.id
    };
    mutation.mutate(payload);
    statusMutation.mutate(payload);
  }, [])
  useEffect(() => {
    const payload = {
      game_id: game.id
    };
    const interval = setInterval(() => {
      mutation.mutate(payload);
      statusMutation.mutate(payload);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const checkCardCount = (selectNum) => {
    switch (selectNum) {
      case 1:
        if (!!oneCount && oneCount > 0) {
          return true;
        } else {
          return false;
        }
      case 2:
        if (!!twoCount && twoCount > 0) {
          return true;
        } else {
          return false;
        }
      case 3:
        if (!!threeCount && threeCount > 0) {
          return true;
        } else {
          return false;
        }
      case 4:
        if (!!fourCount && fourCount > 0) {
          return true;
        } else {
          return false;
        }
      case 5:
        if (!!fiveCount && fiveCount > 0) {
          return true;
        } else {
          return false;
        }
      case 6:
        if (!!sixCount && sixCount > 0) {
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  }
  const onPressCard = number => {
    setSelectedCard(number);
    if (checkCardCount(number)) {
      setVisibleModal(true)
    } else {
      toggleModal(false);
    }
  };
  const toggleModal = (val) => {
    setVisiblePaymentModal(!visiblePaymentModal);
    if (val) {
      const payload = {
        game_id: game.id
      };
      mutation.mutate(payload);
    }

  };
  const toggleStreamModal = () => {
    setVisibleStreamModal(!visibleStreamModal);
    setIsStreamStart(!isStreamStart);
  }
  const positionFix = (num) => {
    switch (num) {
      case 1:
        if (!(parseInt(oneBalance) > 0)) {
          return true;
        } else {
          if (!!oneCount && oneCount > 0) {
            return false;
          } else {
            return true;
          }
        }
      case 2:
        if (!(parseInt(twoBalance) > 0)) {
          return true;
        } else {
          if (!!twoCount && twoCount > 0) {
            return false;
          } else {
            return true;
          }
        }
      case 3:
        if (!(parseInt(threeBalance) > 0)) {
          return true;
        } else {
          if (!!threeCount && threeCount > 0) {
            return false;
          } else {
            return true;
          }
        }
      case 4:
        if (!(parseInt(fourBalance) > 0)) {
          return true;
        } else {
          if (!!fourCount && fourCount > 0) {
            return false;
          } else {
            return true;
          }
        }
      case 5:
        if (!(parseInt(fiveBalance) > 0)) {
          return true;
        } else {
          if (!!fiveCount && fiveCount > 0) {
            return false;
          } else {
            return true;
          }
        }
      case 6:
        if (!(parseInt(sixBalance) > 0)) {
          return true;
        } else {
          if (!!sixCount && sixCount > 0) {
            return false;
          } else {
            return true;
          }
        }

      default:
        break;
    }
  }
  const addOneMore = () => {
    setVisibleModal(false);
    toggleModal(false);
  }
  const deleteOne = () => {
    const payload = {
      game_id: game.id,
      type: "single",
      card: selectedCard
    };
    deleteMutation.mutate(payload);
  }
  const deleteAll = () => {
    const payload = {
      game_id: game.id,
      type: "bulk",
      card: selectedCard
    };
    deleteMutation.mutate(payload);
  }
  useEffect(() => {
    if (!!countVal) {
      countDownCheck(countVal);
      setDisableJoin(true);
      toggleStreamModal();
    } else {
      setCountdown(null)
    }
  }, [countVal]);
  const countDownCheck = (date) => {
    const currentDate = new Date();
    const countDownDate = new Date(date);
    const countDownDateMilli = countDownDate.getTime();
    const currentDateMill = currentDate.getTime();
    const diffInMilliseconds = countDownDateMilli - currentDateMill;
    if (diffInMilliseconds > 0) {
      const diffInSeconds = diffInMilliseconds / 1000;
      setCountdown(parseInt(diffInSeconds));
    }
  }
  useEffect(() => {
    if (countdown !== null) {
      if (countdown > 0) {
        // Set an interval to decrease the countdown by 1 every second
        const timer = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        // Clear the interval when the component unmounts or countdown reaches 0
        return () => clearInterval(timer);
      }
    }
  }, [countdown]);
  const checkDisable = (balance, val) => {
    if (val) {
      return true;
    } else {
      if (parseInt(balance) > 0) {
        return false;
      } else {
        return true;
      }
    }
  }
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
                  disabled={checkDisable(oneBalance, disableJoin)}
                  onPress={() => {
                    onPressCard(1);
                  }}>
                  <ImageBackground
                    source={cardHeart}
                    resizeMode="cover"
                    style={styles.image}
                  >
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
                      <AnimationValue value={oneAnimationCount} />
                    </View>
                    <View style={[styles.backgroundContainer, { justifyContent: positionFix(1) ? 'space-between' : "flex-end", }]}>
                      {
                        (oneBalance !== null && !(parseInt(oneBalance) > 0)) &&
                        <View style={styles.lockContainer}>
                          <FastImage
                            source={lockIcon}
                            style={{ height: 22, width: 22 }}
                            resizeMode="contain"
                          />
                        </View>
                      }
                      {
                        (!!oneCount && oneCount > 0) &&
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <Text style={styles.countText}>{oneCount}x</Text>
                          <View style={styles.countContainer}>
                            <FastImage
                              source={coinIcon}
                              style={{ height: 22, width: 22 }}
                              resizeMode="contain"
                            />
                          </View>
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
                  disabled={checkDisable(twoBalance, disableJoin)}
                  onPress={() => {
                    onPressCard(2);
                  }}>
                  <ImageBackground
                    source={cardAce}
                    resizeMode="cover"
                    style={styles.image}
                  >
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
                      <AnimationValue value={twoAnimationCount} />
                    </View>
                    <View style={[styles.backgroundContainer, { justifyContent: positionFix(2) ? 'space-between' : "flex-end", }]}>
                      {
                        (twoBalance !== null && !(parseInt(twoBalance) > 0)) &&
                        <View style={styles.lockContainer}>
                          <FastImage
                            source={lockIcon}
                            style={{ height: 22, width: 22 }}
                            resizeMode="contain"
                          />
                        </View>
                      }
                      {
                        (!!twoCount && twoCount > 0) &&
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <Text style={styles.countText}>{twoCount}x</Text>
                          <View style={styles.countContainer}>
                            <FastImage
                              source={coinIcon}
                              style={{ height: 22, width: 22 }}
                              resizeMode="contain"
                            />
                          </View>
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
                  disabled={checkDisable(threeBalance, disableJoin)}
                  onPress={() => {
                    onPressCard(3);
                  }}>
                  <ImageBackground
                    source={cardClaver}
                    resizeMode="cover"
                    style={styles.image}
                  >
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
                      <AnimationValue value={threeAnimationCount} />
                    </View>
                    <View style={[styles.backgroundContainer, { justifyContent: positionFix(3) ? 'space-between' : "flex-end", }]}>
                      {
                        (threeBalance !== null && !(parseInt(threeBalance) > 0)) &&
                        <View style={styles.lockContainer}>
                          <FastImage
                            source={lockIcon}
                            style={{ height: 22, width: 22 }}
                            resizeMode="contain"
                          />
                        </View>
                      }
                      {
                        (!!threeCount && threeCount > 0) &&
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <Text style={styles.countText}>{threeCount}x</Text>
                          <View style={styles.countContainer}>
                            <FastImage
                              source={coinIcon}
                              style={{ height: 22, width: 22 }}
                              resizeMode="contain"
                            />
                          </View>
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
                  disabled={checkDisable(fourBalance, disableJoin)}
                  onPress={() => {
                    onPressCard(4);
                  }}>
                  <ImageBackground
                    source={cardDiamond}
                    resizeMode="cover"
                    style={styles.image}
                  >
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
                      <AnimationValue value={fourAnimationCount} />
                    </View>
                    <View style={[styles.backgroundContainer, { justifyContent: positionFix(4) ? 'space-between' : "flex-end", }]}>
                      {
                        (fourBalance !== null && !(parseInt(fourBalance) > 0)) &&
                        <View style={styles.lockContainer}>
                          <FastImage
                            source={lockIcon}
                            style={{ height: 22, width: 22 }}
                            resizeMode="contain"
                          />
                        </View>
                      }
                      {
                        (!!fourCount && fourCount > 0) &&
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <Text style={styles.countText}>{fourCount}x</Text>
                          <View style={styles.countContainer}>
                            <FastImage
                              source={coinIcon}
                              style={{ height: 22, width: 22 }}
                              resizeMode="contain"
                            />
                          </View>
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
                  disabled={checkDisable(fiveBalance, disableJoin)}
                  onPress={() => {
                    onPressCard(5);
                  }}>
                  <ImageBackground
                    source={cardMoon}
                    resizeMode="cover"
                    style={styles.image}
                  >
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
                      <AnimationValue value={fiveAnimationCount} />
                    </View>
                    <View style={[styles.backgroundContainer, { justifyContent: positionFix(5) ? 'space-between' : "flex-end", }]}>
                      {
                        (fiveBalance !== null && !(parseInt(fiveBalance) > 0)) &&
                        <View style={styles.lockContainer}>
                          <FastImage
                            source={lockIcon}
                            style={{ height: 22, width: 22 }}
                            resizeMode="contain"
                          />
                        </View>
                      }
                      {
                        (!!fiveCount && fiveCount > 0) &&
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <Text style={styles.countText}>{fiveCount}x</Text>
                          <View style={styles.countContainer}>
                            <FastImage
                              source={coinIcon}
                              style={{ height: 22, width: 22 }}
                              resizeMode="contain"
                            />
                          </View>
                        </View>
                      }
                    </View>
                  </ImageBackground>
                </Pressable>
                <View style={{ flex: 2, backgroundColor: '#FFF' }}>
                  {
                    isStreamStart ? <ViewLiveStream isHost={false} /> :
                      <FastImage
                        source={banner}
                        style={{ flex: 1 }}
                        resizeMode="contain"
                      />
                  }
                </View>
                <Pressable
                  style={[
                    styles.cardContainer,
                    selectedCard === 6 && styles.selectedCard,
                  ]}
                  disabled={checkDisable(sixBalance, disableJoin)}
                  onPress={() => {
                    onPressCard(6);
                  }}>
                  <ImageBackground
                    source={cardFlag}
                    resizeMode="cover"
                    style={styles.image}
                  >
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
                      <AnimationValue value={sixAnimationCount} />
                    </View>
                    <View style={[styles.backgroundContainer, { justifyContent: positionFix(6) ? 'space-between' : "flex-end", }]}>
                      {
                        (sixBalance !== null && !(parseInt(sixBalance) > 0)) &&
                        <View style={styles.lockContainer}>
                          <FastImage
                            source={lockIcon}
                            style={{ height: 22, width: 22 }}
                            resizeMode="contain"
                          />
                        </View>
                      }
                      {
                        (!!sixCount && sixCount > 0) &&
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <Text style={styles.countText}>{sixCount}x</Text>
                          <View style={styles.countContainer}>
                            <FastImage
                              source={coinIcon}
                              style={{ height: 22, width: 22 }}
                              resizeMode="contain"
                            />
                          </View>
                        </View>
                      }
                    </View>
                  </ImageBackground>
                </Pressable>
              </View>
            </View>
            <View style={styles.nextButtonContainer}>
              {
                (!!countdown && countdown > 0) &&
                <View style={styles.countDownContainer}>
                  <Text style={styles.countDownText}>{countdown}</Text>
                </View>
              }
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
      <Modal isVisible={visibleModal} onBackdropPress={() => { setVisibleModal(false) }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <LinearGradient
            colors={['#412653', '#2E1B3B']}
            style={styles.balanceGradientContainer}>
            <View style={{ alignItems: 'flex-end', marginBottom: 10 }}>
              <Pressable onPress={() => { setVisibleModal(false) }}>
                <Image
                  style={{ height: 24, width: 24 }}
                  source={closeIcon}
                  resizeMode="contain"
                  tintColor={'#FBFBFB'}
                />
              </Pressable>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <ButtonComponent
                buttonColor="#FFF"
                wrapperStyles={{
                  marginTop: 20,
                  marginVertical: 20,
                  height: 46,
                }}
                textStyles={{
                  color: '#DC9C40',
                  fontSize: 16,
                  fontFamily: FontFamily.poppinsMedium,
                }}
                text={'Add One More'}
                onPress={addOneMore}
              />
              <ButtonComponent
                buttonColor="#F10000"
                wrapperStyles={{
                  marginVertical: 15,
                  height: 46,
                }}
                textStyles={{
                  color: '#FFF',
                  fontSize: 16,
                  fontFamily: FontFamily.poppinsMedium,
                }}
                text={'Delete One'}
                onPress={deleteOne}
              />
              <ButtonComponent
                buttonColor="#FF0000"
                wrapperStyles={{
                  marginVertical: 15,
                  height: 46,
                }}
                textStyles={{
                  color: '#FFF',
                  fontSize: 16,
                  fontFamily: FontFamily.poppinsMedium,
                }}
                text={'Delete All'}
                onPress={deleteAll}
              />
            </View>
          </LinearGradient>
        </View>
      </Modal>
      <LivestreamModal visible={visibleStreamModal} onClose={toggleStreamModal} />
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
    alignItems: "flex-end"
    // justifyContent: 'center',
  },
  nextText: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsMedium,
    color: '#FFF',
  },
  backgroundContainer: {
    flex: 1,
    flexDirection: "row",
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
  balanceGradientContainer: {
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  countContainer: {
    height: 46,
    width: 46,
    padding: 10,
    backgroundColor: "yellow",
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 100,
    marginRight: 5,
    marginVertical: 5,
    // margin: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  countText: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsBold,
    color: '#BF2428',
  },
  countDownContainer: {
    backgroundColor: "red",
    padding: 20,
    margin: 5,
    borderRadius: 100,
  },
  countDownText: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsBold,
    color: '#FFF',
  }
});

