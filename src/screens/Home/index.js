import { SafeScreen } from '../../components/template';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import gameIcon from '../../theme/assets/images/robo.png';
import notiIcon from '../../theme/assets/images/notificationIcon.png';
import thumbUp from '../../theme/assets/images/thumbUp.png';
import thumbDown from '../../theme/assets/images/thumbDown.png';
import game from '../../theme/assets/images/game.png';
import coinIcon from '../../theme/assets/images/star.png';
import { Colors } from '../../theme/colors';
import { FontFamily } from '../../theme/fonts';
import MaterialTab from '../../components/molecules/MaterialTab';
import { useCallback, useState, useEffect } from 'react';
import { type } from '../../utils/constants';
import UpcomingList from '../../components/molecules/Game/UpcomingList';
import CompletedList from '../../components/molecules/Game/CompletedList';
import EmptyComponent from '../../components/molecules/EmptyComponet';
import { useMutation } from '@tanstack/react-query';
import { gameList } from '../../services/game/game';
import { customToastMessage } from '../../utils/UtilityHelper';
import { navigate } from '../../navigators/utils';

const staticData = [
  { value: type.live },
  { value: type.resultWaiting },
  { value: type.completed },
];

const HomeScreen = props => {
  const [option, setOption] = useState(staticData[0].value);
  const [gameListData, setGameListData] = useState([]);
  const [userGameHistory, setUserGameHistory] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const mutation = useMutation({
    mutationFn: payload => {
      return gameList(payload);
    },
    onSuccess: data => {
      console.log('---success gameList', data);
      setGameListData(data.games);
      setUserGameHistory(data.user_details);
    },
    onError: error => {
      console.log('------ERROR gameList -----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
    },
  });
  useEffect(() => {
    const payload = {
      type:
        option === 'Completed'
          ? 'completed'
          : option === 'Live'
            ? 'upcoming'
            : 'live',
    };
    mutation.mutate(payload);
  }, [option, refreshing]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request or some data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  return (
    <SafeScreen>
      <View style={{ backgroundColor: '#EEEDED', flex: 1 }}>
        <View style={{ height: '30%' }}>
          <LinearGradient
            colors={['#412653', '#2E1B3B']}
            style={{ flex: 1, padding: 10 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View
                style={{
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  marginTop: '5%',
                }}>
                <FastImage
                  source={gameIcon}
                  style={{
                    height: 165,
                    width: 125,
                  }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Pressable onPress={() => { navigate("Notification") }}>
                  <FastImage
                    source={notiIcon}
                    style={{
                      height: 34,
                      width: 34,
                    }}
                    resizeMode="contain"
                  />
                </Pressable>
              </View>
            </View>
          </LinearGradient>
        </View>
        <View
          style={{
            height: '25%',
            backgroundColor: Colors.white,
            borderRadius: 20,
            position: 'relative',
            marginTop: -50,
            marginBottom: 20,
            // padding: 20,
            margin: 15,
            justifyContent: 'space-around',
          }}>
          <View style={{ padding: 20 }}>
            <Text
              style={{
                fontSize: 22,
                fontFamily: FontFamily.poppinsRegular,
                color: '#070A0D',
                marginBottom: 5,
              }}>
              Hello,
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: FontFamily.poppinsBlack,
                  color: '#070A0D',
                }}>
                {userGameHistory?.user_name ? userGameHistory?.user_name : ''}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: FontFamily.poppinsRegular,
                color: '#101820',
              }}>
              Welcome to Your Scoreboard
            </Text>
          </View>
          <View style={{ padding: 20, marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: FontFamily.poppinsSemiBold,
                color: '#070A0D',
              }}>
              {userGameHistory?.total_joined_game}
            </Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: FontFamily.poppinsRegular,
                  color: '#5F646A',
                }}>
                Total Matches
              </Text>
              <View style={{ flexDirection: 'row' }}>
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
                      color: '#000000',
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
                      color: '#000000',
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
            </View>
          </View>
          <View
            style={{
              height: 30,
              backgroundColor: '#DC9C40',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: FontFamily.poppinsMedium,
                color: '#000000',
                marginRight: 5,
              }}>
              Earnings : <FastImage
                source={coinIcon}
                style={{
                  height: 12,
                  width: 10,
                }}
                resizeMode="contain"
              /> {userGameHistory?.total_earning}
            </Text>
          </View>
        </View>
        <MaterialTab
          data={staticData}
          onSelect={value => setOption(value)}
          selectedOption={option}
        />
        <View style={{ marginHorizontal: 10, flex: 1 }}>
          <FlatList
            data={gameListData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <>
                {option === 'Live' ? (
                  <UpcomingList item={item} />
                ) : (
                  <CompletedList item={item} />
                )}
              </>
            )
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={() => (
              <EmptyComponent
                text={
                  option === 'Live'
                    ? 'No Live Matches Right Now'
                    : option === 'Completed'
                      ? 'No Completed Matches Right Now'
                      : 'No Waiting Matches Right Now'
                }
                image={game}
              />
            )}
          />
        </View>
      </View>
    </SafeScreen>
  );
};

export default HomeScreen;
