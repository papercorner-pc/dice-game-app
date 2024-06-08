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
import FastImage from 'react-native-fast-image';
import {FontFamily} from '../../theme/fonts';
import thumbUp from '../../theme/assets/images/thumbUp.png';
import thumbDown from '../../theme/assets/images/thumbDown.png';
import robo from '../../theme/assets/images/robo-1.png';
import filterIcon from '../../theme/assets/images/filter.png';
import CompletedList from '../../components/molecules/Game/CompletedList';

const HistoryScreen = props => {
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
              <View style={{flexDirection: 'row', marginBottom: 15}}>
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
              <Text style={styles.earningText}>
                Earnings :{' '}
                <Text
                  style={{
                    fontFamily: FontFamily.poppinsSemiBold,
                    fontSize: 16,
                  }}>
                  ₹2000.00
                </Text>
              </Text>
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
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.historyTitle}>History</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
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
        <CompletedList />
      </View>
    </SafeScreen>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  topContainer: {
    height: '30%',
  },
  earningText: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsMedium,
    color: '#FBFBFB',
  },
  container: {
    padding: 15,
    backgroundColor: '#EEEDED',
    flex: 1,
  },
  historyTitle: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsSemiBold,
    color: '#070A0D',
  },
});
