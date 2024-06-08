import {Text, View, Animated} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {MMKV} from 'react-native-mmkv';
import {navigateAndSimpleReset} from '../../navigators/utils';
import LinearGradient from 'react-native-linear-gradient';
import {FontFamily} from '../../theme/fonts';

function SplashScreen() {
  const moveAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const timer = setTimeout(() => {
      navigateAndSimpleReset("Main");
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Define the animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [moveAnim]);

  // Interpolate the animated value
  const moveInterpolate = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300], // Adjust these values to move the text as needed
  });

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#412653', '#2E1B3B']}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.Text
          style={[
            {
              fontSize: 33,
              fontFamily: FontFamily.poppinsMedium,
              color: '#FFF',
            },
            { transform: [{ translateX: moveInterpolate }]},
          ]}>
          dice
          <Animated.Text
            style={[
              {
                fontSize: 33,
                fontFamily: FontFamily.poppinsMedium,
                color: '#DC9C40',
              },
              { transform: [{ translateX: moveInterpolate }]},
            ]}>
            dash
          </Animated.Text>
        </Animated.Text>
        {/* <Text
          style={{
            fontSize: 33,
            fontFamily: FontFamily.poppinsMedium,
            color: '#FFF',
          }}>
          dice<Text style={{color: '#DC9C40'}}>dash</Text>
        </Text> */}
      </LinearGradient>
    </View>
  );
}

export default SplashScreen;
