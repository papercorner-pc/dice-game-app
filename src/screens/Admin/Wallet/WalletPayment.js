import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import ButtonComponent from "../../../components/molecules/Button";
import MaterialTab from "../../../components/molecules/MaterialTab";
import CustomTextInput from "../../../components/molecules/TextInput";
import { SafeScreen } from "../../../components/template"
import { goBack } from "../../../navigators/utils";
import { getAgentsList } from "../../../services/users/users";
import { adminWalletRecharge } from "../../../services/wallet/wallet";
import backIcon from '../../../theme/assets/images/back.png';
import { Colors } from "../../../theme/colors";
import { FontFamily } from "../../../theme/fonts";
import { customToastMessage } from "../../../utils/UtilityHelper";


const AdminWalletPayment = () => {
    const [coin, setCoin] = useState("")
    const [errorCoin, setErrorCoin] = useState("")
    const [userId, setUserId] = useState("")
    const [isFocus, setIsFocus] = useState(false);
    const { data, isSuccess } = useQuery({
        queryKey: ["dealer"],
        queryFn: () => {
            return getAgentsList();
        },
        enabled: true,
    });
    const mutation = useMutation({
        mutationFn: payload => {
            return adminWalletRecharge(payload);
        },
        onSuccess: data => {
            setCoin("")
            setUserId("")
            customToastMessage(data.message, 'success');
        },
        onError: error => {
            console.log('------ERROR joinGame -----', error);
            customToastMessage(error.error ? error.error : error.message, 'error');
        },
    });
    const onPressRecharge = () => {
        var isValid = true;
        if (userId === undefined || userId === null || userId === "") {
            isValid = false;
            customToastMessage("Please Select User", 'error');
        }
        if (coin === "") {
            isValid = false;
            setErrorCoin("Enter valid Amount")
        }
        if (isValid) {
            const payload = {
                user_id: userId,
                amount: coin
            }
            mutation.mutate(payload)
        }
    }
    return (
        <SafeScreen>
            <View style={{ flexDirection: 'row', height: 80, backgroundColor: "#3B234C", alignItems: "center", paddingHorizontal: 16 }}>
                <TouchableOpacity
                    // style={styles.backButton}
                    onPress={() => {
                        goBack();
                    }}>
                    <Image
                        style={{ height: 24, width: 24, marginRight: 24 }}
                        source={backIcon}
                        resizeMode="contain"
                        tintColor={'#FBFBFB'}
                    />
                </TouchableOpacity>
                <View style={styles.mainHeadingContainer}>
                    <Text style={styles.headingText}>Payment</Text>
                </View>
            </View>
            <View style={styles.container}>
                <LinearGradient
                    colors={['#412653', '#2E1B3B']}
                    style={{ padding: 15, justifyContent: "center", borderRadius: 20, }}>
                    <View style={{ marginVertical: 40 }}>
                        {
                            isSuccess &&
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={data?.data?.agents}
                                search
                                maxHeight={300}
                                labelField="name"
                                valueField="id"
                                placeholder={!isFocus ? 'Select Agent' : ''}
                                searchPlaceholder="Search..."
                                value={userId}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setUserId(item.id);
                                    setIsFocus(false);
                                }}
                                renderLeftIcon={() => (
                                    <></>
                                )}
                            />
                        }
                        <CustomTextInput
                            placeholderName={"Add Coin"}
                            valueField={coin}
                            onChangeTextValue={(text) => {
                                setCoin(text)
                            }}
                            onChangeFocus={() => {
                                setErrorCoin("")
                            }}
                            keyboardType={'number-pad'}
                            errorField={errorCoin}
                        />
                        <ButtonComponent
                            wrapperStyles={styles.checkoutContainer}
                            textStyles={styles.buttonText}
                            text={'Recharge'}
                            onPress={onPressRecharge}
                            buttonColor={'#DC9C40'}
                        />
                    </View>
                </LinearGradient>
            </View>
        </SafeScreen>
    )
}

export default AdminWalletPayment;

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        left: 15,
        top: 25,
    },
    mainHeadingContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingText: {
        fontSize: 18,
        fontFamily: FontFamily.poppinsMedium,
        color: '#FFF',
    },
    container: {
        flex: 1,
        backgroundColor: "#EEEDED",
        padding: 16
    },
    checkoutContainer: {
        // marginHorizontal: 14,
        marginTop: 20,
        // width: '95%',
        borderRadius: 12,
        height: 40
    },
    buttonText: {
        fontSize: 16,
        fontFamily: FontFamily.poppinsMedium,
        color: '#070A0D',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "#FFF",
        marginBottom: 20
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: Colors.black
    },
    selectedTextStyle: {
        fontSize: 16,
        color: Colors.black
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: Colors.black
    },
})