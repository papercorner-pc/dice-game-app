import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import OTPTextView from 'react-native-otp-textinput';
import ButtonComponent from '../../components/molecules/Button';
import { SafeScreen } from '../../components/template';
import { goBack, navigate } from '../../navigators/utils';
import backIcon from '../../theme/assets/images/back.png';
import closeIcon from '../../theme/assets/images/close.png';
import { FontFamily } from '../../theme/fonts';
import { gamePaymentList } from '../../utils/constants';
import Modal from 'react-native-modal';
import iconAce from '../../theme/assets/images/iconAce.png';
import iconClaver from '../../theme/assets/images/iconClaver.png';
import iconDiamond from '../../theme/assets/images/iconDiamond.png';
import iconFlag from '../../theme/assets/images/iconFlag.png';
import iconHeart from '../../theme/assets/images/iconHeart.png';
import iconMoon from '../../theme/assets/images/iconMoon.png';
import coinIcon from '../../theme/assets/images/star.png';
import { useMutation, useQuery } from '@tanstack/react-query';
import { joinGame, walletHistory } from '../../services/game/game';
import { customToastMessage } from '../../utils/UtilityHelper';
import { Colors } from '../../theme/colors';

function GamePaymentModal({ visible, onClose, selectedCard, game }) {
  const [paymentListData, setPaymentListData] = useState(gamePaymentList);
  const [image, setImage] = useState('');
  const [count, setCount] = useState("1");
  const [amount, setAmount] = useState(game.min_fee);
  // const [walletTotal, setWalletTotal] = useState(0)
  const { isSuccess, data } = useQuery({
    queryKey: ["wallethistory"],
    queryFn: () => {
      return walletHistory();
    },
  });
  // useEffect(() => {
  //   if (isSuccess) {
  //     /* const total = data.transactions.reduce(
  //       (acc, obj) => acc + parseInt(obj.amount),
  //       0,
  //     ); */
  //     setWalletTotal(parseFloat(data?.balance))
  //   } else {
  //     setWalletTotal(0)
  //   }
  // }, [isSuccess])
  const mutation = useMutation({
    mutationFn: payload => {
      return joinGame(payload);
    },
    onSuccess: data => {
      console.log('---success joinGame', data);
      onClose(true);
      // navigate('PaymentScreen', { selectedCard: selectedCard, gameId: game.id });
    },
    onError: error => {
      console.log('------ERROR joinGame -----', error);
      Alert.alert(error.error ? error.error : error.message);
    },
  });
  const _keyExtractor = (item, index) => index.toString();

  const onPressPaymentMethod = item => {
    console.log('item  payment', item);
    const paymentList = [...paymentListData];
    const updatePaymentList = paymentList.map?.(itemValue => {
      const selectedItem = { ...itemValue };
      selectedItem.isSelected = false;
      if (selectedItem.id == item.id) {
        selectedItem.isSelected = true;
      }
      return selectedItem;
    });
    setPaymentListData(updatePaymentList);
  };
  useEffect(() => {
    setSelectedCardImage();
  }, [selectedCard]);
  const setSelectedCardImage = () => {
    switch (selectedCard) {
      case 1:
        setImage(iconHeart);
        break;
      case 2:
        setImage(iconAce);
        break;
      case 3:
        setImage(iconClaver);
        break;
      case 4:
        setImage(iconDiamond);
        break;
      case 5:
        setImage(iconMoon);
        break;
      case 6:
        setImage(iconFlag);
        break;
      default:
        break;
    }
  };
  const onJoinGame = () => {
    // const totalAmount = parseInt(game.min_fee) * parseInt(count);
    if (amount >= parseInt(game.min_fee)) {
      const payload = {
        game_id: game.id,
        joined_amount: amount,
        user_card: selectedCard,
      };
      mutation.mutate(payload);
    } else {
      Alert.alert('At least Minimum amount for Join');
    }
  };
  const renderPaymentMethod = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Pressable
            style={styles.radioButton}
            onPress={() => {
              onPressPaymentMethod(item);
            }}>
            {item.isSelected && <View style={styles.radioButtonSelected} />}
          </Pressable>
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontFamily: FontFamily.poppinsMedium,
              color: '#333333',
            }}>
            {item.title}
          </Text>
          {item.id === 1 && (
            <>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: FontFamily.poppinsMedium,
                  color: '#675175',
                }}>
                Available Balance :{' '}
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: FontFamily.poppinsSemiBold,
                    color: '#412653',
                  }}>
                  <FastImage
                    source={coinIcon}
                    style={{
                      height: 12,
                      width: 10,
                    }}
                    resizeMode="contain"
                  /> {parseFloat(data?.balance).toFixed(2)}
                </Text>
              </Text>
              {/* <TouchableOpacity
                onPress={() => {
                  navigate('WalletPayment');
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: FontFamily.poppinsSemiBold,
                    color: '#9D569F',
                  }}>
                  Recharge Now
                </Text>
              </TouchableOpacity> */}
            </>
          )}
        </View>
      </View>
    );
  };
  return (
    // <View
    //   style={{
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     // flex: 1
    //   }}>
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.balanceContainer}>
            <LinearGradient
              colors={['#412653', '#2E1B3B']}
              style={styles.balanceGradientContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={styles.balanceTitleText}>Minimum Fee</Text>
                  <Text style={styles.balanceAmount}><FastImage
                    source={coinIcon}
                    style={{
                      height: 12,
                      width: 10,
                    }}
                    resizeMode="contain"
                  /> {game.min_fee}</Text>
                </View>
                <View style={styles.cardImageContainer}>
                  <FastImage
                    source={image}
                    style={{
                      height: 32,
                      width: 32,
                    }}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <Text style={styles.enterText}>
                Enter amount you want to invest
              </Text>
              <View style={styles.enterContainer}>
                {/* <Text style={{
                  fontSize: 20,
                  fontFamily: FontFamily.poppinsRegular,
                  color: '#000',
                }}>{game.min_fee} X </Text> */}
                <TextInput
                  placeholder="Enter Amount"
                  value={amount}
                  onChangeText={setAmount}
                  style={styles.input}
                  keyboardType="numeric"
                />
                {/* <OTPTextView
                    containerStyle={styles.textInputContainer}
                    textInputStyle={styles.otpInputContainer}
                    tintColor={'#333333'}
                    handleTextChange={() => {}}
                    inputCount={6}
                    keyboardType="numeric"
                  /> */}
              </View>
              {/* <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-evenly" }}>
                <Pressable style={styles.multipleContainer} onPress={() => {
                  setCount("2")
                }}>
                  <Text style={styles.buttonText}>2x</Text>
                </Pressable>
                <Pressable style={styles.multipleContainer} onPress={() => {
                  setCount("5")
                }}>
                  <Text style={styles.buttonText}>5x</Text>
                </Pressable>
                <Pressable style={styles.multipleContainer} onPress={() => {
                  setCount("10")
                }}>
                  <Text style={styles.buttonText}>10x</Text>
                </Pressable>
                <Pressable style={styles.multipleContainer} onPress={() => {
                  setCount("15")
                }}>
                  <Text style={styles.buttonText}>15x</Text>
                </Pressable>
                <Pressable style={styles.multipleContainer} onPress={() => {
                  setCount("20")
                }}>
                  <Text style={styles.buttonText}>20x</Text>
                </Pressable>
              </View> */}
            </LinearGradient>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.closeIconContainer}>
              <TouchableOpacity onPress={onClose}>
                <FastImage
                  style={styles.closeIcon}
                  resizeMode="contain"
                  source={closeIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.paymentOptionContainer}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: FontFamily.poppinsMedium,
                  color: '#5F646A',
                  marginBottom: 10,
                }}>
                Debit From
              </Text>
              <FlatList
                data={paymentListData}
                renderItem={renderPaymentMethod}
                keyExtractor={_keyExtractor}
                // scrollEnabled={false}
                listKey={(item, index) => `${index}-item`}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />
            </View>
            <Pressable style={styles.button} onPress={onJoinGame}>
              <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={{}}></View>
    </Modal>
    // </View>
  );
}

