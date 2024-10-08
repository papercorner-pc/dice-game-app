import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    RefreshControl,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeScreen } from '../../components/template';
import { goBack, navigate } from '../../navigators/utils';
import backIcon from '../../theme/assets/images/back.png';
import diceIcon from '../../theme/assets/images/diceBg.png';
import playIcon from '../../theme/assets/images/play.png';
import sortIcon from '../../theme/assets/images/sort.png';
import { FontFamily } from '../../theme/fonts';
import { paymentMethodListData } from '../../utils/constants';
import { useMutation } from '@tanstack/react-query';
import { getUserSingleGameList } from '../../services/game/game';
import { customToastMessage } from '../../utils/UtilityHelper';
import { useCallback, useEffect, useState } from 'react';
import game from '../../theme/assets/images/game.png';
import EmptyComponent from '../../components/molecules/EmptyComponet';
import iconAce from '../../theme/assets/images/iconAce.png';
import iconClaver from '../../theme/assets/images/iconClaver.png';
import iconDiamond from '../../theme/assets/images/iconDiamond.png';
import iconFlag from '../../theme/assets/images/iconFlag.png';
import iconHeart from '../../theme/assets/images/iconHeart.png';
import iconMoon from '../../theme/assets/images/iconMoon.png';
import coinIcon from '../../theme/assets/images/star.png';
import join from '../../theme/assets/images/join-now.png';
import { Colors } from '../../theme/colors';
import { storage } from '../../App';

const GameJoinedList = props => {
    const _keyExtractor = (item, index) => index.toString();
    const { gameId } = props.route.params;
    const userType = storage.getString('user_type');
    const [gameList, setGameList] = useState([]);
    const [userEarning, setUserEarning] = useState(0)
    const [usetInvest, setUserInvest] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [resOne, setResOne] = useState(null);
    const [resTwo, setResTwo] = useState(null);
    const [resThree, setResThree] = useState(null);
    const mutation = useMutation({
        mutationFn: payload => {
            return getUserSingleGameList(payload);
        },
        onSuccess: data => {
            console.log('---success gameDetails---------', data);
            setGameList(data.userGameList)
            setUserEarning(data?.userEarnings)
            setUserInvest(data?.user_total_investment)
            if (!!data.result) {
                setResOne(data.result.dice_1);
                setResTwo(data.result.dice_2);
                setResThree(data.result.dice_3);
            }
            // const userData = data.hasOwnProperty('users') ? data.users : [];
            // setGameList(userData);
        },
        onError: error => {
            console.log('------ERROR gameDetails -----', error);
            customToastMessage(error.error ? error.error : error.message, 'error');
        },
    });
    useEffect(() => {
        const payload = {
            game_id: gameId,
        };
        mutation.mutate(payload);
    }, [refreshing]);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Simulate a network request or some data fetching
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);
    const setSelectedCardImage = (selectedCard) => {
        switch (selectedCard) {
            case 1:
                return iconHeart;
            case 2:
                return iconAce;
            case 3:
                return iconClaver;
            case 4:
                return iconDiamond;
            case 5:
                return iconMoon;
            case 6:
                return iconFlag;
            default:
                break;
        }
    };
    const navigateToResult = (card) => {
        navigate('ResultGameScreen', { selectedCard: card, isFromResult: true, gameId: gameId });
    };
    const renderLeaderBoardMethod = ({ item }) => {
        return (
            <View style={styles.listContainer}>
                <View style={{ flexDirection: 'row' }}>
                    {/* <Text style={{ textAlignVertical: "center", marginRight: 10, color: Colors.black }}>#{item.id}</Text> */}
                    <View style={styles.listImageContainer}>
                        <FastImage
                            style={{ height: 28, width: 28 }}
                            source={setSelectedCardImage(item.selected_card)}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        {
                            !!item.user_name &&
                            <Text style={styles.userNameText}>{item.user_name}</Text>
                        }
                        <View>
                            <Text style={styles.contestNameText}>invest: {item.joined_amount}</Text>
                            <Text style={styles.contestNameText}>Earning: {item.game_earning}</Text>
                            {/* <Text style={styles.wonText}>
                            Won :{' '}
                            <Text style={styles.wonAmountText}>₹{item.game_earning}</Text>
                        </Text> */}
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'flex-start' }}>
                    {/* <Pressable
                        style={[styles.participateContainer, styles.joinContainer]}
                        onPress={() => { navigateToResult(item.selected_card) }}>
                        <Text style={styles.joinText}>Result</Text>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 3,
                            }}>
                            <Image
                                source={join}
                                style={{
                                    height: 10,
                                    width: 10,
                                }}
                                tintColor={'#FFF'}
                                resizeMode="contain"
                            />
                        </View>
                    </Pressable> */}
                </View>
            </View>
        );
    };
    return (
        <SafeScreen>
            <View style={[styles.headerContainer, { paddingBottom: 10 }]}>
                <View style={{ flexDirection: 'row', paddingVertical: 30 }}>
                    <TouchableOpacity
                        style={styles.backButton}
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
                        <Text style={styles.headingText}>Match Result</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    {/* <FastImage
                        style={{ height: 48, width: 48, marginBottom: 10 }}
                        source={diceIcon}
                        resizeMode="contain"
                    /> */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ marginHorizontal: 30, alignItems: "center" }}>
                            <Text style={styles.amountTitleText}>Total Invest</Text>
                            <Text style={styles.amountText}><FastImage
                                source={coinIcon}
                                style={{
                                    height: 12,
                                    width: 10,
                                }}
                                resizeMode="contain"
                            /> {usetInvest}</Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.amountTitleText}>Total Earning</Text>
                            <Text style={styles.amountText}><FastImage
                                source={coinIcon}
                                style={{
                                    height: 12,
                                    width: 10,
                                }}
                                resizeMode="contain"
                            /> {userEarning}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        {
                            !!resOne &&
                            <View style={{ backgroundColor: "white", padding: 3, marginRight: 10, }}>
                                <FastImage
                                    style={{ height: 28, width: 28 }}
                                    source={setSelectedCardImage(resOne)}
                                    resizeMode="contain"
                                />
                            </View>
                        }
                        {
                            !!resTwo &&
                            <View style={{ backgroundColor: "white", padding: 3, marginRight: 10, }}>
                                <FastImage
                                    style={{ height: 28, width: 28 }}
                                    source={setSelectedCardImage(resTwo)}
                                    resizeMode="contain"
                                />
                            </View>
                        }
                        {
                            !!resThree &&
                            <View style={{ backgroundColor: "white", padding: 3, marginRight: 10, }}>
                                <FastImage
                                    style={{ height: 28, width: 28 }}
                                    source={setSelectedCardImage(resThree)}
                                    resizeMode="contain"
                                />
                            </View>
                        }
                    </View>
                    {/* <Text style={styles.amountMessageText}>
                        Congrats You won the game
                    </Text> */}
                </View>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={gameList}
                    renderItem={renderLeaderBoardMethod}
                    keyExtractor={_keyExtractor}
                    listKey={(item, index) => `${index}-item`}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    ListEmptyComponent={() => (
                        <EmptyComponent text={'No Game Founds'} image={game} />
                    )}
                />
            </View>
        </SafeScreen>
    );
};

