import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

interface ButtonWithIconProps {
  icon: React.ReactNode;
  onPress?: () => void;
}

export const ButtonWithIcon = ({ icon, onPress }: ButtonWithIconProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={style.button}>
      <View className="rounded-full p-2 bg-white">{icon}</View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    alignItems: "center",
  },
});
