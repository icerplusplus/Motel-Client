import React from "react";
import { View } from "react-native";
import { HorizontalList } from "../shared/HorizontalList";
import { recommended } from "mocks";

interface Props {}

export const NearbyYou = (props: Props) => {
  return (
    <View>
      <HorizontalList headerTitle="Gần bạn" data={recommended} />
    </View>
  );
};
