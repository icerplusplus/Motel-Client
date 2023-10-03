import { Button } from "@/components";
import { TabParamList } from "@/navigators";
import { formatCurrencyWithoutSymbol } from "@/utils/helper";
import { global, styles } from "@/utils/root.style";
import { Motel } from "@/utils/type";
import { colors } from "@/utils/variables";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { recommended } from "mocks";
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
} from "react-native";
import { AnimatedFAB, TextInput, TouchableRipple } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface PostScreenProps {}
interface PostItemProps extends Motel {}

const isIOS = Platform.OS === "ios";

const PostItem = (props: PostItemProps) => {
  return (
    <View style={postItemStyles.container}>
      <View className="">
        <Image
          source={{ uri: props.thumbnails[0] }}
          style={postItemStyles.image}
          resizeMode="cover"
          className="rounded-md"
        />
      </View>
      <View className="mt-2">
        <Text
          className="text-lg text-slate-800 font-bold w-3/4"
          numberOfLines={1}
        >
          {props.title}
        </Text>
      </View>
      <View className="flex-row justify-between">
        <View className="flex-row items-center w-1/2">
          <Ionicons
            name="md-location-sharp"
            size={22}
            color={colors["gray-300"]}
          />
          <View>
            <Text numberOfLines={1} className="text-zinc-500 text-sm">
              {props.address}
            </Text>
          </View>
        </View>
        <View>
          <Text className="">
            <Text className="text-lg font-bold">
              {formatCurrencyWithoutSymbol(props.price)}
            </Text>{" "}
            / {props.unitPrice}
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <TouchableRipple
          style={postItemStyles.button}
          className="border border-gray-300 px-4 py-2 rounded"
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-slate-500 font-bold text-base">
              Xem chi tiết
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={colors.black}
            />
          </View>
        </TouchableRipple>
        <TouchableRipple style={postItemStyles.button}>
          <View className="bg-blue-500 items-center px-4 py-2 rounded">
            <Text className="text-white font-bold text-base">Cập nhật</Text>
          </View>
        </TouchableRipple>
      </View>
    </View>
  );
};

const postItemStyles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    ...styles.shadow,
  },
  image: {
    height: global.screen.height * 0.25,
  },
  button: { width: global.screen.width * 0.4 },
});

export const PostsScreen = (props: PostScreenProps) => {
  const [isExtended, setIsExtended] = React.useState(true);

  const navigation = useNavigation<NativeStackNavigationProp<TabParamList>>();

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  return (
    <View style={style.container}>
      <ScrollView onScroll={onScroll}>
        <View className="p-2 space-y-2">
          <View>
            <PostItem {...recommended[0]} />
          </View>
          <View>
            <PostItem {...recommended[0]} />
          </View>
          <View>
            <PostItem {...recommended[0]} />
          </View>
          <View>
            <PostItem {...recommended[0]} />
          </View>
          <View>
            <PostItem {...recommended[0]} />
          </View>
          <View>
            <PostItem {...recommended[0]} />
          </View>
        </View>
      </ScrollView>
      <AnimatedFAB
        icon={"plus"}
        label={"Thêm bài viết"}
        extended={isExtended}
        onPress={() => navigation.navigate("CreatePostInStepOne")}
        // visible={visible}
        animateFrom={"right"}
        iconMode={"dynamic"}
        style={[style.fabStyle]}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    // backgroundColor: "white",
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});
