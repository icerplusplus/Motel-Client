import { Button, Input } from "@/components";
import { colors } from "@/utils/variables";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { InputRefProps } from "@/components/shared/Input";
import { TabParamList } from "@/navigators";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services";

interface RegisterProps {}

const RegisterScreen = (props: RegisterProps) => {
  const phoneNumber = React.useRef("");
  const focusInput = React.useRef<InputRefProps | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<TabParamList>>();
  const queryClient = useQueryClient()


   // Mutations
   const mutation = useMutation(authService.signup, {
     onSuccess: () => {
       // Invalidate and refetch
       queryClient.invalidateQueries('signup')
     },
   })

  const redirectToLogin = () => navigation.navigate("Login");

  // phone number change
  const phoneNumberChange = (value: string) => {
    phoneNumber.current = value;
  };

  // OTP Verification handler
  const otpVerificationHandler = React.useCallback(async () => {
    if (
      phoneNumber.current.length > 0 &&
      phoneNumber.current.length === 10 &&
      Number.isInteger(parseInt(phoneNumber.current))
    ) {

      const data = await mutation.mutateAsync(phoneNumber.current)
      console.log('register: ', data)
      // input is valid
      navigation.navigate("OTPVerification", {
        phoneNumber: phoneNumber.current,
      });
    }
      
  }, [phoneNumber.current]);

  

  // Layout effects
  React.useEffect(() => {
    if (focusInput) focusInput.current?.focus();
    return () => {
      focusInput.current?.clear();
      focusInput.current?.focus();
    };
  }, []);

  return (
    <View className="flex-1 flex-col px-4 py-6">
      <Text className="text-2xl text-slate-800 font-extrabold">
        Xác thực số điện thoại
      </Text>

      <Text className="mt-4 text-base text-slate-500">
        Chúng tôi sẽ gửi đến cho bạn{" "}
        <Text className="font-semibold text-slate-800">Mã OTP</Text> gồm 6 chữ
        số. Vui lòng không cung cấp mã OTP này đến bất cứ ai
      </Text>
      <View className="flex-col w-full 0">
        <Text className="mt-5 mb-2 text-base text-slate-500">
          Vui lòng nhập số điện thoại của bạn:
        </Text>
        <View className="flex-row items-center">
          <View className="flex-row items-center mr-2">
            <Text>+84</Text>
            <View className="rotate-90">
              <MaterialIcons name="arrow-right" size={24} color="black" />
            </View>
          </View>
          <View className="flex-1">
            <Input
              type="numeric"
              ref={focusInput}
              onChangeValue={phoneNumberChange}
              borderColorFocus={colors.teal}
              maxLength={10}
              placeholder="0389871000"
            />
          </View>
        </View>
      </View>
      <View className="flex-row gap-2 justify-end pt-5">
        <Text className="text-gray-500 italic">Đã có tài khoản?</Text>
        <TouchableOpacity onPress={redirectToLogin}>
          <Text className="text-teal-500 font-bold">Đăng nhập ngay</Text>
        </TouchableOpacity>
      </View>

      <View className="absolute p-4 bottom-0 left-0 right-0">
        <Button
          title="Nhận mã OTP"
          textSize={16}
          colors={colors.teal}
          onPress={otpVerificationHandler}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
