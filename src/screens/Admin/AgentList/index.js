import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import FastImage from "react-native-fast-image";
import { SafeScreen } from "../../../components/template";
import { FontFamily } from "../../../theme/fonts";
import edit from '../../../theme/assets/images/editImage.png';
import eye from '../../../theme/assets/images/eyeView.png';
import Modal from "react-native-modal";
import { useCallback, useState } from "react";
import { navigate } from "../../../navigators/utils";
import { useQuery } from "@tanstack/react-query";
import { getAgentsList } from "../../../services/users/users";
import LoaderOverlay from "../../../components/molecules/LoaderOverlay";
import { useFocusEffect } from "@react-navigation/native";


const AgentList = () => {
    const [showModal, setShowModal] = useState(false)
    const _keyExtractor = (item, index) => index.toString();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["agents"],
        queryFn: () => {
            return getAgentsList();
        },
        enabled: true,
    });
    useFocusEffect(
        useCallback(() => {
            refetch()
            return () => {
            };
        }, []), // Empty array means it will run every time the screen is focused
    );
    const AgentItem = ({ item }) => (
        <View style={styles.userContainer}>
            <Text style={styles.userNameText}>{item.name}</Text>
            <View style={{ flexDirection: "row" }}>
                <FastImage
                    source={edit}
                    style={{
                        height: 17,
                        width: 17,
                        marginHorizontal: 25
                    }}
                    resizeMode="contain"
                />
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
                        <Text style={styles.walletTitle}>My Agents</Text>
                    </View>
                    <Pressable
                        style={styles.rechargeButton}
                        onPress={() => {
                            navigate('CreateAccount', { type: "agent" });
                        }}>
                        <Text style={styles.buttonText}>AddAgent</Text>
                    </Pressable>
                </View>
                <FlatList
                    data={data?.data?.agents}
                    renderItem={AgentItem}
                    keyExtractor={_keyExtractor}
                    // scrollEnabled={false}
                    listKey={(item, index) => `${index}-item`}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={styles.walletTitle}>No Agents</Text>
                        </View>
                    )}
                />
            </View>
            <Modal isVisible={showModal} onBackdropPress={() => { setShowModal(!showModal) }}>
                <View style={[styles.modalContainer, { padding: 22 }]}>

                </View>
            </Modal>
        </SafeScreen>
    )
}

export default AgentList

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
    buttonText: {
        fontSize: 12,
        fontFamily: FontFamily.poppinsSemiBold,
        color: '#070A0D',
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

})