import React from "react";
import { View, StyleSheet, Animated, Image, Text } from "react-native";
import { heightWindow, styles } from "@/utils/root.style";
import { Categories, NearbyYou, Recommended } from "@/components";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabParamList } from "@/navigators";
import { colors } from "@/utils/variables";
import { profile } from "mocks";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<TabParamList>>();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("transitionStart", (e: any) => {
      // Prevent default behavior
      e.preventDefault();
      navigation.setOptions({ headerTransparent: true, headerShown: false });
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      scrollEventThrottle={16}
    >
      <View style={[styles.screen]}>
        <Categories />
        <Recommended />
        <NearbyYou />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  logoContainer: {
    height: heightWindow / 1.5,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  auths: {
    flexGrow: 0,
    alignSelf: "center",
    gap: 20,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
