import { SearchResultItem, SearchResultList } from "@/components";
import { global, styles } from "@/utils/root.style";
import { Category } from "@/utils/type";
import { categories as categoriesMock, recommended } from "mocks";
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Animated,
} from "react-native";

interface CategoryScreenProps {}
interface BackdropProps {
  data: any[];
  scrollX: Animated.Value;
}

const SPACING = 10;
const ITEM_SIZE = global.screen.width * 0.72;
const ITEM_HEIGHT = global.screen.height * 0.2;
const SPACER_ITEM_SIZE = (global.screen.width - ITEM_SIZE) / 1.8;
const BACKDROP_HEIGHT = global.screen.height * 0.35;

const Backdrop = ({ data, scrollX }: BackdropProps) => {
  return (
    <View
      style={{
        height: BACKDROP_HEIGHT,
        width: global.screen.width,
        position: "absolute",
      }}
    >
      <FlatList
        data={data.reverse()}
        keyExtractor={(item) => item.ID + "-backdrop"}
        removeClippedSubviews={false}
        contentContainerStyle={{
          width: global.screen.width,
          height: BACKDROP_HEIGHT,
        }}
        renderItem={({ item, index }) => {
          if (!item.image) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, global.screen.width],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: "absolute",
                width: translateX,
                height: global.screen.height,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: global.screen.width,
                  height: BACKDROP_HEIGHT,
                  position: "absolute",
                }}
              />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export const CategoryScreen = (props: CategoryScreenProps) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    if (categoriesMock)
      setCategories([
        { ID: "LEFT_SPACER", image: "", name: "", motels: [] },
        ...categoriesMock,
        { ID: "RIGHT_SPACER", image: "", name: "", motels: [] },
      ]);
  }, []);
  return (
    <View style={[styles.screen, style.container]}>
      {/* Backrop */}
      <Backdrop data={categories} scrollX={scrollX} />
      {/* Categories scroll list */}
      <View style={{ marginTop: BACKDROP_HEIGHT / 2 }}>
        <Animated.FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled
          scrollEventThrottle={32}
          snapToInterval={ITEM_SIZE}
          data={categories}
          decelerationRate={0}
          bounces={false}
          keyExtractor={(item) => item.ID}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
            ];
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [0, -30, 0],
              extrapolate: "clamp",
            });

            if (item.ID === "LEFT_SPACER" || item.ID === "RIGHT_SPACER") {
              return <View style={{ width: SPACER_ITEM_SIZE }} />;
            }
            return (
              <View
                style={{
                  width: ITEM_SIZE,
                  paddingTop: SPACING * 2,
                  borderRadius: 10,
                }}
              >
                <Animated.View
                  style={{
                    marginHorizontal: SPACING * 2,
                    padding: SPACING / 2,
                    alignItems: "center",
                    transform: [{ translateY }],
                    // backgroundColor: "white",
                    borderRadius: 10,
                    ...styles.shadow,
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    width={global.screen.width * 0.6}
                    height={ITEM_HEIGHT}
                    style={[{ objectFit: "cover", borderRadius: 10 }]}
                  />
                </Animated.View>
              </View>
            );
          }}
          contentContainerStyle={{
            alignItems: "center",
            paddingVertical: 10,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { x: scrollX } },
              },
            ],
            { useNativeDriver: false }
          )}
        />
      </View>
      <View className="" style={{}}>
        <View className="px-2">
          <Text className="text-2xl">Filter:</Text>
        </View>
        <SearchResultList
          results={recommended}
          height={global.screen.height * 0.5}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
