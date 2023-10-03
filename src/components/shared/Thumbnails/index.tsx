import React from "react";
import { View } from "@/components/Themed";
import { Image, StyleSheet } from "react-native";
import { global } from "@/utils/root.style";
import { SwipeSlider } from "../SwipeSlider";

interface Props {
  thumbnails: string[];
}

export const Thumbnails = (props: Props) => {
  return (
    <View className="w-full">
      <SwipeSlider data={props.thumbnails} />
    </View>
  );
};
