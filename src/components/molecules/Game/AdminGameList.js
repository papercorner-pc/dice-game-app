import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../../theme/colors';
import group from '../../../theme/assets/images/group.png';
import ludo from '../../../theme/assets/images/ludoIcon.png';

import {FontFamily} from '../../../theme/fonts';
import {navigate} from '../../../navigators/utils';
import { dateFormate, timeFormate } from '../../../utils/UtilityHelper';

const AdminGameList = ({isAnnounced, game}) => {
  const navigateToResult = () => {
    navigate('LeaderBoard', {gameId: game.id});
  };
  const announceResult = () => {
    navigate('ContestantList', {gameId: game.id});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{game.match_name}</Text>
      <View style={styles.participateContainer}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 3,
          }}>
          <FastImage
            source={group}
            style={{
              height: 12,
              width: 10,
            }}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.participateText}>
          {game.users_in_game_count}/{game.entry_limit} Contestants
        </Text>
      </View>
      {/* <View style={styles.participateContainer}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 3,
          }}>
          <FastImage
            source={ludo}
            style={{
              height: 12,
              width: 10,
            }}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.participateText}>Match Status : Live</Text>
      </View> */}
      <View style={styles.lineStyle} />
      <View
        style={[
          styles.participateContainer,
          {
            justifyContent: 'space-between',
            marginTop: 10,
          },
        ]}>
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.dateText}>
            {dateFormate(game.start_date)} | {timeFormate(game.start_time)}
          </Text>
          {!isAnnounced && (
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 8,
                  width: 8,
                  borderRadius: 100,
                  backgroundColor: '#21C24E',
                  alignSelf: 'center',
                  marginRight: 5,
                }}
              />
              <Text style={styles.feeText}>Fee : ₹{game.min_fee}</Text>
            </View>
          )}
        </View>
        <Pressable
          style={styles.joinContainer}
          onPress={isAnnounced ? navigateToResult : announceResult}>
          <Text style={styles.joinText}>
            {isAnnounced ? 'View Result' : 'Announce Result'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AdminGameList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    // marginHorizontal: 10,
    marginBottom: 10,
    padding: 20,
  },
  participateContainer: {
    flexDirection: 'row',
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: '#E7E8E9',
    margin: 10,
  },
  joinContainer: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#DC9C40',
  },
  joinText: {
    fontSize: 13,
    fontFamily: FontFamily.poppinsMedium,
    color: '#070A0D',
  },
  nameText: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsMedium,
    color: '#333333',
  },
  participateText: {
    fontSize: 12,
    fontFamily: FontFamily.poppinsRegular,
    color: '#675175',
  },
  dateText: {
    fontSize: 12,
    fontFamily: FontFamily.poppinsSemiBold,
    color: '#40464D',
    fontWeight: '600',
  },
  contestText: {
    fontSize: 12,
    fontFamily: FontFamily.poppinsMedium,
    color: '#5E6168',
  },
  feeText: {
    fontSize: 13,
    fontFamily: FontFamily.poppinsMedium,
    color: '#1B1023',
  },
});
