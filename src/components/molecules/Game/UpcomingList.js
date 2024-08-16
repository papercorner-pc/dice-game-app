import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors } from '../../../theme/colors';
import group from '../../../theme/assets/images/group.png';
import join from '../../../theme/assets/images/join-now.png';
import clock from '../../../theme/assets/images/clock-icon.png';
import { FontFamily } from '../../../theme/fonts';
import { navigate } from '../../../navigators/utils';
import { dateFormate, timeFormate } from '../../../utils/UtilityHelper';

function UpcomingList({ item, isAgent = false }) {
  const targetDate = new Date(`${item.start_date}T${item.start_time}`);
  const [hours, setHourse] = useState("00");
  const [minute, setMinute] = useState("00")

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date();
      const difference = targetDate - now;
      if (difference <= 0) {
        // Alert.alert('Time is up!');
        clearInterval(intervalId);
      } else {
        const remHours = Math.floor(difference / (1000 * 60 * 60));
        const remMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const remSeconds = Math.floor((difference % (1000 * 60)) / 1000);
        setHourse(remHours)
        setMinute(remMinutes)
        // setTimeRemaining(difference);
      }
    };

    updateRemainingTime(); // Initial call to set the correct remaining time
    const intervalId = setInterval(updateRemainingTime, 60000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [targetDate]);
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
        <Text style={styles.participateText}>
          {item.users_in_game_count} Contestants
        </Text>
      </View>
      <View
        style={[
          styles.participateContainer,
          { justifyContent: 'space-between', marginTop: 10 },
        ]}>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.dateText}>
            {dateFormate(item.start_date)} {timeFormate(item.start_time)} | Minimum Fee :{' '}
            <Text style={{ fontFamily: FontFamily.poppinsSemiBold }}>
              ₹{item.min_fee}
            </Text>
          </Text>
        </View>
        {
          !isAgent &&
          <Pressable
            style={[styles.participateContainer, styles.joinContainer]}
            onPress={() => {
              navigate('GameJoin', { game: item });
            }}>
            <Text style={styles.joinText}>Join Now</Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 3,
              }}>
              <FastImage
                source={join}
                style={{
                  height: 10,
                  width: 10,
                }}
                resizeMode="contain"
              />
            </View>
          </Pressable>
        }
      </View>
      <View style={styles.lineStyle} />
      <View style={[styles.participateContainer, { justifyContent: 'center', alignItems: "center" }]}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 5,
          }}>
          <FastImage
            source={clock}
            style={{
              height: 14,
              width: 14,
            }}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.contestText}>
          Contest Start in - {hours} Hours : {minute} Min
        </Text>
      </View>
    </View>
  );
}

export default UpcomingList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 20,
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
    borderWidth: 1,
    borderColor: '#21C24E',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  joinText: {
    fontSize: 12,
    fontFamily: FontFamily.poppinsMedium,
    color: '#21C24E',
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
