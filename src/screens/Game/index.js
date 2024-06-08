import {SafeScreen} from '../../components/template';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FontFamily} from '../../theme/fonts';
import thumbUp from '../../theme/assets/images/thumbUp.png';
import thumbDown from '../../theme/assets/images/thumbDown.png';
import robo from '../../theme/assets/images/robo-1.png';
import FastImage from 'react-native-fast-image';
import {gType} from '../../utils/constants';
import {useState} from 'react';
import GameTab from '../../components/molecules/MaterialTab/GameTab';
import filterIcon from '../../theme/assets/images/filter.png';
import CompletedList from '../../components/molecules/Game/CompletedList';

const staticData = [
  {value: gType.result},
  {value: gType.liveMatch},
  {value: gType.upComing},
];

const GameScreen = props => {
  const [option, setOption] = useState(staticData[0].value);
  return (
    <SafeScreen>
      <View style={styles.topContainer}>
        <LinearGradient colors={['#412653', '#2E1B3B']} style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 40,
            }}>
            <View style={{padding: 20}}>
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: FontFamily.poppinsSemiBold,
                  color: '#FFF',
                  marginBottom: 5,
                }}>
                Track
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: FontFamily.poppinsRegular,
                  color: '#FFF',
                  marginBottom: 15,
                }}>
                Your Dice Game Journey
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginRight: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: FontFamily.poppinsRegular,
                      color: '#FFF',
                      marginRight: 5,
                    }}>
                    Win : 12
                  </Text>
                  <FastImage
                    source={thumbUp}
                    style={{
                      height: 12,
                      width: 12,
                    }}
                    resizeMode="contain"
                  />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: FontFamily.poppinsRegular,
                      color: '#FFF',
                      marginRight: 5,
                    }}>
                    Lost : 13
                  </Text>
                  <FastImage
                    source={thumbDown}
                    style={{
                      height: 12,
                      width: 12,
                    }}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}>
              <FastImage
                source={robo}
                style={{
                  height: 134,
                  width: 125,
                }}
                resizeMode="cover"
              />
            </View>
          </View>
        </LinearGradient>
      </View>
      <GameTab
        data={staticData}
        onSelect={value => setOption(value)}
        selectedOption={option}
      />
      <View style={{flex: 1, backgroundColor: '#EEEDED', padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.historyTitle}>Match List</Text>
          </View>
          <View style={{justifyContent: 'center', marginTop: 5}}>
            <FastImage
              source={filterIcon}
              style={{
                height: 14,
                width: 12,
                marginBottom: 10,
              }}
              resizeMode="contain"
            />
          </View>
        </View>
        <CompletedList />
        <CompletedList />
      </View>
    </SafeScreen>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  topContainer: {
    height: '30%',
  },
  historyTitle: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsSemiBold,
    color: '#070A0D',
  },
});
