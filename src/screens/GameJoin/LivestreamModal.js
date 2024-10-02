import React, { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import closeIcon from '../../theme/assets/images/close.png';
import { FontFamily } from '../../theme/fonts';
import Modal from 'react-native-modal';
import { Colors } from '../../theme/colors';
import ViewLiveStream from '../../components/molecules/LiveStreaming';

function LivestreamModal({ visible, onClose }) {

    return (
        <Modal isVisible={visible} onBackdropPress={onClose}>
            {/* <View style={styles.closeIconContainer}>
                <TouchableOpacity onPress={onClose}>
                    <Image
                        style={styles.closeIcon}
                        resizeMode="contain"
                        source={closeIcon}
                        tintColor={"#FFF"}
                    />
                </TouchableOpacity>
            </View> */}
            <View style={{ flex: 1 }}>
                <ViewLiveStream isHost={false} />
            </View>
        </Modal>
    );
}

export default LivestreamModal;

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
        backgroundColor: Colors.transparent,
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
