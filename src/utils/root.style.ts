import { Dimensions } from "react-native";
import { colors } from "./variables";

export const { width: widthWindow, height: heightWindow } =
  Dimensions.get("window");

export const global = {
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
};

export const styles = {
  screen: {
    backgroundColor: colors.screen,
    fontSize: 18,
    fontWeight: 700,
    // paddingTop: 5,
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
  },
  shadow: {
    backgroundColor: colors.white,
    shadowOffset: { width: -1, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
};