export default GameJoinedList;

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#3F2450',
    },
    backButton: {
        position: 'absolute',
        left: 20,
    },
    mainHeadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: -20,
        // paddingHorizontal: 5,
    },
    headingText: {
        fontSize: 18,
        fontFamily: FontFamily.poppinsMedium,
        color: '#FFF',
    },
    amountText: {
        fontSize: 27,
        fontFamily: FontFamily.poppinsSemiBold,
        color: '#FFF',
    },
    amountTitleText: {
        fontSize: 18,
        fontFamily: FontFamily.poppinsSemiBold,
        color: '#FFF',
    },
    amountMessageText: {
        fontSize: 14,
        fontFamily: FontFamily.poppinsMedium,
        color: '#FBFBFB',
    },
    container: {
        flex: 1,
        backgroundColor: '#EEEDED',
    },
    videoContainer: {
        height: 34,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
    },
    watchText: {
        fontSize: 12,
        fontFamily: FontFamily.poppinsMedium,
        color: '#DC9C40',
    },
    leaderBoardText: {
        fontSize: 18,
        fontFamily: FontFamily.poppinsSemiBold,
        color: '#070A0D',
    },
    contestText: {
        fontSize: 11,
        fontFamily: FontFamily.poppinsMedium,
        color: '#675175',
    },
    lineStyle: {
        borderWidth: 1,
        borderColor: '#E7E8E9',
        // margin: 10,
    },
    investText: {
        fontSize: 13,
        fontFamily: FontFamily.poppinsMedium,
        color: '#070A0D',
    },
    listContainer: {
        flexDirection: 'row',
        marginTop: 1,
        padding: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
    },
    listImageContainer: {
        justifyContent: 'center',
        height: 34,
        width: 34,
        borderRadius: 6,
        borderColor: '#ECE9EE',
        borderWidth: 1,
        alignItems: 'center',
        marginRight: 20,
    },
    contestNameText: {
        fontSize: 15,
        fontFamily: FontFamily.poppinsMedium,
        color: '#070A0D',
    },
    userNameText: {
        fontSize: 18,
        fontFamily: FontFamily.poppinsMedium,
        color: '#070A0D',
        marginRight: 10,
    },
    wonText: {
        fontSize: 13,
        fontFamily: FontFamily.poppinsMedium,
        color: '#070A0D',
    },
    wonAmountText: {
        fontSize: 13,
        fontFamily: FontFamily.poppinsSemiBold,
        color: '#21C24E',
    },
    participateContainer: {
        flexDirection: 'row',
    },
    lineStyle: {
        borderWidth: 1,
        borderColor: '#E7E8E9',
        margin: 10,
    },
    joinContainer: {
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        backgroundColor: '#DC9C40',
    },
    joinText: {
        fontSize: 13,
        fontFamily: FontFamily.poppinsMedium,
        color: '#FBFBFB',
    },
});
