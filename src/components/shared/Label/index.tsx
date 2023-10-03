import React from "react";
import { View, Text } from "react-native";

interface Props {
  title: string;
}

export const Label = (props: Props) => {
  return (
    <View>
      <Text className="text-slate-500 text-base">{props.title}</Text>
    </View>
  );
};
