import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AnimatedLottieView from "lottie-react-native";
import { loading } from "@/utils/variables";
import { styles } from "@/utils/root.style";

interface LoadingProps {
  width?: number;
  height?: number;
}

export const Loading = ({ width = 200, height = 200 }: LoadingProps) => {
  return (
    <View style={style.container}>
      <AnimatedLottieView
        autoPlay
        // ref={animation}
        style={[
          style.loading,
          {
            width,
            height,
          },
        ]}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={loading}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    ...styles.shadow,
  },
  loading: {
    width: 200,
    height: 200,
  },
});
