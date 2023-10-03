import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { formatPhoneNumber } from "@/utils/helper";
import { colors } from "@/utils/variables";
import { global, styles } from "@/utils/root.style";
import { Roles } from "@/utils/type";
import {
  AntDesign,
  Feather,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { profile } from "mocks";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabParamList } from "@/navigators";

interface ProfileScreenProps {}

const formatRoles = (_roles: Roles[]) => {
  let roles: string[] = [];
  _roles.forEach((role) => {
    if (role === Roles.RENTER) roles.push("Chủ cho thuê");
    else if (role === Roles.USER) roles.push("Người dùng");
    else roles.push("Quản trị viên");
  });

  if (roles.length === 0) {
    return "Người dùng";
  }
  return roles.join(", ");
};

export const ProfileScreen = (props: ProfileScreenProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<TabParamList>>();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white"
    >
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: global.screen.height * 0.35,
        }}
      >
        <Image
          source={{ uri: profile.avatar }}
          style={[StyleSheet.absoluteFillObject]}
          blurRadius={25}
        />
      </View>

      <View className="pt-10 px-4 pb-4 space-y-4">
        <View className="flex-row space-x-4">
          <View className="p-1 bg-white rounded-full" style={styles.shadow}>
            <Image
              source={{ uri: profile.avatar }}
              className="rounded-full"
              style={style.avatar}
            />
          </View>
          <View className="justify-center space-y-2">
            <Text numberOfLines={1} className="text-3xl text-white font-bold">
              {profile.fullname}
            </Text>
            <Text
              numberOfLines={1}
              className="text-base text-white font-semibold"
            >
              Vai trò: {formatRoles(profile.role)}
            </Text>
          </View>
        </View>
        <View className="space-y-2">
          <View className="flex-row items-center space-x-4">
            <Feather name="phone" size={18} color={colors.white} />
            <Text numberOfLines={1} className="text-white">
              {formatPhoneNumber(profile.phoneNumber)}
            </Text>
          </View>
          <View className="flex-row items-center space-x-4">
            <Fontisto name="email" size={20} color={colors.white} />
            <Text numberOfLines={1} className="text-white">
              {profile.email}
            </Text>
          </View>
        </View>
      </View>
      <View className="space-y-2 py-4">
        {/* <View className="flex-row items-center justify-between px-4">
          <Text className="text-xl font-semibold">Cài đặt</Text>
        </View> */}
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Posts")}
            className="flex-row items-center space-x-4 py-3 px-4 hover:bg-slate-500"
          >
            <MaterialCommunityIcons
              name="post-outline"
              size={24}
              color={colors.slate}
            />
            <View className="flex-1">
              <Text numberOfLines={1} className="text-base text-slate-700">
                Quản lý bài đăng
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={colors.slate}
            />
          </TouchableOpacity>
          {/* <Border /> */}
          <TouchableOpacity className="flex-row items-center space-x-4 py-3 px-4 hover:bg-slate-500">
            <Ionicons name="settings-outline" size={24} color={colors.slate} />
            <View className="flex-1">
              <Text numberOfLines={1} className="text-base text-slate-700">
                Thay đổi mật khẩu
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={colors.slate}
            />
          </TouchableOpacity>
          {/* <Border /> */}
          <TouchableOpacity className="flex-row items-center space-x-4 py-3 px-4 hover:bg-slate-500">
            <AntDesign name="logout" size={24} color={colors.slate} />
            <View className="flex-1">
              <Text numberOfLines={1} className="text-base text-slate-700">
                Đăng xuất
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
  },
});
