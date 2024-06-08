import { StyleSheet } from "react-native";
import { FontFamily } from "../../../theme/fonts";
import { Colors } from "../../../theme/colors";

export default StyleSheet.create({
  container: { paddingVertical: 2 },
  textContainer: {
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: FontFamily.montserratRegular,
    color: Colors.black,
    fontSize: 14,
  },
  inputContainer: {
    borderColor: Colors.textInputColor,
    borderWidth: 1,
    //height: 50,
    paddingBottom: 12,
  },
  errorStyle: {
    fontFamily: FontFamily.montserratRegular,
    color: Colors.red,
    fontSize: 12,
  },
  currencyCode: {
    fontFamily: FontFamily.montserratMedium,
    color: Colors.themeColor,
    fontSize: 16,
  },
});
