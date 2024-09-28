import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeScreen } from "../../../components/template"
import { goBack } from "../../../navigators/utils";
import { FontFamily } from "../../../theme/fonts";
import backIcon from '../../../theme/assets/images/back.png';
import downIcon from '../../../theme/assets/images/down-arrow.png';
import { Colors } from "../../../theme/colors";
import FastImage from "react-native-fast-image";
import { useEffect, useState } from "react";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { useMutation } from "@tanstack/react-query";
import { getDailyReport } from "../../../services/game/game";
import { storage } from "../../../App";
import LoaderOverlay from "../../../components/molecules/LoaderOverlay";

const AdminReport = props => {
    const userType = storage.getString('user_type');
    const [reportList, setReportList] = useState([]);
    const [totalJoins, setTotalJoins] = useState(0);
    const [totalInvest, setTotalInvest] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [totalLoss, setTotalLoss] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const mutation = useMutation({
        mutationFn: payload => {
            return getDailyReport(payload);
        },
        onSuccess: data => {
            setTotalJoins(data?.total_game_join);
            setTotalInvest(data?.total_invest);
            setTotalEarnings(data?.total_earning);
            setTotalLoss(data?.total_loss);
            if (userType === "agent") {
                setReportList(data?.dealers)
            } else {
                setReportList(data?.agents)
            }
            setIsLoading(false);
            console.log("data", JSON.stringify(data));
        },
        onError: error => {
            setIsLoading(false);
            console.log('------ERROR joinGame -----', error);
            // customToastMessage(error.error ? error.error : error.message, 'error');
        },
    });
    useEffect(() => {
        setIsLoading(true);
        mutation.mutate()
    }, []);
    const backgroundColorFix = (index) => {
        if (index % 2 === 0) {
            return Colors.lightGreen
        } else {
            return Colors.mildGray
        }
    };
    const backgroundDealerColorFix = (index) => {
        if (index % 2 === 0) {
            return Colors.lightCyan
        } else {
            return Colors.mildGray
        }
    };
    const renderItem = ({ item, index }) => {
        return (
            <Collapse>
                <CollapseHeader>
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", paddingVertical: 5, backgroundColor: backgroundColorFix(index) }}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableDataText}>{item?.name}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableDataText}>{item?.total_game_join}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableDataText}>{item?.total_invest}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableDataText}>{item?.total_earning}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableDataText}>{item?.total_loss}</Text>
                        </View>
                        <View style={[styles.tableRow, { flex: 0.3, }]}>
                            {
                                userType !== "agent" &&
                                <FastImage
                                    source={downIcon}
                                    style={{
                                        height: 14,
                                        width: 14,
                                    }}
                                    resizeMode="contain"
                                />
                            }
                        </View>
                    </View>
                </CollapseHeader>
                <CollapseBody>
                    {
                        userType !== "agent" &&
                        <FlatList
                            data={item?.dealers}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderAgentItem}
                        />
                    }
                </CollapseBody>
            </Collapse>
        )
    }
    const renderAgentItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", paddingVertical: 5, backgroundColor: backgroundDealerColorFix(index) }}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableDataText}>{item.name}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableDataText}>{item.total_game_join}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableDataText}>{item.total_invest}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableDataText}>{item.total_earning}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableDataText}>{item.total_loss}</Text>
                </View>
                <View style={[styles.tableRow, { flex: 0.3, }]}>
                    {/* <FastImage
                        source={downIcon}
                        style={{
                            height: 14,
                            width: 14,
                        }}
                        resizeMode="contain"
                    /> */}
                </View>
            </View>
        )
    }
    return (
        <SafeScreen>
            <LoaderOverlay show={isLoading} />
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
                    <Text style={styles.headingText}>Report</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.mainReportContainer}>
                    <View style={styles.reportContainer}>
                        <Text style={styles.reportText}>Total Joins</Text>
                        <Text style={styles.reportText}>{totalJoins}</Text>
                    </View>
                    <View style={styles.reportContainer}>
                        <Text style={styles.reportText}>Total Invest</Text>
                        <Text style={styles.reportText}>{totalInvest}</Text>
                    </View>
                </View>
                <View style={styles.mainReportContainer}>
                    <View style={[styles.reportContainer, { backgroundColor: Colors.green }]}>
                        <Text style={styles.reportText}>Earnings</Text>
                        <Text style={styles.reportText}>{totalEarnings}</Text>
                    </View>
                    <View style={[styles.reportContainer, { backgroundColor: Colors.red }]}>
                        <Text style={styles.reportText}>Loss</Text>
                        <Text style={styles.reportText}>{totalLoss}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around", backgroundColor: Colors.themeColor, paddingVertical: 5, marginTop: 10 }}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableText}>Name</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableText}>Joins</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableText}>Invests</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableText}>Earnings</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableText}>Loss</Text>
                    </View>
                    <View style={{ flex: 0.3 }} />
                </View>
                <FlatList
                    data={reportList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            </View>
        </SafeScreen>
    )
}

export default AdminReport

const styles = StyleSheet.create({
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
        paddingHorizontal: 16,
    },
    mainReportContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    reportContainer: {
        flex: 1,
        backgroundColor: Colors.themeColor,
        marginRight: 10,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 10
    },
    reportText: {
        fontSize: 18,
        fontFamily: FontFamily.poppinsMedium,
        color: '#FFF',
    },
    tableRow: {
        flex: 1,
        alignItems: "center",
    },
    tableText: {
        fontSize: 14,
        fontFamily: FontFamily.poppinsRegular,
        color: '#FFF',
    },
    tableDataText: {
        fontSize: 13,
        fontFamily: FontFamily.poppinsRegular,
        color: Colors.black,
    }
})