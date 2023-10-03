import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppSelector } from "@/stores";
import { isNewbie } from "@/stores/newbie/newbie.slice";
import { colors } from "@/utils/variables";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import {
  CategoryScreen,
  CreatePostInStepOne,
  CreatePostInStepTree,
  CreatePostInStepTwo,
  DetailsScreen,
  HomeScreen,
  LoginScreen,
  OTPVerification,
  PostsScreen,
  ProfileScreen,
  RegisterScreen,
  SearchScreen,
  WellcomeScreen,
} from "@/screens";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Image, Text, StyleSheet } from "react-native";
import { profile } from "mocks";

interface TabNavigatorProps {}

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  PostRoom: undefined;
  Chat: undefined;
  Wellcome: undefined;
  Login: undefined;
  Register: undefined;
  Details: { ID: string };
  OTPVerification: { phoneNumber: string };
  Profile: undefined;
  Category: { ID: string };
  Posts: undefined;
  CreatePostInStepOne: undefined;
  CreatePostInStepTwo: undefined;
  CreatePostInStepTree: undefined;
  EditPost: { ID: string };
};

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = (props: TabNavigatorProps) => {
  const checkNewbie = useAppSelector(isNewbie);
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={checkNewbie ? "Wellcome" : "Home"}
        screenOptions={{
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerLeftContainerStyle: {
              marginLeft: 10,
            },
            headerLeft: HomeHeaderLeft,
            headerTitleAlign: "center",
            headerTitle: "",
            tabBarLabel: "Trang chủ",
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    borderRadius: 9999,
                    padding: 1,
                    alignItems: "center",
                    top: 0,
                    right: 0,
                  }}
                >
                  <View
                    style={{
                      width: 9,
                      height: 9,
                      backgroundColor: colors.rose,
                      borderRadius: 9999,
                    }}
                  />
                </View>
              </View>
            ),
            headerShadowVisible: false,
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                name={`${focused ? "home" : "home-outline"}`}
                size={size}
                color={color}
              />
            ),
            headerBackgroundContainerStyle: {
              height: 90,
            },
          }}
        />
        <Tab.Screen
          name="Category"
          component={CategoryScreen}
          options={{
            headerLeftContainerStyle: {
              marginLeft: 10,
            },
            headerTitleAlign: "center",
            headerTitle: "Thể loại",
            headerLeft: () => <HeaderLeft iconColor="black" />,
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    borderRadius: 9999,
                    padding: 1,
                    alignItems: "center",
                    top: 0,
                    right: 0,
                  }}
                >
                  <View
                    style={{
                      width: 9,
                      height: 9,
                      backgroundColor: colors.rose,
                      borderRadius: 9999,
                    }}
                  />
                </View>
              </View>
            ),
            headerTransparent: true,
            headerShadowVisible: false,
            tabBarStyle: { display: "none" },
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            headerLeftContainerStyle: {
              marginLeft: 10,
            },
            headerTitleAlign: "center",
            headerTitle: "Bài đăng",
            headerLeft: () => (
              <HeaderLeft iconColor="black" routeName="Profile" />
            ),
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    borderRadius: 9999,
                    padding: 1,
                    alignItems: "center",
                    top: 0,
                    right: 0,
                  }}
                >
                  <View
                    style={{
                      width: 9,
                      height: 9,
                      backgroundColor: colors.rose,
                      borderRadius: 9999,
                    }}
                  />
                </View>
              </View>
            ),
            headerShadowVisible: false,
            tabBarStyle: { display: "none" },
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name="CreatePostInStepOne"
          component={CreatePostInStepOne}
          options={{
            headerLeftContainerStyle: {
              marginLeft: 10,
            },
            headerTitleAlign: "center",
            headerTitle: "Bài đăng",
            headerLeft: () => (
              <HeaderLeft iconColor="black" routeName="Posts" />
            ),
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    borderRadius: 9999,
                    padding: 1,
                    alignItems: "center",
                    top: 0,
                    right: 0,
                  }}
                >
                  <View
                    style={{
                      width: 9,
                      height: 9,
                      backgroundColor: colors.rose,
                      borderRadius: 9999,
                    }}
                  />
                </View>
              </View>
            ),
            headerShadowVisible: false,
            tabBarStyle: { display: "none" },
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name="CreatePostInStepTwo"
          component={CreatePostInStepTwo}
          options={{
            headerLeftContainerStyle: {
              marginLeft: 10,
            },
            headerTitleAlign: "center",
            headerTitle: "Bài đăng",
            headerLeft: () => (
              <HeaderLeft iconColor="black" routeName="CreatePostInStepOne" />
            ),
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    borderRadius: 9999,
                    padding: 1,
                    alignItems: "center",
                    top: 0,
                    right: 0,
                  }}
                >
                  <View
                    style={{
                      width: 9,
                      height: 9,
                      backgroundColor: colors.rose,
                      borderRadius: 9999,
                    }}
                  />
                </View>
              </View>
            ),
            headerShadowVisible: false,
            tabBarStyle: { display: "none" },
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name="CreatePostInStepTree"
          component={CreatePostInStepTree}
          options={{
            headerLeftContainerStyle: {
              marginLeft: 10,
            },
            headerTitleAlign: "center",
            headerTitle: "Bài đăng",
            headerLeft: () => (
              <HeaderLeft iconColor="black" routeName="CreatePostInStepTwo" />
            ),
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    borderRadius: 9999,
                    padding: 1,
                    alignItems: "center",
                    top: 0,
                    right: 0,
                  }}
                >
                  <View
                    style={{
                      width: 9,
                      height: 9,
                      backgroundColor: colors.rose,
                      borderRadius: 9999,
                    }}
                  />
                </View>
              </View>
            ),
            headerShadowVisible: false,
            tabBarStyle: { display: "none" },
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                name={`${focused ? "search" : "search-outline"}`}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={SearchScreen}
          options={{
            headerLeftContainerStyle: {
              marginLeft: 10,
            },
            headerLeft: () => (
              <Ionicons name="menu-outline" size={24} color="black" />
            ),
            headerTitleAlign: "center",
            headerTitle: "Tin nhắn",
            tabBarLabel: "Tin nhắn",
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
              </View>
            ),
            headerShadowVisible: false,
            tabBarIcon: ({ color, focused, size }) => (
              <MaterialCommunityIcons
                name={`${
                  focused ? "message-processing" : "message-processing-outline"
                }`}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Wellcome"
          component={WellcomeScreen}
          options={{
            headerShown: false,
            tabBarStyle: { display: "none" },
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerLeftContainerStyle: {
              marginLeft: 10,
            },
            headerLeft: () => <HeaderLeft />,
            headerRight: HeaderRight,
            headerTitleAlign: "center",
            headerTitle: "",
            headerShadowVisible: false,
            headerTransparent: true,
            freezeOnBlur: true,
            tabBarStyle: { display: "none" },
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitleAlign: "center",
            headerTitle: "Đăng nhập",
            headerTintColor: colors.white,
            headerStyle: { backgroundColor: colors.teal },
            tabBarStyle: { display: "none" },
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerTitleAlign: "center",
            headerTintColor: colors.white,
            headerTitle: "Tạo tài khoản",
            headerStyle: { backgroundColor: colors.teal },
            tabBarStyle: { display: "none" },
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name="OTPVerification"
          component={OTPVerification}
          options={{
            headerLeft: () => <HeaderLeft routeName="Register" />,
            headerTitleAlign: "center",
            headerTintColor: colors.white,
            headerTitle: "Tạo tài khoản",
            headerStyle: { backgroundColor: colors.teal },
            tabBarStyle: { display: "none" },
            tabBarItemStyle: { display: "none" },
            headerLeftContainerStyle: {
              marginLeft: 10,
            },
            headerRightContainerStyle: {
              marginRight: 10,
            },
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, focused, size }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
            // headerStyle: { backgroundColor: colors.teal },
            headerTitleAlign: "center",
            headerTitle: "",
            tabBarLabel: "Tài khoản",
            headerLeftContainerStyle: {
              marginLeft: 10,
            },
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

interface HeaderLeftProps {
  iconColor?: string;
  iconSize?: number;
  routeName?: any;
}

export const HeaderLeft = ({
  iconColor = "white",
  iconSize = 22,
  routeName,
}: HeaderLeftProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<TabParamList>>();

  const onPress = () => {
    if (!routeName) navigation.goBack();
    else navigation.navigate(routeName);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="arrow-back-outline" size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

export const HeaderRight = () => {
  return (
    <TouchableOpacity style={{ marginRight: 10 }}>
      <Ionicons name="heart-outline" size={22} color="white" />
    </TouchableOpacity>
  );
};

export const HomeHeaderLeft = () => {
  return (
    <View style={styles.headerLeftContainer}>
      <View>
        <Image
          source={{ uri: profile.avatar }}
          width={48}
          height={48}
          style={styles.avatar}
        />
        <View
          style={{
            position: "absolute",
            backgroundColor: "white",
            borderRadius: 9999,
            padding: 2,
            alignItems: "center",
            top: 2,
            right: 0,
          }}
        >
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: colors.teal,
              borderRadius: 9999,
            }}
          />
        </View>
      </View>
      <View>
        <Text style={styles.title}>Xin chào</Text>
        <Text style={styles.fullname}>{profile.fullname}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: "row",
    gap: 10,
    paddingTop: 10,
  },
  avatar: {
    borderRadius: 9999,
  },
  title: {
    fontWeight: "600",
    color: colors.slate,
    fontSize: 16,
  },
  fullname: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
