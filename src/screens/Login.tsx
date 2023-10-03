import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Input, Label } from "@/components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/utils/variables";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../navigators/StackNavigator";
import { TabParamList } from "@/navigators";

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<TabParamList>>();

  const redirectToRegister = () => navigation.navigate("Register");
  const redirectToHome = () => navigation.navigate("Home");

  return (
    <View style={style.container}>
      <View style={style.box}>
        {/* <Text className="text-2xl font-bold text-slate-700">Login</Text> */}
        <View style={style.form}>
          <Label title="Số điện thoại" />
          <View className="flex-row items-center">
            <View className="flex-row items-center mr-2">
              <Text className="">+84</Text>
              <View className="rotate-90">
                <MaterialIcons name="arrow-right" size={24} color="black" />
              </View>
            </View>
            <View className="flex-1">
              <Input
                keyboardType="numeric"
                borderColorFocus={colors.teal}
                maxLength={10}
                placeholder="0389871000"
              />
            </View>
          </View>
          <Label title="Mật khẩu" />
          <Input
            placeholder="Nhập mật khẩu"
            isPassword
            borderColorFocus={colors.teal}
          />
        </View>
        <Button
          title="Đăng nhập"
          colors={colors.teal}
          onPress={redirectToHome}
        />
        <View className="flex-row gap-2 justify-end">
          <Text className="text-gray-500/50 italic">Chưa có tài khoản?</Text>
          <TouchableOpacity onPress={redirectToRegister}>
            <Text className="text-teal-500 font-bold">Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    gap: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  form: {
    gap: 5,
  },
});
