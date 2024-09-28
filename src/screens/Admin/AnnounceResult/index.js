import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonComponent from '../../../components/molecules/Button';
import LiveStreaming from '../../../components/molecules/LiveStreaming';
import { SafeScreen } from '../../../components/template';
import { goBack, navigate } from '../../../navigators/utils';
import { addCountDown, announceGameResult, completeCountDown, gamePublishStatus } from '../../../services/game/game';
import backIcon from '../../../theme/assets/images/back.png';
import { FontFamily } from '../../../theme/fonts';
import { resultDiceCards } from '../../../utils/constants';
import { customToastMessage } from '../../../utils/UtilityHelper';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from '../../../theme/colors';

const AnnounceResult = props => {
  const { gameId, fromDirect } = props.route.params;
  const [resultDice, setResultDice] = useState(resultDiceCards);
  const [resultDiceTwo, setResultDiceTwo] = useState(resultDiceCards);
  const [resultDiceThree, setResultDiceThree] = useState(resultDiceCards);
  const [countDown, setCountDown] = useState(null);
  const [showCountDown, setShowCountDown] = useState(true);
  const [startCount, setStartCount] = useState(false);

  const mutation = useMutation({
    mutationFn: payload => {
      return announceGameResult(payload);
    },
    onSuccess: data => {
      console.log('---success joinGame', data);
      customToastMessage(data?.message, 'success');
    },
    onError: error => {
      console.log('------ERROR joinGame -----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
    },
  });
  const redirectFn = () => {
    if (fromDirect) {
      goBack()
    } else {
      const { pop } = props.navigation;
      pop(2);
    }
  }
  const countMutation = useMutation({
    mutationFn: payload => {
      return addCountDown(payload);
    },
    onSuccess: data => {
      console.log('---success joinGame', data);
      setShowCountDown(false)
      setStartCount(true);
      setCountDown(parseInt(countDown))
    },
    onError: error => {
      console.log('------ERROR joinGame -----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
    },
  });
  const countStatusMutation = useMutation({
    mutationFn: payload => {
      return completeCountDown(payload);
    },
    onSuccess: data => {
      console.log('---success joinGame', data);
      // setShowCountDown(false)
    },
    onError: error => {
      console.log('------ERROR joinGame -----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
    },
  });
  const statusMutation = useMutation({
    mutationFn: payload => {
      return gamePublishStatus(payload);
    },
    onSuccess: data => {
      console.log('------success getJoinedUserList -----', error);
    },
    onError: error => {
      console.log('------ERROR getJoinedUserList -----', error);
    },
  });
  /* useEffect(() => {
    const payload = {
      game_id: gameId,
      is_publishable: true
    };
    statusMutation.mutate(payload);
  }, []) */
  useEffect(() => {
    if (countDown !== null && startCount) {
      if (countDown > 0) {
        // Set an interval to decrease the countdown by 1 every second
        const timer = setInterval(() => {
          setCountDown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        // Clear the interval when the component unmounts or countdown reaches 0
        return () => clearInterval(timer);
      } else {
        // Disable the button when countdown reaches 0
        const payload = {
          game_id: gameId,
          status: 1,
        };
        countStatusMutation.mutate(payload);
      }
    }
  }, [countDown, startCount]);
  const onSelectDice = item => {
    const resultDiceData = [...resultDice];
    const updatedDiceResult = resultDiceData.map?.(itemValue => {
      const selectedItem = { ...itemValue };
      selectedItem.isSelected = false;
      if (selectedItem.id === item.id) {
        selectedItem.isSelected = !item.isSelected;
      }
      return selectedItem;
    });
    setResultDice(updatedDiceResult);
  };
  const onSelectDiceTwo = item => {
    const resultDiceData = [...resultDiceTwo];
    const updatedDiceResult = resultDiceData.map?.(itemValue => {
      const selectedItem = { ...itemValue };
      selectedItem.isSelected = false;
      if (selectedItem.id === item.id) {
        selectedItem.isSelected = !item.isSelected;
      }
      return selectedItem;
    });
    setResultDiceTwo(updatedDiceResult);
  };
  const onSelectDiceThree = item => {
    const resultDiceData = [...resultDiceThree];
    const updatedDiceResult = resultDiceData.map?.(itemValue => {
      const selectedItem = { ...itemValue };
      selectedItem.isSelected = false;
      if (selectedItem.id === item.id) {
        selectedItem.isSelected = !item.isSelected;
      }
      return selectedItem;
    });
    setResultDiceThree(updatedDiceResult);
  };
  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          onSelectDice(item);
        }}
        style={[
          {
            margin: 3,
            height: 60,
            width: 60,
          },
          item.isSelected && {
            borderWidth: 3,
            borderColor: 'green',
          },
        ]}>
        <ImageBackground
          source={item.bgImage}
          resizeMode="cover"
          style={{ flex: 1, resizeMode: 'cover' }}
        />
      </Pressable>
    );
  };
  const renderItemTwo = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          onSelectDiceTwo(item);
        }}
        style={[
          {
            margin: 3,
            height: 60,
            width: 60,
          },
          item.isSelected && {
            borderWidth: 3,
            borderColor: 'green',
          },
        ]}>
        <ImageBackground
          source={item.bgImage}
          resizeMode="cover"
          style={{ flex: 1, resizeMode: 'cover' }}
        />
      </Pressable>
    );
  };
  const renderItemThree = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          onSelectDiceThree(item);
        }}
        style={[
          {
            margin: 3,
            height: 60,
            width: 60,
          },
          item.isSelected && {
            borderWidth: 3,
            borderColor: 'green',
          },
        ]}>
        <ImageBackground
          source={item.bgImage}
          resizeMode="cover"
          style={{ flex: 1, resizeMode: 'cover' }}
        />
      </Pressable>
    );
  };
  const onPressAnnounce = () => {
    const diceOne = resultDice.find(item => item.isSelected === true);
    const diceTwo = resultDiceTwo.find(item => item.isSelected === true);
    const diceThree = resultDiceThree.find(item => item.isSelected === true);
    let isValid = true;
    if (diceOne?.id === undefined || diceOne.id === null) {
      isValid = false;
      customToastMessage("Select card One", 'error');
    }
    if (diceTwo?.id === undefined || diceOne.id === null) {
      isValid = false;
      customToastMessage("Select card Two", 'error');
    }
    if (diceThree?.id === undefined || diceOne.id === null) {
      isValid = false;
      customToastMessage("Select card Three", 'error');
    }
    if (isValid) {
      const payload = {
        game_id: gameId,
        dice_1: parseInt(diceOne.id),
        dice_2: parseInt(diceTwo.id),
        dice_3: parseInt(diceThree.id),
      };
      mutation.mutate(payload);
    }
  };
  const streamCallBack = () => {
    console.log("streaming startred========");
  }
  const onPressStart = () => {
    const payload = {
      game_id: gameId,
      countdown: parseInt(countDown),
    };
    countMutation.mutate(payload);
  }
  const renderLiveStreaming = useCallback(() => {
    return (
      <LiveStreaming isHost={true} streamEnd={redirectFn} />
    );
  }, []);
  return (
    <SafeScreen>
      <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            goBack();
          }}>
          <Image
            style={{ height: 24, width: 24, marginRight: 24 }}
            source={backIcon}
            resizeMode="contain"
          // tintColor={'#FBFBFB'}
          />
        </TouchableOpacity>
        <View style={styles.mainHeadingContainer}>
          <Text style={styles.headingText}>Announce Result</Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.7,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {renderLiveStreaming()}
      </View>
      <View style={{ flex: 0.3 }}>
        <ScrollView>
          {
            showCountDown &&
            <Collapse>
              <CollapseHeader>
                <View style={[styles.titleContainer]}>
                  <Text style={{
                    fontSize: 18,
                    fontFamily: FontFamily.poppinsMedium,
                    color: 'white',
                  }}>Start Count Down</Text>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={{ backgroundColor: "#FFF", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center" }}>
                  <TextInput
                    placeholder={'Enter'}
                    style={styles.input}
                    keyboardType={'number-pad'}
                    value={countDown}
                    onChangeText={setCountDown}
                  />
                  <Pressable style={styles.startContainer} onPress={onPressStart}>
                    <Text style={styles.startText}>Start</Text>
                  </Pressable>
                </View>
              </CollapseBody>
            </Collapse>
          }
          <Collapse>
            <CollapseHeader>
              <View style={styles.titleContainer}>
                <Text style={{
                  fontSize: 18,
                  fontFamily: FontFamily.poppinsMedium,
                  color: 'white',
                }}>Dice 1</Text>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View style={{ backgroundColor: "#442554" }}>
                <FlatList
                  horizontal={true}
                  data={resultDice}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </CollapseBody>
          </Collapse>
          <Collapse>
            <CollapseHeader>
              <View style={styles.titleContainer}>
                <Text style={{
                  fontSize: 18,
                  fontFamily: FontFamily.poppinsMedium,
                  color: 'white',
                }}>Dice 2</Text>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View style={{ backgroundColor: "#442554" }}>
                <FlatList
                  horizontal={true}
                  data={resultDiceTwo}
                  renderItem={renderItemTwo}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </CollapseBody>
          </Collapse>
          <Collapse>
            <CollapseHeader>
              <View style={styles.titleContainer}>
                <Text style={{
                  fontSize: 18,
                  fontFamily: FontFamily.poppinsMedium,
                  color: 'white',
                }}>Dice 3</Text>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View style={{ backgroundColor: "#442554" }}>
                <FlatList
                  horizontal={true}
                  data={resultDiceThree}
                  renderItem={renderItemThree}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </CollapseBody>
          </Collapse>
        </ScrollView>
        <ButtonComponent
          buttonColor="#DC9C40"
          wrapperStyles={{
            // marginBottom: 10,
          }}
          textStyles={{
            color: '#090D12',
            fontSize: 16,
            fontFamily: FontFamily.poppinsRegular,
          }}
          text={'Announce'}
          onPress={onPressAnnounce}
        />
      </View>
      {/* <LinearGradient
        colors={['#412653', '#2E1B3B']}
        style={{ flex: 0.3, padding: 10 }}>
        <Text
          style={{
            margin: 5,
            fontSize: 18,
            fontFamily: FontFamily.poppinsMedium,
            color: 'white',
          }}>
          Dice 1
        </Text>
        <FlatList
          horizontal={true}
          data={resultDice}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
        <Text
          style={{
            margin: 5,
            fontSize: 18,
            fontFamily: FontFamily.poppinsMedium,
            color: 'white',
          }}>
          Dice 2
        </Text>
        <FlatList
          horizontal={true}
          data={resultDiceTwo}
          renderItem={renderItemTwo}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
        <Text
          style={{
            margin: 5,
            fontSize: 18,
            fontFamily: FontFamily.poppinsMedium,
            color: 'white',
          }}>
          Dice 3
        </Text>
        <FlatList
          horizontal={true}
          data={resultDiceThree}
          renderItem={renderItemThree}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
        <ButtonComponent
          buttonColor="#DC9C40"
          wrapperStyles={{
            marginBottom: 10,
          }}
          textStyles={{
            color: '#090D12',
            fontSize: 16,
            fontFamily: FontFamily.poppinsRegular,
          }}
          text={'Announce'}
          onPress={onPressAnnounce}
        />
      </LinearGradient> */}
    </SafeScreen>
  );
};

export default AnnounceResult;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 20,
    top: 10,
  },
  mainHeadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: -20,
    // paddingHorizontal: 5,
  },
  headingText: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsMedium,
    color: '#000',
  },
  titleContainer: {
    backgroundColor: "#442554",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#FFF"
  },
  input: {
    height: 50, // Adjust height as needed
    paddingVertical: 0, // Remove vertical padding
    paddingHorizontal: 10, // Adjust horizontal padding
    fontSize: 14, // Adjust font size as needed
    lineHeight: 18, // Adjust line height as needed
    width: '80%',
    color: Colors.black,
  },
  startContainer: {
    height: 30,
    backgroundColor: "#DC9C40",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  startText: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsMedium,
    color: '#000',
  }
});
