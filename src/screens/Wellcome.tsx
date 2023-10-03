import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { global, heightWindow, styles } from "@/utils/root.style";
import * as Animatable from "react-native-animatable";
import { Button, Logo } from "@/components";
import { useLinkTo, useNavigation } from "@react-navigation/native";
import { colors } from "@/utils/variables";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Login";
import RegisterScreen from "./Register";
import OTPVerification from "./OTPVerification";
import { Ionicons } from "@expo/vector-icons";

export type WellcomeScreenParamList = {
  WellcomeScreen: undefined;
  Login: undefined;
  Register: undefined;
  OTPVerification: { phoneNumber: string };
};

const Stack = createNativeStackNavigator<WellcomeScreenParamList>();

export const WellcomeScreen = () => {
  const linkTo = useLinkTo();

  const redirectToLogin = () => linkTo("/Login");
  const redirectToRegister = () => linkTo("/Register");

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <View style={style.logoContainer}>
          <Logo />
          <Animatable.Text
            // animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            className="text-3xl font-bold text-rose-500"
          >
            Motels App
          </Animatable.Text>
        </View>
        <View style={style.auths}>
          <Text
            className="text-base text-center text-gray-500"
            style={style.description}
          >
            Với Motel App, việc tìm kiếm chỗ ở phù hợp chưa bao giờ dễ dàng hơn.
            Hãy đăng ký tài khoản ngay hôm nay để bắt đầu trải nghiệm.
          </Text>
          <Button
            title="Tạo tài khoản"
            onPress={redirectToRegister}
            textSize={16}
          />
          <View className="flex-1 flex-row gap-1 justify-center">
            <Text className="text-gray-500/50">Đã có tài khoản? </Text>
            <TouchableOpacity onPress={redirectToLogin}>
              <Text className="text-rose-500 font-bold">Đăng nhập ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  logoContainer: {
    height: heightWindow / 2,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  auths: {
    flexGrow: 0,
    alignSelf: "center",
    gap: 20,
    padding: 20,
  },
  description: {
    maxWidth: (global.screen.width * 90) / 100,
    marginBottom: 20,
  },
});
