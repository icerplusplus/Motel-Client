import React from "react";
import {
  Chips,
  MapScreen,
  ReadMoreText,
  StarRating,
  Thumbnails,
} from "@/components";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { StackParamList } from "../navigators/StackNavigator";
import { global, styles } from "@/utils/root.style";
import { Motel } from "@/utils/type";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native-animatable";
import { colors } from "@/utils/variables";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { formatCurrencyWithoutSymbol } from "@/utils/helper";

type DetailsScreenRouteProp = RouteProp<StackParamList, "Details">;
type DescriptionProps = Motel;

interface FacilityProps {
  icon: React.ReactNode;
  quantity: number;
  name: string;
}

const Detail = () => {
  const { params } = useRoute<DetailsScreenRouteProp>();

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1" style={[styles.screen, style.container]}>
          <Thumbnails thumbnails={params.thumbnails} />
          <Description {...params} />
        </View>
      </ScrollView>
      {/* get it */}
      <View style={style.price}>
        <View>
          <Text className="text-xl text-white font-bold">
            {formatCurrencyWithoutSymbol(params.price)}
            <Text> {params.unitPrice} / Tháng</Text>
          </Text>
        </View>
        <View>
          <TouchableOpacity className="shadow bg-teal-600 px-4 py-3 rounded">
            <Text className="text-white">Đặt trước ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Description = (props: DescriptionProps) => {
  return (
    <View className="p-2 space-y-3">
      <View className="flex-row items-center mt-2">
        {/* chips */}
        <Chips chips={props.category} />
        {/* rating */}
        <View>
          <StarRating
            rating={props.rating}
            size={20}
            tintColor={colors.screen}
          />
        </View>
      </View>

      {/* main detail */}
      <View className="space-y-1">
        <Text className="text-2xl font-semibold">{props.title}</Text>
        <View className="flex-row item-center space-x-1">
          <Ionicons name="md-location-sharp" size={18} color="red" />
          <Text className="text-zinc-500">{props.address}</Text>
        </View>
      </View>

      {/* Facilities */}
      <View className="flex-col space-y-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg">Tiện ích</Text>
        </View>
        <ScrollView
          horizontal
          scrollEventThrottle={32}
          showsHorizontalScrollIndicator={false}
        >
          <View className="flex-row space-x-2">
            <View>
              <Facility
                key={"bed-room"}
                quantity={props.bedRoomQuantity}
                name="Phòng ngủ"
                icon={
                  <MaterialCommunityIcons
                    name="bed-king-outline"
                    size={22}
                    color="black"
                  />
                }
              />
            </View>
            <View>
              <Facility
                key={"bath-room"}
                quantity={props.bathRoomQuantity}
                name="Phòng tắm"
                icon={<FontAwesome name="bathtub" size={16} color="black" />}
              />
            </View>
            <View>
              <Facility
                key={"car-garage"}
                quantity={props.carGarageQuantity}
                name="Garage"
                icon={
                  <MaterialIcons name="pedal-bike" size={24} color="black" />
                }
              />
            </View>
            <View>
              <Facility
                key={"bath-room"}
                quantity={props.closeTime}
                name=": 00  PM"
                icon={
                  <Ionicons name="md-time-outline" size={22} color="black" />
                }
              />
            </View>
          </View>
        </ScrollView>
      </View>

      {/* owner */}
      <View className="flex-row items-center space-x-2">
        <View>
          <Image
            source={{ uri: props.owner.avatar }}
            style={style.ownerAvatar}
          />
        </View>
        <View className="flex-col flex-1">
          <View className="flex-row items-center gap-1">
            <Text className="text-base font-semibold">
              {props.owner.fullname}
            </Text>
            <View>
              <MaterialIcons name="verified" size={18} color={colors.teal} />
            </View>
          </View>
          <View>
            <Text className="text-zinc-500">{props.owner.email}</Text>
          </View>
        </View>
        <View className="flex-row space-x-2">
          <TouchableOpacity className=" bg-teal-500 w-10 h-10 p-2 rounded-full">
            <View className="w-full h-full items-center justify-center">
              <Ionicons name="chatbox-ellipses" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="bg-teal-500 w-10 h-10 p-2 rounded-full">
            <View className="w-full h-full items-center justify-center">
              <FontAwesome name="phone" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* description */}
      <View className="flex-col space-y-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg">Thông tin chi tiết</Text>
        </View>
        <View>
          <ReadMoreText text={props.description} maxLines={2} />
        </View>
      </View>

      {/* location */}
      <View className="flex-col space-y-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg">Vị trí</Text>
        </View>
        <View className="px-2">
          <MapScreen
            latitude={props.latitude}
            longitude={props.longtitude}
            title={props.title}
            description={props.address}
          />
        </View>
      </View>
    </View>
  );
};

const Facility = (props: FacilityProps) => {
  return (
    <View
      className="flex-col p-2 min-h-[64] border border-gray-200 rounded-md bg-transparent"
      // style={styles.shadow}
    >
      <View className="flex-1">{props.icon}</View>
      <View className="flex-row space-x-1">
        <Text>{props.quantity}</Text>
        <Text>{props.name}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: { paddingBottom: 70, backgroundColor: "white" },
  ownerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  price: {
    position: "absolute",
    width: global.screen.width,
    height: 70,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors["teal-300"],
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default Detail;
