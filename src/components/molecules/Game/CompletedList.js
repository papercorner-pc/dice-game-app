import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors } from '../../../theme/colors';
import group from '../../../theme/assets/images/group.png';
import join from '../../../theme/assets/images/join-now.png';
import clock from '../../../theme/assets/images/clock-icon.png';
import { FontFamily } from '../../../theme/fonts';
import { navigate } from '../../../navigators/utils';
import { dateFormate, timeFormate } from '../../../utils/UtilityHelper';

function CompletedList({ item, isAgent = false }) {
  const navigateToResult = () => {
    navigate('GameJoinedList', { gameId: item.id });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{item.match_name}</Text>
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
        <Text style={styles.participateText}>{item.users_in_game_count} Contestants</Text>
      </View>
      <View
        style={[
          styles.participateContainer,
          {
            justifyContent: 'flex-end',
            marginTop: 10,
          },
        ]}>
        {/* <View style={{ justifyContent: 'center' }}>
          <Text style={styles.dateText}>Completed On {dateFormate(item.start_date)} {timeFormate(item.start_time)}</Text>
        </View> */}
        <Pressable
          style={[styles.participateContainer, styles.joinContainer]}
          onPress={navigateToResult}>
          <Text style={styles.joinText}>Result</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 3,
            }}>
            <Image
              source={join}
              style={{
                height: 10,
                width: 10,
              }}
              tintColor={'#FFF'}
              resizeMode="contain"
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default CompletedList;

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
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    backgroundColor: '#DC9C40',
  },
  joinText: {
    fontSize: 13,
    fontFamily: FontFamily.poppinsMedium,
    color: '#FBFBFB',
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
    fontFamily: FontFamily.poppinsRegular,
    color: '#40464D',
  },
  contestText: {
    fontSize: 12,
    fontFamily: FontFamily.poppinsMedium,
    color: '#5E6168',
  },
});
