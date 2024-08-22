import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import FastImage from "react-native-fast-image";
import { SafeScreen } from "../../../components/template";
import { FontFamily } from "../../../theme/fonts";
import edit from '../../../theme/assets/images/editImage.png';
import eye from '../../../theme/assets/images/eyeView.png';
import Modal from "react-native-modal";
import { useCallback, useState } from "react";
import { navigate } from "../../../navigators/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAgentsList } from "../../../services/users/users";
import LoaderOverlay from "../../../components/molecules/LoaderOverlay";
import { useFocusEffect } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import CustomTextInput from "../../../components/molecules/TextInput";
import ButtonComponent from "../../../components/molecules/Button";
import { customToastMessage } from "../../../utils/UtilityHelper";
import { userChangePassword } from "../../../services/auth/auth";


const DealerList = () => {
    const [showModal, setShowModal] = useState(false)
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [errorNewPassword, setErrorNewPassword] = useState("")
    const _keyExtractor = (item, index) => index.toString();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["dealer"],
        queryFn: () => {
            return getAgentsList();
        },
        enabled: true,
    });
    const mutation = useMutation({
        mutationFn: payload => {
            return userChangePassword(payload);
        },
        onSuccess: data => {
            onCancelModal()
            customToastMessage(data.message, 'success');
        },
        onError: error => {
            console.log('------ERROR joinGame -----', error);
            customToastMessage(error.error ? error.error : error.message, 'error');
        },
    });
    useFocusEffect(
        useCallback(() => {
            refetch()
            return () => {
            };
        }, []), // Empty array means it will run every time the screen is focused
    );
    const onCancelModal = () => {
        setUserId("")
        setUserName("")
        setShowModal(!showModal)
    }
    const onPressSave = () => {
        var isValid = true;
        if (password === "") {
            isValid = false;
            setErrorPassword("Plaese enter valid passwod");
        }
        if (newPassword === "") {
            isValid = false;
            setErrorNewPassword("Plaese enter valid passwod");
        }
        if (password !== newPassword) {
            isValid = false;
            setErrorNewPassword("Password and Confirm password Mustbe same");
        }
        if (isValid) {
            const payload = {
                user_id: userId,
                new_password: password
            }
            mutation.mutate(payload)
        }
    }
    function renderActionSheet() {
        return (
            <Modal isVisible={showModal} onBackdropPress={onCancelModal}>
                <LinearGradient
                    colors={['#412653', '#2E1B3B']}
                    style={{ padding: 15, justifyContent: "center", borderRadius: 20, }}>
                    <View style={{ marginVertical: 20 }}>
                        <Text style={styles.nameTitle}>{userName}</Text>
                        <CustomTextInput
                            placeholderName={"New Password"}
                            valueField={password}
                            onChangeTextValue={(text) => {
                                setPassword(text)
                            }}
                            onChangeFocus={() => {
                                setErrorPassword("")
                            }}
                            errorField={errorPassword}
                        />
                        <CustomTextInput
                            placeholderName={"Confirm Password"}
                            valueField={newPassword}
                            onChangeTextValue={(text) => {
                                setNewPassword(text)
                            }}
                            onChangeFocus={() => {
                                setErrorNewPassword("")
                            }}
                            errorField={errorNewPassword}
                        />
                        <View style={{ flexDirection: "row" }}>
                            <ButtonComponent
                                wrapperStyles={[styles.checkoutContainer]}
                                textStyles={styles.buttonCancelText}
                                text={'Cancel'}
                                onPress={onCancelModal}
                                buttonColor={'#FFF'}
                            />
                            <ButtonComponent
                                wrapperStyles={styles.checkoutContainer}
                                textStyles={[styles.buttonText, { color: "#FFF" }]}
                                text={'Save'}
                                onPress={onPressSave}
                                buttonColor={'#DC9C40'}
                            />
                        </View>
                    </View>
                </LinearGradient>
            </Modal>
        )
    }
    const AgentItem = ({ item }) => (
        <View style={styles.userContainer}>
            <Text style={styles.userNameText}>{item.name}</Text>
            <View style={{ flexDirection: "row" }}>
                <Pressable onPress={() => {
                    setUserId(item.id);
                    setUserName(item.name)
                    setShowModal(!showModal)
                }}>
                    <FastImage
                        source={edit}
                        style={{
                            height: 17,
                            width: 17,
                            marginHorizontal: 25
                        }}
                        resizeMode="contain"
                    />
                </Pressable>
                <FastImage
                    source={eye}
                    style={{
                        height: 17,
                        width: 17,
                    }}
                    resizeMode="contain"
                />
            </View>
        </View>
    )
    return (
        <SafeScreen>
            <LoaderOverlay show={isLoading} />
            <View style={styles.container}>
                <View style={styles.walletContainer}>
                    <View>
                        <Text style={styles.walletTitle}>My Dealers</Text>
                    </View>
                    <Pressable
                        style={styles.rechargeButton}
                        onPress={() => {
                            navigate('CreateAccount', { type: "dealer" });
                        }}>
                        <Text style={styles.buttonText}>AddDealer</Text>
                    </Pressable>
                </View>
                <FlatList
                    data={data?.data?.dealers}
                    renderItem={AgentItem}
                    keyExtractor={_keyExtractor}
                    // scrollEnabled={false}
                    listKey={(item, index) => `${index}-item`}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={styles.walletTitle}>No Dealrs</Text>
                        </View>
                    )}
                />
            </View>
            {renderActionSheet()}
        </SafeScreen>
    )
}

export default DealerList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
    walletContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    walletTitle: {
        fontSize: 22,
        fontFamily: FontFamily.poppinsSemiBold,
        color: '#070A0D',
    },
    rechargeButton: {
        backgroundColor: '#DC9C40',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    buttonCancelText: {
        fontSize: 12,
        fontFamily: FontFamily.poppinsSemiBold,
        color: '#49284A',
    },
    userContainer: {
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        marginTop: 10,
        borderTopWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "#E7E8E9",
        paddingVertical: 15
    },
    userNameText: {
        fontSize: 12,
        fontFamily: FontFamily.poppinsSemiBold,
        color: '#49284A',
    },
    modalContainer: {
        // padding: 22,
        backgroundColor: "#49284A",
        borderRadius: 16
    },
    checkoutContainer: {
        // marginHorizontal: 14,
        marginTop: 20,
        // width: '95%',
        borderRadius: 12,
        height: 40,
        flex: 1,
        marginHorizontal: 10,

    },
    buttonText: {
        fontSize: 16,
        fontFamily: FontFamily.poppinsMedium,
        color: '#070A0D',
    },
    nameTitle: {
        fontSize: 12,
        fontFamily: FontFamily.poppinsMedium,
        color: '#FFFFFF',
        textAlign: "center",
        marginBottom: 20
    }

})