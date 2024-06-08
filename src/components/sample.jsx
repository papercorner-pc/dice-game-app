import {
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
  } from 'react-native';
  
  import DiceOne from './assets/images/One.png';
  import DiceTwo from './assets/images/Two.png';
  import DiceThree from './assets/images/Three.png';
  import DiceFour from './assets/images/Four.png';
  import DiceFive from './assets/images/Five.png';
  import DiceSix from './assets/images/Six.png';
  import {useEffect, useState} from 'react';
  import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
  
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };
  
  const Dice = ({imageUrl}) => {
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
    const [scaleAnim] = useState(new Animated.Value(0)); // Initial value for scale: 0
    const [rotateAnim] = useState(new Animated.Value(0)); // Initial value for rotate: 0
  
    useEffect(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ),
      ]).start();
    }, []);
  
    const rotateInterpolate = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['360deg', '180deg'],
    });
  
    const animatedStyle = {
      opacity: fadeAnim,
      transform: [
        {
          scale: scaleAnim,
        },
        {
          rotate: rotateInterpolate,
        },
      ],
    };
    return (
      <Animated.View // Special animatable View
        style={{
          // ...animatedStyle,
        }}>
        <View>
          <Image style={styles.diceImage} source={imageUrl} />
        </View>
      </Animated.View>
    );
  };
  
  function App() {
    const [diceImageOne, setDiceImageOne] = useState(DiceOne);
    const [diceImageTwo, setDiceImageTwo] = useState(DiceOne);
    const [diceImageThree, setDiceImageThree] = useState(DiceOne);
  
    const rollDiceOnTap = () => {
      let randomNumber1 = Math.floor(Math.random() * 6) + 1;
      let randomNumber2 = Math.floor(Math.random() * 6) + 1;
      let randomNumber3 = Math.floor(Math.random() * 6) + 1;
  
      switch (randomNumber1) {
        case 1:
          setDiceImageOne(DiceOne);
          break;
        case 2:
          setDiceImageOne(DiceTwo);
          break;
        case 3:
          setDiceImageOne(DiceThree);
          break;
        case 4:
          setDiceImageOne(DiceFour);
          break;
        case 5:
          setDiceImageOne(DiceFive);
          break;
        case 6:
          setDiceImageOne(DiceSix);
          break;
  
        default:
          setDiceImageOne(DiceOne);
          break;
      }
      switch (randomNumber2) {
        case 1:
          setDiceImageTwo(DiceOne);
          break;
        case 2:
          setDiceImageTwo(DiceTwo);
          break;
        case 3:
          setDiceImageTwo(DiceThree);
          break;
        case 4:
          setDiceImageTwo(DiceFour);
          break;
        case 5:
          setDiceImageTwo(DiceFive);
          break;
        case 6:
          setDiceImageTwo(DiceSix);
          break;
  
        default:
          setDiceImageTwo(DiceOne);
          break;
      }
      switch (randomNumber3) {
        case 1:
          setDiceImageThree(DiceOne);
          break;
        case 2:
          setDiceImageThree(DiceTwo);
          break;
        case 3:
          setDiceImageThree(DiceThree);
          break;
        case 4:
          setDiceImageThree(DiceFour);
          break;
        case 5:
          setDiceImageThree(DiceFive);
          break;
        case 6:
          setDiceImageThree(DiceSix);
          break;
  
        default:
          setDiceImageThree(DiceOne);
          break;
      }
  
      ReactNativeHapticFeedback.trigger('impactLight', options);
    };
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Dice imageUrl={diceImageOne} />
          <Dice imageUrl={diceImageTwo} />
          <Dice imageUrl={diceImageThree} />
          <Pressable onPress={rollDiceOnTap}>
            <Text style={styles.rollDiceBtnText}>Roll</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
  
  export default App;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFF2F2',
    },
    diceContainer: {
      margin: 12,
    },
    diceImage: {
      width: 200,
      height: 200,
    },
    rollDiceBtnText: {
      paddingVertical: 10,
      paddingHorizontal: 40,
      borderWidth: 2,
      borderRadius: 8,
      borderColor: '#E5E0FF',
      fontSize: 16,
      color: '#8EA7E9',
      fontWeight: '700',
      textTransform: 'uppercase',
    },
  });
  