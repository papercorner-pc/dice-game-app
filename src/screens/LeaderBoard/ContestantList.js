import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeScreen } from '../../components/template';
import { goBack, navigate } from '../../navigators/utils';
import backIcon from '../../theme/assets/images/back.png';
import closeIcon from '../../theme/assets/images/close.png';
import diceIcon from '../../theme/assets/images/diceBg.png';
import playIcon from '../../theme/assets/images/play.png';
import sortIcon from '../../theme/assets/images/sort.png';
import heartIcon from '../../theme/assets/images/heart.png';
import { FontFamily } from '../../theme/fonts';
import { paymentMethodListData } from '../../utils/constants';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import ButtonComponent from '../../components/molecules/Button';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { gameList, gamePublishStatus, getJoinedUserList } from '../../services/game/game';
import { customToastMessage } from '../../utils/UtilityHelper';
import game from '../../theme/assets/images/game.png';
import iconAce from '../../theme/assets/images/iconAce.png';
import iconClaver from '../../theme/assets/images/iconClaver.png';
import iconDiamond from '../../theme/assets/images/iconDiamond.png';
import iconFlag from '../../theme/assets/images/iconFlag.png';
import iconHeart from '../../theme/assets/images/iconHeart.png';
import iconMoon from '../../theme/assets/images/iconMoon.png';
import coinIcon from '../../theme/assets/images/star.png';
import EmptyComponent from '../../components/molecules/EmptyComponet';
import MaterialTab from '../../components/molecules/MaterialTab';

