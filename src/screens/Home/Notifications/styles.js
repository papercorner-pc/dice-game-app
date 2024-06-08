import { Colors } from "@/theme/colors";
import { StyleSheet, Platform } from "react-native";
import { FontFamily } from "../../theme/fonts";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerStyle: {
    flexGrow: 1,
    marginTop: 20,
    paddingBottom: 0,
  }
})