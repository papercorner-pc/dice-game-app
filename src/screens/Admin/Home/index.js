import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeScreen } from '../../../components/template';
import { FontFamily } from '../../../theme/fonts';
import addIcon from '../../../theme/assets/images/addContestIcon.png';
import searchIcon from '../../../theme/assets/images/search.png';
import filterIcon from '../../../theme/assets/images/filter.png';
import FastImage from 'react-native-fast-image';
import MaterialTab from '../../../components/molecules/MaterialTab';
import { adminTab } from '../../../utils/constants';
import { useCallback, useEffect, useRef, useState } from 'react';
import GameTab from '../../../components/molecules/MaterialTab/GameTab';
import CompletedList from '../../../components/molecules/Game/CompletedList';
import AdminGameList from '../../../components/molecules/Game/AdminGameList';
import { navigate } from '../../../navigators/utils';
import { useMutation } from '@tanstack/react-query';
import { deleteGame, gameList } from '../../../services/game/game';
import { customToastMessage } from '../../../utils/UtilityHelper';
import game from '../../../theme/assets/images/game.png';
import closeIcon from '../../../theme/assets/images/close.png';
import robo from '../../../theme/assets/images/robo-1.png';
import group from '../../../theme/assets/images/group.png';
import EmptyComponent from '../../../components/molecules/EmptyComponet';
import { useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Colors } from '../../../theme/colors';
import ButtonComponent from '../../../components/molecules/Button';

const staticData = [{ value: adminTab.upComing }, { value: adminTab.history }];