const staticData = [
  { value: "User" },
  { value: "Symbol" },
]
const ContestantList = props => {
  const { gameId, isAdmin } = props.route.params;
  const [option, setOption] = useState(staticData[0].value);
  const [isModalView, setModalView] = useState(false);
  const [contestantList, setContestantList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [symbolData, setSymbolData] = useState([])
  const mutation = useMutation({
    mutationFn: payload => {
      return getJoinedUserList(payload);
    },
    onSuccess: data => {
      console.log('---success getJoinedUserList', data);
      const userData = data.hasOwnProperty('users') ? data.users : [];
      setContestantList(userData);
      const total = userData.reduce(
        (acc, obj) => acc + parseInt(obj.user_investment),
        0,
      );
      setTotalAmount(total);
    },
    onError: error => {
      console.log('------ERROR getJoinedUserList -----', error);
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
  useEffect(() => {
    const payload = {
      game_id: gameId,
    };
    mutation.mutate(payload);
  }, [refreshing]);
  useEffect(() => {
    const result = Object.values(contestantList.reduce((acc, { user_card, user_investment }) => {
      if (!acc[user_card]) {
        acc[user_card] = { user_card, totalAmount: 0 };
      }
      console.log(typeof user_investment);
      acc[user_card].totalAmount += parseInt(user_investment);
      return acc;
    }, {}));
    const sortedData = result.sort((a, b) => b.totalAmount - a.totalAmount);
    setSymbolData(sortedData)
  }, [contestantList])
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request or some data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  const _keyExtractor = (item, index) => index.toString();
  const onPressAnnounce = () => {
    setModalView(!isModalView);
  };
  const navigateToAnnounce = () => {
    navigate('AnnounceResult', { gameId: gameId, fromDirect: false });
  };
  const setSelectedCardImage = (selectedCard) => {
    switch (selectedCard) {
      case 1:
        return iconHeart;
      case 2:
        return iconAce;
      case 3:
        return iconClaver;
      case 4:
        return iconDiamond;
      case 5:
        return iconMoon;
      case 6:
        return iconFlag;
      default:
        break;
    }
  };
  const renderPaymentMethod = ({ item }) => {
    return (
      <View style={styles.listContainer}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.listImageContainer}>
            <FastImage
              style={{ height: 28, width: 28 }}
              source={{ uri: item?.user_profile }}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text style={styles.contestNameText}>{item?.user_name}</Text>
            <FastImage
              style={{ height: 16, width: 16 }}
              source={setSelectedCardImage(item.user_card)}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={{ justifyContent: 'flex-start' }}>
          <Text style={styles.wonText}><FastImage
            source={coinIcon}
            style={{
              height: 12,
              width: 10,
            }}
            resizeMode="contain"
          /> {item?.user_investment}</Text>
        </View>
      </View>
    );
  };
  const renderSymbolList = ({ item }) => {
    console.log("ite", item);
    return (
      <View style={styles.listContainer}>
        <FastImage
          style={{ height: 24, width: 24 }}
          source={setSelectedCardImage(item.user_card)}
          resizeMode="contain"
        />
        <View style={{ justifyContent: 'flex-start' }}>
          <Text style={styles.wonText}><FastImage
            source={coinIcon}
            style={{
              height: 12,
              width: 10,
            }}
            resizeMode="contain"
          /> {item.totalAmount}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeScreen>
      <View style={styles.headerContainer}>
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
            <Text style={styles.headingText}>Match Details</Text>
          </View>
        </View>
        {
          isAdmin &&
          <View style={{ alignItems: 'center', paddingBottom: 30 }}>
            <Text style={styles.amountText}><FastImage
              source={coinIcon}
              style={{
                height: 12,
                width: 10,
              }}
              resizeMode="contain"
            /> {totalAmount.toFixed(2)}</Text>
            <Text style={styles.amountMessageText}>Amount Received</Text>
            <Pressable style={styles.joinContainer} onPress={onPressAnnounce}>
              <Text style={styles.joinText}>{'Announce Result'}</Text>
            </Pressable>
          </View>
        }
      </View>
      <View style={styles.container}>
        {/* <View style={styles.videoContainer}>
          <Pressable style={{flexDirection: 'row'}}>
            <FastImage
              style={{height: 18, width: 18, marginRight: 10}}
              source={playIcon}
              resizeMode="contain"
            />
            <Text style={styles.watchText}>Watch Result</Text>
          </Pressable>
        </View> */}
        <MaterialTab
          data={staticData}
          onSelect={value => setOption(value)}
          selectedOption={option}
        />
        {
          option === "User" ?
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 2,
                  padding: 20,
                  backgroundColor: '#FFF',
                }}>
                <View style={{ justifyContent: 'center' }}>
                  {/* <Text style={styles.leaderBoardText}>Lead board</Text> */}
                  <Text style={styles.contestText}>
                    {contestantList.length} Contestants
                  </Text>
                </View>
                {/* <View style={{ justifyContent: 'center', marginTop: 5 }}>
            <FastImage
              source={sortIcon}
              style={{
                height: 24,
                width: 24,
                marginBottom: 10,
              }}
              resizeMode="contain"
            />
          </View> */}
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
                data={contestantList}
                renderItem={renderPaymentMethod}
                keyExtractor={_keyExtractor}
                // scrollEnabled={false}
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
            </> :
            <FlatList
              data={symbolData}
              renderItem={renderSymbolList}
              keyExtractor={_keyExtractor}
              // scrollEnabled={false}
              listKey={(item, index) => `${index}-item`}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListEmptyComponent={() => (
                <EmptyComponent text={'No Data Founds'} image={game} />
              )}
            />
        }
      </View>
      <Modal isVisible={isModalView} onBackdropPress={onPressAnnounce}>
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
              <Pressable onPress={onPressAnnounce}>
                <Image
                  style={{ height: 24, width: 24 }}
                  source={closeIcon}
                  resizeMode="contain"
                  tintColor={'#FBFBFB'}
                />
              </Pressable>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 18,
                  fontFamily: FontFamily.poppinsMedium,
                  marginBottom: 10,
                }}>
                Please Choose One
              </Text>
              <ButtonComponent
                buttonColor="#DC9C40"
                wrapperStyles={{
                  marginTop: 20,
                  marginVertical: 20,
                  height: 46,
                }}
                textStyles={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontFamily: FontFamily.poppinsMedium,
                }}
                text={'Live'}
                onPress={navigateToAnnounce}
              />
              <ButtonComponent
                buttonColor="#FFF"
                wrapperStyles={{
                  marginVertical: 15,
                  height: 46,
                }}
                textStyles={{
                  color: '#DC9C40',
                  fontSize: 16,
                  fontFamily: FontFamily.poppinsMedium,
                }}
                text={'Animation'}
                onPress={navigateToAnnounce}
              />
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </SafeScreen>
  );
};

export default ContestantList;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#3F2450',
    // height: '30%',
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
  joinContainer: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#DC9C40',
    marginTop: 20,
  },
  joinText: {
    fontSize: 13,
    fontFamily: FontFamily.poppinsMedium,
    color: '#070A0D',
  },
  balanceGradientContainer: {
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
});
