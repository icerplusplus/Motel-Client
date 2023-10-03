import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Button, Input } from "@/components";
import { colors } from "@/utils/variables";
import { InputRefProps } from "@/components/shared/Input";
import { TabParamList } from "@/navigators";

interface Props {}
type OTPVerificationScreenParams = RouteProp<TabParamList, "OTPVerification">;

const OTPInputList = () => {
  const otpInputRef1 = React.useRef<InputRefProps | null>(null); // initial index = 0
  const otpInputRef2 = React.useRef<InputRefProps | null>(null); // initial index = 1
  const otpInputRef3 = React.useRef<InputRefProps | null>(null); // initial index = 2
  const otpInputRef4 = React.useRef<InputRefProps | null>(null); // initial index = 3
  const otpInputRef5 = React.useRef<InputRefProps | null>(null); // initial index = 4
  const otpInputRef6 = React.useRef<InputRefProps | null>(null); // initial index = 5

  React.useEffect(() => {
    if (otpInputRef1.current) {
      otpInputRef1.current.focus();
    }
  }, []);

  const nextInput = (
    nextInputRef: React.MutableRefObject<InputRefProps | null>
  ) => nextInputRef.current?.focus();

  const previousInput = React.useCallback(
    (previousInputRef: React.MutableRefObject<InputRefProps | null>) => {
      previousInputRef.current?.focus();
    },
    [
      otpInputRef1.current?.value,
      otpInputRef2.current?.value,
      otpInputRef3.current?.value,
      otpInputRef4.current?.value,
      otpInputRef5.current?.value,
      otpInputRef6.current?.value,
    ]
  );

  return (
    <View className="flex-row justify-around items-center mt-10 space-x-2 w-full">
      <Input
        ref={otpInputRef1}
        id="otp_input_1"
        type="numeric"
        autoFocus
        borderColorFocus={colors.teal}
        maxLength={1}
        onFinish={(status) => status && nextInput(otpInputRef2)}
        cursorColor={colors.teal}
      />
      <Input
        ref={otpInputRef2}
        id="otp_input_2"
        type="numeric"
        autoFocus
        borderColorFocus={colors.teal}
        maxLength={1}
        onFinish={(status) => status && nextInput(otpInputRef3)}
        cursorColor={colors.teal}
        onChangeValue={(value: string) =>
          value.length === 0 && previousInput(otpInputRef1)
        }
      />
      <Input
        ref={otpInputRef3}
        id="otp_input_3"
        type="numeric"
        autoFocus
        borderColorFocus={colors.teal}
        maxLength={1}
        cursorColor={colors.teal}
        onFinish={(status) => status && nextInput(otpInputRef4)}
        onChangeValue={(value: string) =>
          value.length === 0 && previousInput(otpInputRef2)
        }
      />
      <Input
        ref={otpInputRef4}
        id="otp_input_4"
        type="numeric"
        autoFocus
        borderColorFocus={colors.teal}
        maxLength={1}
        cursorColor={colors.teal}
        onFinish={(status) => status && nextInput(otpInputRef5)}
        onChangeValue={(value: string) =>
          value.length === 0 && previousInput(otpInputRef3)
        }
      />
      <Input
        ref={otpInputRef5}
        id="otp_input_5"
        type="numeric"
        autoFocus
        borderColorFocus={colors.teal}
        maxLength={1}
        cursorColor={colors.teal}
        onFinish={(status) => status && nextInput(otpInputRef6)}
        onChangeValue={(value: string) =>
          value.length === 0 && previousInput(otpInputRef4)
        }
      />
      <Input
        ref={otpInputRef6}
        id="otp_input_6"
        type="numeric"
        autoFocus
        borderColorFocus={colors.teal}
        maxLength={1}
        cursorColor={colors.teal}
        onChangeValue={(value: string) =>
          value.length === 0 && previousInput(otpInputRef5)
        }
      />
    </View>
  );
};

const OTPVerification = (props: Props) => {
  const { params } = useRoute<OTPVerificationScreenParams>();

  return (
    <View className="flex-1 items-center px-4 pt-4 bg-white">
      <Text className="text-2xl text-slate-800 font-extrabold">
        Xác minh bằng mã OTP
      </Text>
      <Text className="mt-4 text-base text-slate-500">
        Mã xác thực (OTP) đã được gửi qua{" "}
        <Text className="font-semibold text-slate-800">Tin nhắn</Text> của số:{" "}
      </Text>
      <Text className="w-full text-base items-center text-center font-semibold text-slate-800 ">
        +84{params.phoneNumber}
      </Text>

      <OTPInputList />

      <View className="flex-row mt-8">
        <Text className=" text-base text-slate-500">
          Không nhận được mã OTP?{" "}
        </Text>
        <TouchableOpacity>
          <Text className="text-base font-bold underline  text-slate-800">
            Gửi lại
          </Text>
        </TouchableOpacity>
      </View>
      <View className="absolute p-4 bottom-0 left-0 right-0">
        <Button
          title="Xác nhận"
          textSize={16}
          colors={colors.teal}
          // onPress={otpVerificationHandler}
        />
      </View>
    </View>
  );
};

export default OTPVerification;
