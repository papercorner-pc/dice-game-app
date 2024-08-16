import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonComponent from '../../../components/molecules/Button';
import LiveStreaming from '../../../components/molecules/LiveStreaming';
import { SafeScreen } from '../../../components/template';
import { goBack, navigate } from '../../../navigators/utils';
import { announceGameResult } from '../../../services/game/game';
import backIcon from '../../../theme/assets/images/back.png';
import { FontFamily } from '../../../theme/fonts';
import { resultDiceCards } from '../../../utils/constants';
import { customToastMessage } from '../../../utils/UtilityHelper';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { ScrollView } from 'react-native-gesture-handler';

const AnnounceResult = props => {
  const { gameId } = props.route.params;
  const [resultDice, setResultDice] = useState(resultDiceCards);
  const [resultDiceTwo, setResultDiceTwo] = useState(resultDiceCards);
  const [resultDiceThree, setResultDiceThree] = useState(resultDiceCards);
  const mutation = useMutation({
    mutationFn: payload => {
      return announceGameResult(payload);
    },
    onSuccess: data => {
      console.log('---success joinGame', data);
      const { pop } = props.navigation;
      pop(2);
    },
    onError: error => {
      console.log('------ERROR joinGame -----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
    },
  });
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
    const payload = {
      game_id: gameId,
      dice_1: parseInt(diceOne.id),
      dice_2: parseInt(diceTwo.id),
      dice_3: parseInt(diceThree.id),
    };
    mutation.mutate(payload);
  };
  const streamCallBack = () => {
    console.log("streaming startred========");
  }
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
        <LiveStreaming isHost={true} />
      </View>
      <View style={{ flex: 0.3 }}>
        <ScrollView>
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
  }
});