export default GamePaymentModal;

const styles = StyleSheet.create({
  headerContainer: {
    height: '15%',
    backgroundColor: '#3B234C',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsMedium,
    color: '#FBFBFB',
  },
  balanceContainer: {
    // height: 184,
    // marginBottom: 20,
    flex: 1,
    margin: 10,
  },
  balanceGradientContainer: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
  },
  balanceTitleText: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsMedium,
    color: '#FFF',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 20,
    fontFamily: FontFamily.poppinsSemiBold,
    color: '#FFF',
    marginBottom: 15,
  },
  enterText: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsRegular,
    color: '#FFF',
    marginBottom: 5,
  },
  enterContainer: {
    // height: 65,
    borderRadius: 8,
    backgroundColor: '#F8EAF9',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row"
  },
  textInputContainer: {
    marginBottom: 30,
  },
  otpInputContainer: {
    width: 22,
  },
  paymentOptionContainer: {
    borderRadius: 20,
    backgroundColor: '#FFF',
    padding: 20,
    flex: 1,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#21C24E',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    height: 15,
    width: 15,
    backgroundColor: '#21C24E',
    borderRadius: 100,
  },
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: '#EEEDED',
    flexDirection: 'row',
  },
  modalContainer: {
    borderRadius: 10,
    backgroundColor: '#EEEDED',
    flex: 1,
    padding: 10,
  },
  closeIconContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 10
    // paddingHorizontal: 15,
  },
  closeIcon: {
    width: 26,
    height: 26,
  },
  cardImageContainer: {
    backgroundColor: '#F8EAF9',
    height: 48,
    width: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    backgroundColor: '#DC9C40',
    width: 120,
    alignSelf: 'flex-end',
    height: 30,
    borderRadius: 10,
    marginTop: 10
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsMedium,
    color: '#070A0D',
  },
  multipleContainer: {
    height: 20,
    width: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  input: {
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    color: Colors.black,
    fontSize: 28,
    fontFamily: FontFamily.poppinsBold,
    textAlign: "center"
  }
});
