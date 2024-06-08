import { StyleSheet, Platform } from "react-native";
import { FontFamily } from "../../../theme/fonts";
import { Colors } from "../../../theme/colors";
export default StyleSheet.create({
  customIcon: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    transform: [{ translateY: -20 }],
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabbarContainer: {
    flex: 1,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  tatbarView: {
    justifyContent: "center",
    alignItems: "center",
  },
  tatbarText: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: 10,
    fontStyle: "normal",
    color: "black",
  },
  bottomTabContainer: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopColor: Colors.borderColor,
    borderLeftColor: Colors.borderColor,
    borderRightColor: Colors.borderColor,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    paddingBottom: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  roundBadge: {
    height: 22,
    width: 22,
    borderRadius: 11,
    backgroundColor: "#4299e1",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -5,
    right: -5,
  },
  roundBadgeText: {
    // fontFamily: FontFamily.comfortaaBold,
    fontSize: 10,
    color: "white",
  },
});
