import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { currencyFormatter, formatCurrencyWithoutSymbol } from "@/utils/helper";
import { Motel } from "@/utils/type";
import { global, styles } from "@/utils/root.style";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@/navigators/StackNavigator";
import { colors } from "@/utils/variables";
import { TouchableHighlight } from "react-native-gesture-handler";
import { StarRating } from "../StarRating";

interface HorizontalListProps<T extends Motel> {
  headerTitle: string;
  data: T[];
}

interface ItemProps<T extends Motel> {
  data: T;
  onPress: () => void;
}

export const Item = <T extends Motel>({ data, onPress }: ItemProps<T>) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={style.cardItem}>
        <View className="px-1 pt-1" style={style.item}>
          <Image
            source={{ uri: data.thumbnails[0] }}
            className="w-full h-full object-cover rounded-md"
            resizeMode="cover"
          />
        </View>
        <View className="rounded-b-sm px-2 pb-3 mt-2 space-y-2">
          <View className="flex-row" style={style.contentItem}>
            <View className="flex-1 pr-1">
              <Text
                numberOfLines={1}
                className="text-base font-semibold mb-[2px]"
              >
                {data.title}
              </Text>
              <View className="flex-row item-center">
                <Ionicons name="md-location-sharp" size={16} color="red" />
                <Text
                  className="text-zinc-800 text-xs ml-[2px]"
                  numberOfLines={1}
                >
                  {data.address}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex-row items-center mt-1">
            <View>
              <StarRating rating={data.rating} />
            </View>
          </View>
          <View className="flex-row items-center space-x-4">
            <View className="flex-1 flex-row items-center">
              <Text className="text-base text-teal-500 font-semibold">
                {formatCurrencyWithoutSymbol(data.price)}{" "}
              </Text>
              <Text className="text-sm text-teal-500 font-semibold">
                {data.unitPrice}
              </Text>
            </View>
            <View className="flex-row items-center justify-center space-x-1">
              <View>
                <MaterialCommunityIcons
                  name="bed-king-outline"
                  size={20}
                  color="black"
                />
              </View>
              <View>
                <Text className="text-sm">2</Text>
              </View>
            </View>
            <View className="flex-row items-center space-x-1">
              <View>
                <FontAwesome name="bathtub" size={14} color="black" />
              </View>
              <View>
                <Text className="text-sm">2</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export const HorizontalList = <T extends Motel>({
  headerTitle,
  data,
}: HorizontalListProps<T>) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const goDetails = (params: Motel) => navigation.navigate("Details", params);

  return (
    <View className="bg-white pt-3 pb-1 my-1">
      <View className="flex-row items-center justify-between px-2">
        <Text className="text-xl font-semibold">{headerTitle}</Text>
        <TouchableOpacity>
          <Text className="text-teal-500">Tất cả</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        horizontal
        scrollEventThrottle={32}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 15, paddingHorizontal: 5 }}
        ItemSeparatorComponent={() => <View style={{ paddingHorizontal: 5 }} />}
        keyExtractor={(item) => item.ID}
        renderItem={({ item }) => (
          <Item data={item} onPress={() => goDetails(item)} />
        )}
      />
    </View>
  );
};

const style = StyleSheet.create({
  cardItem: {
    width: global.screen.width * 0.6,
    ...styles.shadow,
    borderRadius: 10,
  },
  item: {
    width: global.screen.width * 0.6,
    height: global.screen.height * 0.2,
    // paddingVertical: 16,
    borderRadius: 10,
  },
  contentItem: {
    // backgroundColor: colors.green,
  },
});