const AdminHomeScreen = props => {
  const [option, setOption] = useState(staticData[0].value);
  const [gameListData, setGameListData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteId, setDeleteId] = useState(null)
  const [isModalEnable, setIsModalEnable] = useState(false)
  const onNAvigateToContest = () => {
    navigate('AddContest');
  };
  const onNAvigateToAgent = () => {
    navigate('AgentList');
  };
  const mutation = useMutation({
    mutationFn: payload => {
      return gameList(payload);
    },
    onSuccess: data => {
      console.log('---success gameList', data);
      setGameListData(data.games);
    },
    onError: error => {
      console.log('------ERROR gameList -----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: payload => {
      return deleteGame(payload);
    },
    onSuccess: data => {
      console.log('---success gameList', data);
      closeActionSheet();
      onRefresh()
      customToastMessage("Contest deleted", 'success');
    },
    onError: error => {
      console.log('------ERROR gameList -----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
    },
  });

  const onPressDelete = () => {
    const payload = {
      game_id: deleteId
    }
    deleteMutation.mutate(payload);
  }

  useFocusEffect(
    useCallback(() => {
      const payload = {
        type: option === 'History' ? 'completed' : 'upcoming',
      };
      mutation.mutate(payload);
      return () => { };
    }, [option, refreshing]), // Empty array means it will run every time the screen is focused
  );
  /* useEffect(() => {
    const interval = setInterval(() => {
      const payload = {
        type: option === 'History' ? 'completed' : 'upcoming',
      };
      mutation.mutate(payload);
    }, 1000);
    return () => clearInterval(interval);
  }, []); */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request or some data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const openActionSheet = (id) => {
    setDeleteId(id)
    setIsModalEnable(true)
  }
  const closeActionSheet = () => {
    setIsModalEnable(false)
    setDeleteId(null)
  };
  function renderActionSheet() {
    return (
      <Modal isVisible={isModalEnable} onBackdropPress={closeActionSheet}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <View style={{
            borderRadius: 10,
            padding: 20,
            width: '90%',
            backgroundColor: Colors.white,
          }}>
            <View style={{ alignItems: 'flex-end', marginBottom: 10 }}>
              <Pressable onPress={closeActionSheet}>
                <Image
                  style={{ height: 24, width: 24 }}
                  source={closeIcon}
                  resizeMode="contain"
                  tintColor={'#000'}
                />
              </Pressable>
            </View>
            <View style={{ alignItems: "center" }}>
              <FastImage
                source={robo}
                style={{
                  height: 145,
                  width: 125,
                }}
                resizeMode="cover"
              />
              <Text style={{
                fontSize: 16,
                fontFamily: FontFamily.poppinsRegular,
                color: Colors.black,
                marginRight: 5,
              }}>Delete Contest</Text>
              <Text style={{
                fontSize: 14,
                fontFamily: FontFamily.poppinsRegular,
                color: Colors.lightRegularGrey,
                marginRight: 5,
              }}>Are you sure delete this Contest</Text>
              <ButtonComponent
                buttonColor="#FFF"
                wrapperStyles={{
                  marginVertical: 15,
                  borderWidth: 1,
                  borderColor: "#ff392b"
                }}
                textStyles={{
                  color: '#ff392b',
                  fontSize: 16,
                  fontFamily: FontFamily.poppinsMedium,
                }}
                text={'DELETE'}
                onPress={onPressDelete}
              />
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <SafeScreen>
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={['#412653', '#2E1B3B']}
          style={{ flex: 1, padding: 15, justifyContent: "center" }}>
          <View style={styles.topContainer}>
            <View>
              <Text style={styles.gameNumber}>{gameListData.length}</Text>
              <Text style={styles.totalText}>Total Games</Text>
            </View>
            <View>
              <Pressable
                style={styles.contestContainer}
                onPress={onNAvigateToContest}>
                <FastImage
                  source={addIcon}
                  style={{
                    height: 16,
                    width: 14,
                    marginRight: 4,
                  }}
                  resizeMode="contain"
                />
                <Text style={styles.addText}>Add Contest</Text>
              </Pressable>
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
                <Text style={[styles.addText, { color: "#a0549c" }]}>Agents</Text>
              </Pressable>
            </View>
          </View>
          {/* <View style={styles.searchContainer}>
            <FastImage
              source={searchIcon}
              style={{
                height: 14,
                width: 14,
                marginHorizontal: 10,
              }}
              resizeMode="contain"
            />
            <TextInput placeholder={'Search Contest'} style={styles.input} />
          </View> */}
        </LinearGradient>
      </View>
      <View style={styles.container}>
        <GameTab
          data={staticData}
          onSelect={value => setOption(value)}
          selectedOption={option}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 20,
            paddingHorizontal: 5,
          }}>
          <View style={{ justifyContent: 'center' }}>
            {option === 'History' ? (
              <Text style={styles.historyTitle}>Result</Text>
            ) : (
              <Text style={styles.historyTitle}>
                Match List ({gameListData.length})
              </Text>
            )}
          </View>
          {/* <View style={{ justifyContent: 'center', marginTop: 5 }}>
            <FastImage
              source={filterIcon}
              style={{
                height: 18,
                width: 18,
                marginBottom: 10,
              }}
              resizeMode="contain"
            />
          </View> */}
        </View>
        <FlatList
          data={gameListData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <AdminGameList
              isAnnounced={option === 'History' ? true : false}
              game={item}
              onDeletePress={openActionSheet}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <EmptyComponent
              text={
                option === 'History'
                  ? 'No Completed Matches Right Now'
                  : 'No Live Matches Right Now'
              }
              image={game}
            />
          )}
        />
        {/* <AdminGameList isAnnounced={option === 'History' ? true : false} /> */}
      </View>
      {renderActionSheet()}
    </SafeScreen>
  );
};
export default AdminHomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 145,
  },
  gameNumber: {
    fontSize: 22,
    fontFamily: FontFamily.poppinsSemiBold,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  totalText: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsMedium,
    color: '#FFFFFF',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchContainer: {
    backgroundColor: '#FAF1FB',
    borderRadius: 8,
    height: 41,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
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
  },
  addText: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsMedium,
    color: '#DC9C40',
  },
  container: {
    flex: 1,
    backgroundColor: '#EEEDED',
    padding: 10,
  },
  input: {
    height: 40, // Adjust height as needed
    paddingVertical: 0, // Remove vertical padding
    paddingHorizontal: 10, // Adjust horizontal padding
    fontSize: 14, // Adjust font size as needed
    lineHeight: 18, // Adjust line height as needed
    width: '100%',
  },
  historyTitle: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsSemiBold,
    color: '#070A0D',
  },
});
