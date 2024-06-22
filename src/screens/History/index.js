import { SafeScreen } from '../../components/template';
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { FontFamily } from '../../theme/fonts';
import thumbUp from '../../theme/assets/images/thumbUp.png';
import thumbDown from '../../theme/assets/images/thumbDown.png';
import robo from '../../theme/assets/images/robo-1.png';
import game from '../../theme/assets/images/game.png';
import filterIcon from '../../theme/assets/images/filter.png';
import CompletedList from '../../components/molecules/Game/CompletedList';
import { useMutation } from '@tanstack/react-query';
import { gameList } from '../../services/game/game';
import { customToastMessage } from '../../utils/UtilityHelper';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import AdminGameList from '../../components/molecules/Game/AdminGameList';
import EmptyComponent from '../../components/molecules/EmptyComponet';
import { storage } from '../../App';

const HistoryScreen = props => {
  const isAdmin = storage.getBoolean('is_admin');
  const [gameListData, setGameListData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userGameHistory, setUserGameHistory] = useState(null);
  const mutation = useMutation({
    mutationFn: payload => {
      return gameList(payload);
    },
    onSuccess: data => {
      console.log('---success gameList', data);
      setGameListData(data.games);
      const userData = data.hasOwnProperty('user_details') ? data.user_details : null;
      setUserGameHistory(userData)
    },
    onError: error => {
      console.log('------ERROR gameList -----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
    },
  });
  useFocusEffect(
    useCallback(() => {
      const payload = {
        type: 'completed',
      };
      mutation.mutate(payload);
      return () => { };
    }, [refreshing]), // Empty array means it will run every time the screen is focused
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request or some data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  return (
    <SafeScreen>
      <View style={styles.topContainer}>
        <LinearGradient colors={['#412653', '#2E1B3B']} style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 40,
            }}>
            <View style={{ padding: 20 }}>
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
              <View style={{ flexDirection: 'row', marginBottom: 15 }}>
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
                    Win : {userGameHistory?.total_win}
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: FontFamily.poppinsRegular,
                      color: '#FFF',
                      marginRight: 5,
                    }}>
                    Lost : {userGameHistory?.total_loss}
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
                  ₹{userGameHistory?.total_earning.toFixed(2)}
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
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.historyTitle}>History</Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
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
        <FlatList
          data={gameListData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <>
              {
                isAdmin ?
                  <AdminGameList
                    isAnnounced={true}
                    game={item}
                  /> :
                  <CompletedList item={item} />
              }
            </>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <EmptyComponent
              text={'No Completed Matches Right Now'}
              image={game}
            />
          )}
        />
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
