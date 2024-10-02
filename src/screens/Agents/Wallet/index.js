import { SafeScreen } from '../../../components/template';
import {
    FlatList,
    ImageBackground,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { FontFamily } from '../../../theme/fonts';
import LinearGradient from 'react-native-linear-gradient';
import rupeeIcon from '../../../theme/assets/images/rupee.png';
import filterIcon from '../../../theme/assets/images/filter.png';
import cashIcon from '../../../theme/assets/images/cash.png';
import game from '../../../theme/assets/images/game.png';
import FastImage from 'react-native-fast-image';
import { navigate } from '../../../navigators/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { walletHistory } from '../../../services/game/game';
import EmptyComponent from '../../../components/molecules/EmptyComponet';
import { useCallback, useEffect, useState } from 'react';
import MaterialTab from '../../../components/molecules/MaterialTab';
import close from '../../../theme/assets/images/closeIcon.png';
import tick from '../../../theme/assets/images/tick.png';
import coinIcon from '../../../theme/assets/images/star.png';
import { dealerReqAcceptReject, getUserWalletReq, getWalletReq, walletReqDelete, walletReqEdit } from '../../../services/wallet/wallet';
import { customToastMessage } from '../../../utils/UtilityHelper';
import { Colors } from '../../../theme/colors';

const staticData = [
    { value: "Requests" },
    { value: "History" },
]
const AgentWalletScreen = props => {
    const [option, setOption] = useState(staticData[0].value);
    const [refreshing, setRefreshing] = useState(false);
    // const [walletTotal, setWalletTotal] = useState(0)
    const { isSuccess, data, isFetching, isLoading, refetch } = useQuery({
        queryKey: ["wallethistory"],
        queryFn: () => {
            return walletHistory();
        },
    });
    // console.log("data===user walleyy history", isSuccess, JSON.stringify(data));
    const { data: reqData, isLoading: reqIsLoading, refetch: reqRefetch } = useQuery({
        queryKey: ["wallet"],
        queryFn: () => {
            return getWalletReq();
        },
        enabled: true,
    });
    useEffect(() => {
        const interval = setInterval(() => {
            refetch()
            reqRefetch()
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const { isSuccess: userSuccess, data: userData, refetch: userRefetch } = useQuery({
        queryKey: ["walletreq"],
        queryFn: () => {
            return getUserWalletReq();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: payload => {
            return walletReqDelete(payload);
        },
        onSuccess: data => {
            userRefetch()
        },
        onError: error => {
            console.log('------ERROR game status -----', error);
            customToastMessage(error.error ? error.error : error.message, 'error');
        },
    });

    const onPressDeleteReq = (id) => {
        deleteMutation.mutate(id)
    }

    // useEffect(() => {
    //     if (isSuccess) {
    //         /* const total = data.transactions.reduce(
    //             (acc, obj) => acc + parseInt(obj.amount),
    //             0,
    //         ); */
    //         setWalletTotal(parseFloat(data?.balance))
    //     }
    // }, [isSuccess])
    const mutation = useMutation({
        mutationFn: payload => {
            return dealerReqAcceptReject(payload);
        },
        onSuccess: data => {
            reqRefetch()
            customToastMessage(data.message, 'success');
        },
        onError: error => {
            console.log('------ERROR joinGame -----', error);
            customToastMessage(error.error ? error.error : error.message, 'error');
        },
    });
    const onPressAcceptReject = (id, type) => {
        const payload = {
            type: type,
            request_id: id
        }
        mutation.mutate(payload)
    }
    const _keyExtractor = (item, index) => index.toString();
    const formatDate = (isoString) => {
        // Create a Date object from the ISO string
        const date = new Date(isoString);

        // Extract date parts
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getUTCFullYear();

        // Extract time parts
        let hours = date.getUTCHours();
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        // Format the date and time
        const formattedDate = `${day}-${month}-${year}`;
        const formattedTime = `${hours}:${minutes} ${ampm}`;

        return `${formattedDate} ${formattedTime}`;
    }
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch()
        // Simulate a network request or some data fetching
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);
    const dateFormat = (timestamp) => {
        const date = new Date(timestamp);

        // Define options for formatting
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };

        // Format the date and time
        const formattedDate = date.toLocaleDateString('en-GB', options);

        // Combine date and time into the final format
        const finalFormattedDateTime = `${formattedDate}`;
        return finalFormattedDateTime;
    }
    const historyComponents = ({ item }) => {
        return (
            <>
                <View style={styles.lineStyle} />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 15,
                    }}>
                    <View style={{ flexDirection: 'row', marginRight: 10 }}>
                        <View
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 8,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#FAF1FB',
                                marginRight: 10,
                            }}>
                            <FastImage
                                source={cashIcon}
                                style={{
                                    height: 20,
                                    width: 20,
                                }}
                                resizeMode="contain"
                            />
                        </View>
                        <View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                {
                                    !!item.user_name &&
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontFamily: FontFamily.poppinsSemiBold,
                                            color: '#1B1023',
                                            marginRight: 10
                                        }}>
                                        {item.user_name}
                                    </Text>
                                }
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontFamily: FontFamily.poppinsSemiBold,
                                        color: '#1B1023',
                                    }}>
                                    {item.type === "deposit" && '+'}{item.amount}
                                </Text>
                                <FastImage
                                    source={coinIcon}
                                    style={{
                                        height: 14,
                                        width: 14,
                                        marginLeft: 3
                                    }}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: FontFamily.poppinsMedium,
                                    color: '#5F646A',
                                }}>
                                {formatDate(item.created_at)}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                        }}>
                        <View
                            style={{
                                height: 9,
                                width: 9,
                                borderRadius: 100,
                                backgroundColor: item.type == 'deposit' ? '#21C24E' : '#C23421',
                                alignSelf: 'center',
                                marginRight: 5,
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 13,
                                fontFamily: FontFamily.poppinsMedium,
                                color: '#1B1023',
                                textTransform:"capitalize"
                            }}>
                            {(!!item.user_name && item.type === "deposit") ? "Deposite to Dealer" : (!!item.user_name && item.type === "withdraw") ? "Dealer Redeemed" : item.type}
                        </Text>
                    </View>
                </View>
            </>
        );
    };
    const WalletReqItem = ({ item }) => (
        <View style={styles.userContainer}>
            <View>
                <Text style={styles.userNameText}>{item?.request_user?.name}</Text>
                <Text style={styles.dateTime}>{dateFormat(item?.created_at)}</Text>
            </View>
            <Text style={styles.coinText}>{parseInt(item?.amount)} Coins</Text>
            {
                item.status === 0 ?
                    <View style={{ flexDirection: "row" }}>
                        <Pressable style={[styles.acceptRejectContainer, { backgroundColor: "#C23421", marginHorizontal: 18 }]}
                            onPress={() => { onPressAcceptReject(item.id, "reject") }}
                        >
                            <FastImage
                                source={close}
                                style={{
                                    height: 16,
                                    width: 14,
                                }}
                                resizeMode="contain"
                            />
                        </Pressable>
                        <Pressable style={[styles.acceptRejectContainer, { backgroundColor: "#21C24E" }]}
                            onPress={() => { onPressAcceptReject(item.id, "accept") }}
                        >
                            <FastImage
                                source={tick}
                                style={{
                                    height: 16,
                                    width: 14,
                                }}
                                resizeMode="contain"
                            />
                        </Pressable>
                    </View> : item.status === 1 ? <Text style={styles.acceptText}>Accepted</Text> : <Text style={styles.rejectText}>Rejected</Text>
            }
        </View>
    )
    const UserWalletReqItem = ({ item }) => (
        <View style={styles.userContainer}>
            <View>
                <Text style={styles.userNameText}>{item?.request_user?.name}</Text>
                <Text style={styles.dateTime}>{dateFormat(item?.created_at)}</Text>
            </View>
            <Text style={styles.coinText}>{parseInt(item?.amount)} Coins</Text>
            <View style={{ flexDirection: "row" }}>
                <Pressable style={[styles.acceptRejectContainer, { backgroundColor: "#C23421", marginHorizontal: 18 }]}
                    onPress={() => { onPressDeleteReq(item.id) }}
                >
                    <FastImage
                        source={close}
                        style={{
                            height: 16,
                            width: 14,
                        }}
                        resizeMode="contain"
                    />
                </Pressable>
                <Pressable style={[styles.acceptRejectContainer, { backgroundColor: "#21C24E" }]}
                    onPress={() => { navigate('AgentWalletPayment', { id: item.id, amount: item?.amount }) }}
                >
                    <FastImage
                        source={tick}
                        style={{
                            height: 16,
                            width: 14,
                        }}
                        resizeMode="contain"
                    />
                </Pressable>
            </View>
        </View>
    )
    return (
        <SafeScreen>
            <View style={styles.container}>
                <View style={styles.walletContainer}>
                    <View>
                        <Text style={styles.walletTitle}>My Wallet</Text>
                        <Text style={styles.walletSubTitle}>Keep Your Coins Safe</Text>
                    </View>
                    <Pressable
                        style={styles.rechargeButton}
                        onPress={() => {
                            navigate('AgentWalletPayment');
                        }}>
                        <Text>Recharge Wallet</Text>
                    </Pressable>
                </View>
                <View style={styles.balanceContainer}>
                    <LinearGradient
                        colors={['#412653', '#2E1B3B']}
                        style={styles.balanceGradientContainer}>
                        <FastImage
                            source={rupeeIcon}
                            style={{
                                height: 48,
                                width: 48,
                                marginBottom: 10,
                            }}
                            resizeMode="contain"
                        />
                        <Text style={styles.balanceTitleText}>E Wallet Balance</Text>
                        <Text style={styles.balanceAmount}><FastImage
                            source={coinIcon}
                            style={{
                                height: 12,
                                width: 10,
                            }}
                            resizeMode="contain"
                        /> {parseFloat(data?.balance).toFixed(2)}</Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.messageText}>
                                Every transaction is verified for your peace of mind
                            </Text>
                        </View>
                    </LinearGradient>
                </View>
                <MaterialTab
                    data={staticData}
                    onSelect={value => setOption(value)}
                    selectedOption={option}
                />
                {
                    option === "Requests" ?
                        <FlatList
                            data={!!reqData ? reqData.data : []}
                            renderItem={WalletReqItem}
                            keyExtractor={_keyExtractor}
                            listKey={(item, index) => `${index}-item`}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={() => (
                                <EmptyComponent text={'No Data Founds'} image={game} />
                            )}
                        /> :
                        <FlatList
                            data={!!data ? data.transaction : []}
                            renderItem={historyComponents}
                            keyExtractor={_keyExtractor}
                            listKey={(item, index) => `${index}-item`}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                            ListEmptyComponent={() => (
                                <EmptyComponent text={'No Data Founds'} image={game} />
                            )}
                        />
                }
            </View>
        </SafeScreen>
    );
};

