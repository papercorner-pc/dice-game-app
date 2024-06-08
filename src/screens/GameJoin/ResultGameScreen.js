import {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {SafeScreen} from '../../components/template';
import bg from '../../theme/assets/images/gameBg.png';
import cardAce from '../../theme/assets/images/cardAce.png';
import cardHeart from '../../theme/assets/images/cardHeart.png';
import cardClaver from '../../theme/assets/images/cardClaver.png';
import cardDiamond from '../../theme/assets/images/cardDiamond.png';
import cardFlag from '../../theme/assets/images/cardFlag.png';
import cardMoon from '../../theme/assets/images/cardMoon.png';
import nextArrow from '../../theme/assets/images/nextArrow.png';
import backIcon from '../../theme/assets/images/back.png';
import coinIcon from '../../theme/assets/images/coins.png';
import FastImage from 'react-native-fast-image';
import {FontFamily} from '../../theme/fonts';
import {goBack, navigate, navigateAndSimpleReset} from '../../navigators/utils';
import {customToastMessage} from '../../utils/UtilityHelper';
import {useFocusEffect} from '@react-navigation/native';
import GamePaymentModal from './GamePaymentScreen';

const ResultGameScreen = props => {
  const {selectedCard} = props.route.params;
  useFocusEffect(
    useCallback(() => {
      Orientation.lockToLandscape();

      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []), // Empty array means it will run every time the screen is focused
  );

  return (
    <SafeScreen>
      <View style={styles.container}>
        <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
          <View style={{flexDirection: 'row', flex: 1, padding: 10}}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                  navigateAndSimpleReset("HomeRoot")
                }}>
                <Image
                  style={{height: 24, width: 24, marginRight: 24}}
                  source={backIcon}
                  resizeMode="contain"
                  tintColor={'#FFF'}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 10}}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <View
                  style={[
                    styles.cardContainer,
                    selectedCard === 1 && styles.selectedCard,
                  ]}>
                  <ImageBackground
                    source={cardHeart}
                    resizeMode="cover"
                    style={styles.image}>
                    {selectedCard === 1 && (
                      <View style={styles.backgroundContainer}>
                        <FastImage
                          source={coinIcon}
                          style={{
                            height: 46,
                            width: 46,
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    )}
                  </ImageBackground>
                </View>
                <View
                  style={[
                    styles.cardContainer,
                    selectedCard === 2 && styles.selectedCard,
                  ]}>
                  <ImageBackground
                    source={cardAce}
                    resizeMode="cover"
                    style={styles.image}>
                    {selectedCard === 2 && (
                      <View style={styles.backgroundContainer}>
                        <FastImage
                          source={coinIcon}
                          style={{
                            height: 46,
                            width: 46,
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    )}
                  </ImageBackground>
                </View>
                <View
                  style={[
                    styles.cardContainer,
                    selectedCard === 3 && styles.selectedCard,
                  ]}>
                  <ImageBackground
                    source={cardClaver}
                    resizeMode="cover"
                    style={styles.image}>
                    {selectedCard === 3 && (
                      <View style={styles.backgroundContainer}>
                        <FastImage
                          source={coinIcon}
                          style={{
                            height: 46,
                            width: 46,
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    )}
                  </ImageBackground>
                </View>
                <View
                  style={[
                    styles.cardContainer,
                    selectedCard === 4 && styles.selectedCard,
                  ]}>
                  <ImageBackground
                    source={cardDiamond}
                    resizeMode="cover"
                    style={styles.image}>
                    {selectedCard === 4 && (
                      <View style={styles.backgroundContainer}>
                        <FastImage
                          source={coinIcon}
                          style={{
                            height: 46,
                            width: 46,
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    )}
                  </ImageBackground>
                </View>
              </View>
              <View style={{flexDirection: 'row', flex: 1}}>
                <View
                  style={[
                    styles.cardContainer,
                    selectedCard === 5 && styles.selectedCard,
                  ]}>
                  <ImageBackground
                    source={cardMoon}
                    resizeMode="cover"
                    style={styles.image}>
                    {selectedCard === 5 && (
                      <View style={styles.backgroundContainer}>
                        <FastImage
                          source={coinIcon}
                          style={{
                            height: 46,
                            width: 46,
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    )}
                  </ImageBackground>
                </View>
                <View style={{flex: 2, backgroundColor: '#A49C9C'}} />
                <View
                  style={[
                    styles.cardContainer,
                    selectedCard === 6 && styles.selectedCard,
                  ]}>
                  <ImageBackground
                    source={cardFlag}
                    resizeMode="cover"
                    style={styles.image}>
                    {selectedCard === 6 && (
                      <View style={styles.backgroundContainer}>
                        <FastImage
                          source={coinIcon}
                          style={{
                            height: 46,
                            width: 46,
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    )}
                  </ImageBackground>
                </View>
              </View>
            </View>
            <View style={styles.nextButtonContainer}>
              {/* <Pressable
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={navigateToNext}>
                <Text style={styles.nextText}>Next</Text>
                <FastImage
                  source={nextArrow}
                  resizeMode="contain"
                  style={{height: 16, width: 16}}
                />
              </Pressable> */}
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeScreen>
  );
};
export default ResultGameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    // justifyContent: 'center',
  },
  cardContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: '#11B03E',
  },
  nextButtonContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  nextText: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsMedium,
    color: '#FFF',
  },
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
