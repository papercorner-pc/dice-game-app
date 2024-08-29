import { SafeScreen } from '../../../components/template';
import {
  View,
  FlatList,
  RefreshControl,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import gameIcon from '../../../theme/assets/images/robo.png';
import notiIcon from '../../../theme/assets/images/notificationIcon.png';
import game from '../../../theme/assets/images/game.png';
import MaterialTab from '../../../components/molecules/MaterialTab';
import { useCallback, useState, useEffect } from 'react';
import { type } from '../../../utils/constants';
import UpcomingList from '../../../components/molecules/Game/UpcomingList';
import CompletedList from '../../../components/molecules/Game/CompletedList';
import EmptyComponent from '../../../components/molecules/EmptyComponet';
import { useMutation } from '@tanstack/react-query';
import { gameList } from '../../../services/game/game';
import { customToastMessage } from '../../../utils/UtilityHelper';
import { navigate } from '../../../navigators/utils';
import group from '../../../theme/assets/images/group.png';
import { FontFamily } from '../../../theme/fonts';

const staticData = [
  { value: type.live },
  { value: type.resultWaiting },
  { value: type.completed },
];

const AgentHomeScreen = props => {
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
  /* useEffect(() => {
    const interval = setInterval(() => {
      const payload = {
        type:
          option === 'Completed'
            ? 'completed'
            : option === 'Live'
              ? 'upcoming'
              : 'live',
      };
      mutation.mutate(payload);
    }, 2000);
    return () => clearInterval(interval);
  }, []); */
  const onNAvigateToAgent = () => {
    navigate('DealerList');
  };
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
                <Pressable
                  style={[styles.contestContainer, { marginTop: 20 }]}
                  onPress={onNAvigateToAgent}>
                  <FastImage
                    source={group}
                    style={{
                      height: 16,
                      width: 14,
                      marginRight: 4,
                    }}
                    resizeMode="contain"
                  />
                  <Text style={[styles.addText, { color: "#a0549c" }]}>Dealers</Text>
                </Pressable>
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
                  <UpcomingList item={item} isAgent={true} />
                ) : (
                  <CompletedList item={item} isAgent={true} />
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

export default AgentHomeScreen;

const styles = StyleSheet.create({
  contestContainer: {
    backgroundColor: 'white',
    width: 132,
    height: 33,
    borderWidth: 1,
    borderColor: '#FBFBFB',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  addText: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsMedium,
    color: '#DC9C40',
  },
})