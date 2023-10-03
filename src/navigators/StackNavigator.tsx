import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Motel } from "@/utils/type";
import { TouchableOpacity } from "react-native";
import { TabNavigator } from "./TabNavigator";

export type StackParamList = {
  Home: undefined;
  // Wellcome: undefined;
  // Login: undefined;
  // Register: undefined;
  // OTPVerification: { phoneNumber: string };
  Details: Motel;
  // User: undefined;
  Profile: undefined;
};

// on screen parameters type

// type ProfileScreenProps = CompositeScreenProps<
//   BottomTabScreenProps<TabParamList, 'Profile'>,
//   CompositeScreenProps<
//     StackScreenProps<StackParamList>,
//     DrawerScreenProps<DrawerParamList>
//   >
// >;

// useNavigation
// const navigation = useNavigation<ProfileScreenNavigationProp>();

// useRoute
// const route = useRoute<ProfileScreenRouteProp>();

const Stack = createNativeStackNavigator<StackParamList>();

export const StackNavigator = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen
          name="Wellcome"
          component={WellcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerLeft: () => (
              <Ionicons name="menu-outline" size={24} color="black" />
            ),
            headerTitleAlign: "center",
            headerTitle: "Home",
            headerRight: () => (
              <Ionicons name="notifications-outline" size={24} color="black" />
            ),
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerLeft,
            headerRight,
            headerTitleAlign: "center",
            headerTitle: "",
            headerShadowVisible: false,
            headerTransparent: true,
            freezeOnBlur: true,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerLeft,
            headerTitleAlign: "center",
            headerTitle: "Đăng nhập",
            headerTintColor: colors.white,
            headerStyle: { backgroundColor: colors.teal },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerLeft,
            headerTitleAlign: "center",
            headerTintColor: colors.white,
            headerTitle: "Tạo tài khoản",
            navigationBarColor: colors.teal,
            headerStyle: { backgroundColor: colors.teal },
          }}
        />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerification}
          options={{
            headerLeft,
            headerTitleAlign: "center",
            headerTintColor: colors.white,
            headerTitle: "Tạo tài khoản",
            navigationBarColor: colors.teal,
            headerStyle: { backgroundColor: colors.teal },
          }}
        />
      </Stack.Navigator> */}
      <TabNavigator />
    </NavigationContainer>
  );
};
