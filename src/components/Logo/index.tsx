import { heightWindow, styles, widthWindow } from "@/utils/root.style";
import { colors, logo } from "@/utils/variables";
import React from "react";
import { Image, View, StyleSheet } from "react-native";

export const Logo = () => {
  return (
    <View style={[style.logoBox, styles.shadow]}>
      <Image source={logo} style={style.logo} />
    </View>
  );
};
const style = StyleSheet.create({
  logoContainer: {
    height: heightWindow / 1.5,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  logoBox: {
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: widthWindow / 20,
  },
  logo: {
    width: widthWindow / 5,
    height: widthWindow / 5,
  },
});
