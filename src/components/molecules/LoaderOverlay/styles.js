import {
    StyleSheet,
    Dimensions
} from "react-native";

export default StyleSheet.create({
    wrapper: {
        alignSelf: 'center',
        backgroundColor: '#5840ad',
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        width: '90%'
    },
    text: {
        color: '#fff',
        fontSize: 12,
    },
    overlay: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        zIndex: 11,
        width: '100%',
        backgroundColor: 'rgba(255,255,255, 0.4)'
      },
      container: {
        flex: 1,
        justifyContent: 'center'
      },
      buttonText: {
        color: '#fff',
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center'
      },
})