export default AgentWalletScreen;

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
    walletSubTitle: {
        fontSize: 16,
        fontFamily: FontFamily.poppinsMedium,
        color: '#101820',
    },
    rechargeButton: {
        backgroundColor: '#DC9C40',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    rechargeText: {
        fontSize: 12,
        fontFamily: FontFamily.poppinsMedium,
        color: '#070A0D',
    },
    balanceContainer: {
        borderRadius: 20,
        height: '30%',
        // marginBottom: 20,
    },
    balanceGradientContainer: {
        flex: 1,
        borderRadius: 20,
        padding: 20,
    },
    balanceTitleText: {
        fontSize: 14,
        fontFamily: FontFamily.poppinsRegular,
        color: '#FFF',
        marginBottom: 5,
    },
    balanceAmount: {
        fontSize: 27,
        fontFamily: FontFamily.poppinsSemiBold,
        color: '#FFF',
        marginBottom: 5,
    },
    messageText: {
        fontSize: 12,
        fontFamily: FontFamily.poppinsRegular,
        color: '#FBFBFB',
    },
    historyTitle: {
        fontSize: 18,
        fontFamily: FontFamily.poppinsSemiBold,
        color: '#070A0D',
    },
    lineStyle: {
        borderWidth: 1,
        borderColor: '#E7E8E9',
        // margin: 10,
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
        fontSize: 18,
        fontFamily: FontFamily.poppinsSemiBold,
        color: '#49284A',
    },
    dateTime: {
        fontSize: 10,
        fontFamily: FontFamily.poppinsSemiBold,
        color: '#5E6168',
    },
    coinText: {
        fontSize: 13,
        fontFamily: FontFamily.poppinsSemiBold,
        color: '#49284A',
    },
    acceptRejectContainer: {
        height: 28,
        width: 28,
        justifyContent: "center",
        alignItems: "center"
    },
    acceptText: {
        fontSize: 15,
        fontFamily: FontFamily.poppinsBold,
        color: Colors.green,
    },
    rejectText: {
        fontSize: 15,
        fontFamily: FontFamily.poppinsBold,
        color: Colors.red,
    }
});
