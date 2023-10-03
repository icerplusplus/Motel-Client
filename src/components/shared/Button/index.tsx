import { colors } from "@/utils/variables";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface Props {
  onPress?: () => void;
  title: string;
  icon?: React.ReactNode;
  colors?: string;
  className?: string;
  textSize?: number;
  textColor?: string;
}

export const Button = (props: Props) => {
  return (
    <TouchableOpacity
      style={[
        style.buttonContainer,
        {
          backgroundColor: props.colors || colors.rose,
        },
      ]}
      onPress={props.onPress}
    >
      {/* <View style={style.button}> */}
      <Text
        className="text-white font-bold"
        style={{
          fontSize: props.textSize || 14,
          color: props.textColor || "white",
        }}
      >
        {props.title}
      </Text>
      {/* </View> */}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 5,
  },
  button: {},
});
