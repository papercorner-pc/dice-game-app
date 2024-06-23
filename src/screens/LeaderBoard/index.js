import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeScreen } from '../../components/template';
import { goBack } from '../../navigators/utils';
import backIcon from '../../theme/assets/images/back.png';
import diceIcon from '../../theme/assets/images/diceBg.png';
import playIcon from '../../theme/assets/images/play.png';
import sortIcon from '../../theme/assets/images/sort.png';
import { FontFamily } from '../../theme/fonts';
import { paymentMethodListData } from '../../utils/constants';
import { useMutation } from '@tanstack/react-query';
import { gameDetails, getJoinedUserList } from '../../services/game/game';
import { customToastMessage } from '../../utils/UtilityHelper';
import { useCallback, useEffect, useState } from 'react';
import game from '../../theme/assets/images/game.png';
import EmptyComponent from '../../components/molecules/EmptyComponet';

const LeaderBoard = props => {
  const _keyExtractor = (item, index) => index.toString();
  const { gameId } = props.route.params;
  const [leaderBoardList, setLeaderBoardList] = useState([]);
  const [adminData, setAdminData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const mutation = useMutation({
    mutationFn: payload => {
      return getJoinedUserList(payload);
    },
    onSuccess: data => {
      console.log('---success gameDetails', data);
      const userData = data.hasOwnProperty('users') ? data.users : [];
      setLeaderBoardList(userData);
      setAdminData(data?.admin_earnings[0]);
    },
    onError: error => {
      console.log('------ERROR gameDetails -----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
    },
  });
  useEffect(() => {
    const payload = {
      game_id: gameId,
    };
    mutation.mutate(payload);
  }, [refreshing]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request or some data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  const renderLeaderBoardMethod = ({ item }) => {
    return (
      <View style={styles.listContainer}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.listImageContainer}>
            <FastImage
              style={{ height: 28, width: 28 }}
              source={{ uri: item.user_profile }}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.contestNameText}>{item.user_name}</Text>
            <Text style={styles.wonText}>
              Won :{' '}
              <Text style={styles.wonAmountText}>₹{item.game_earning}</Text>
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: 'flex-start' }}>
          <Text style={styles.wonText}>₹ {item.user_investment}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeScreen>
      <View style={[styles.headerContainer, { height: '25%' }]}>
        <View style={{ flexDirection: 'row', paddingVertical: 30 }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              goBack();
            }}>
            <Image
              style={{ height: 24, width: 24, marginRight: 24 }}
              source={backIcon}
              resizeMode="contain"
              tintColor={'#FBFBFB'}
            />
          </TouchableOpacity>
          <View style={styles.mainHeadingContainer}>
            <Text style={styles.headingText}>Match Result</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            paddingHorizontal: 20,
          }}>
          <View>
            <Text
              style={{
                fontSize: 27,
                fontFamily: FontFamily.poppinsSemiBold,
                color: '#FFF',
                textAlign: 'center',
              }}>
              ₹ {adminData.game_investment}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: FontFamily.poppinsMedium,
                color: '#FBFBFB',
                textAlign: 'center',
              }}>
              Amount Received
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 27,
                fontFamily: FontFamily.poppinsSemiBold,
                color: '#FFF',
                textAlign: 'center',
              }}>
              ₹ {adminData.game_total_earnings}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: FontFamily.poppinsMedium,
                color: '#FBFBFB',
                textAlign: 'center',
              }}>
              Price Pool
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.videoContainer}>
          <Pressable style={{ flexDirection: 'row' }}>
            <FastImage
              style={{ height: 18, width: 18, marginRight: 10 }}
              source={playIcon}
              resizeMode="contain"
            />
            <Text style={styles.watchText}>Watch Result</Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 2,
            padding: 20,
            backgroundColor: '#FFF',
          }}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.leaderBoardText}>Lead board</Text>
            <Text style={styles.contestText}>
              {leaderBoardList.length} Contestants
            </Text>
          </View>
          <View style={{ justifyContent: 'center', marginTop: 5 }}>
            <FastImage
              source={sortIcon}
              style={{
                height: 24,
                width: 24,
                marginBottom: 10,
              }}
              resizeMode="contain"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 2,
            padding: 20,
            backgroundColor: '#FFF',
          }}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.investText}>Contestant List</Text>
          </View>
          <View style={{ justifyContent: 'center', marginTop: 5 }}>
            <Text style={styles.investText}>Investment</Text>
          </View>
        </View>
        <FlatList
          data={leaderBoardList}
          renderItem={renderLeaderBoardMethod}
          keyExtractor={_keyExtractor}
          listKey={(item, index) => `${index}-item`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <EmptyComponent text={'No User Founds'} image={game} />
          )}
        />
      </View>
    </SafeScreen>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#3F2450',
  },
  backButton: {
    position: 'absolute',
    left: 20,
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
    color: '#FFF',
  },
  amountText: {
    fontSize: 27,
    fontFamily: FontFamily.poppinsSemiBold,
    color: '#FFF',
  },
  amountMessageText: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsMedium,
    color: '#FBFBFB',
  },
  container: {
    flex: 1,
    backgroundColor: '#EEEDED',
  },
  videoContainer: {
    height: 34,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  watchText: {
    fontSize: 12,
    fontFamily: FontFamily.poppinsMedium,
    color: '#DC9C40',
  },
  leaderBoardText: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsSemiBold,
    color: '#070A0D',
  },
  contestText: {
    fontSize: 11,
    fontFamily: FontFamily.poppinsMedium,
    color: '#675175',
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: '#E7E8E9',
    // margin: 10,
  },
  investText: {
    fontSize: 13,
    fontFamily: FontFamily.poppinsMedium,
    color: '#070A0D',
  },
  listContainer: {
    flexDirection: 'row',
    marginTop: 1,
    padding: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  listImageContainer: {
    justifyContent: 'center',
    height: 34,
    width: 34,
    borderRadius: 6,
    borderColor: '#ECE9EE',
    borderWidth: 1,
    alignItems: 'center',
    marginRight: 20,
  },
  contestNameText: {
    fontSize: 15,
    fontFamily: FontFamily.poppinsMedium,
    color: '#070A0D',
  },
  wonText: {
    fontSize: 13,
    fontFamily: FontFamily.poppinsMedium,
    color: '#070A0D',
  },
  wonAmountText: {
    fontSize: 13,
    fontFamily: FontFamily.poppinsSemiBold,
    color: '#21C24E',
  },
});
