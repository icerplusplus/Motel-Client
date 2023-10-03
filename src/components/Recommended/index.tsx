import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { recommended } from "mocks";
import { Motel } from "@/utils/type";
import { global } from "@/utils/root.style";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { currencyFormatter } from "@/utils/helper";
import { HorizontalList } from "../shared/HorizontalList";

interface RecommendedProps {}
interface RecommendedItemProps extends Motel {}

export const RecommendedItem = (props: RecommendedItemProps) => {
  return (
    <View style={style.cardItem}>
      <View>
        <Image source={{ uri: props.thumbnails[0] }} style={style.item} />
      </View>
      <View className="rounded-b-sm px-4 py-3 space-y-3">
        <View className="flex-row" style={style.contentItem}>
          <View className="flex-1 space-y-1">
            <Text numberOfLines={1} className="text-lg font-semibold">
              {props.title}
            </Text>
            <View className="flex-row item-center space-x-1">
              <Ionicons name="md-location-sharp" size={24} color="gray" />
              <Text className="text-zinc-800 text-sm" numberOfLines={1}>
                {props.description}
              </Text>
            </View>
          </View>
          <View className="flex-row justify-center gap-1">
            <AntDesign name="star" size={22} color="yellow" />
            <Text className="text-base">{props.rating}</Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-4">
          <View className="flex-row items-center space-x-2">
            <MaterialCommunityIcons
              name="bed-king-outline"
              size={22}
              color="black"
            />
            <Text>2</Text>
          </View>
          <View className="flex-row items-center space-x-2">
            <FontAwesome name="bathtub" size={16} color="black" />
            <Text>2</Text>
          </View>
          <View className="flex-1 flex-row justify-end space-x-2">
            <Text className="text-xl text-zinc-800 font-semibold">
              {currencyFormatter.format(props.price)}
            </Text>
            {/* <Text className="text-sm font-light">{props.unitPrice}</Text> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export const Recommended = (props: RecommendedProps) => {
  return (
    <View>
      <HorizontalList headerTitle="Gợi ý" data={recommended} />
    </View>
  );
};

const style = StyleSheet.create({
  cardItem: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: (global.screen.width * 75) / 100,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  item: {
    width: (global.screen.width * 74.8) / 100,
    height: (global.screen.height * 25) / 100,
    objectFit: "contain",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 16,
  },
  contentItem: {},
});
