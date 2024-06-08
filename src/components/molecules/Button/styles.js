import { Colors } from "../../../theme/colors";
import {
    StyleSheet,
    Platform
} from "react-native";
import { FontFamily } from "../../../theme/fonts";

export default StyleSheet.create({
    wrapper: {
        alignSelf: 'center',
        height: 56,
        backgroundColor: Colors.themeColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: '100%',
        marginHorizontal: 16
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontFamily: FontFamily.montserratMedium,
        lineHeight: 19.5,
    },
})