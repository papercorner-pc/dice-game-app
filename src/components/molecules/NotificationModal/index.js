import Modal from 'react-native-modal';
import { Image, Pressable, Text, View } from "react-native";
import closeIcon from '../../../theme/assets/images/close.png';
import robo from '../../../theme/assets/images/robo-1.png';
import { Colors } from "../../../theme/colors";
import FastImage from "react-native-fast-image";
import { FontFamily } from "../../../theme/fonts";
import ButtonComponent from "../Button";
import useModalStore from "../../../store/store"
import { navigate } from '../../../navigators/utils';

const NotificationModal = (props) => {
    const { isNotificationModalEnable, notificationModalData, updateModalData } = useModalStore((state) => ({
        isNotificationModalEnable: state.isNotificationModalEnable,
        notificationModalData: state.notificationModalData,
        updateModalData: state.updateModalData,
    }));
    const toggleModal = () => {
        updateModalData(false, null)
    }
    const onPressViewResult = () => {
        toggleModal()
        navigate('GameJoinedList', { gameId: notificationModalData.gameId });
    }
    console.log("notification modal data---------", notificationModalData);
    return (
        <Modal isVisible={isNotificationModalEnable} onBackdropPress={toggleModal}>
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
                        <Pressable onPress={toggleModal}>
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
                        }}>{!!notificationModalData ? notificationModalData.title : ""}</Text>
                        <Text style={{
                            fontSize: 14,
                            fontFamily: FontFamily.poppinsRegular,
                            color: Colors.lightRegularGrey,
                            marginRight: 5,
                        }}>{!!notificationModalData ? notificationModalData.body : ""}</Text>
                        <ButtonComponent
                            buttonColor="#FFF"
                            wrapperStyles={{
                                marginVertical: 15,
                                height: 46,
                                borderWidth: 1,
                                borderColor: "#DC9C40"
                            }}
                            textStyles={{
                                color: '#DC9C40',
                                fontSize: 16,
                                fontFamily: FontFamily.poppinsMedium,
                            }}
                            text={'View Result'}
                            onPress={onPressViewResult}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default NotificationModal