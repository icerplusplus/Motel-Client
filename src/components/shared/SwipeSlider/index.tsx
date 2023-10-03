import { global } from "@/utils/root.style";
import { colors } from "@/utils/variables";
import { details } from "mocks";
import React from "react";
import { View, Animated, Image, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

interface SwipeSliderProps {
  data: string[];
}

interface IndicatorProps<T> {
  scrollX: Animated.Value;
  data: T[];
}

export const SwipeSlider: React.FC<SwipeSliderProps> = ({ data }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={style.container}>
      <Animated.FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        data={data}
        keyExtractor={(_, index) => "thumbnail-" + index}
        renderItem={({ item, index }) => (
          <View key={"thumnbail-" + index}>
            <Image
              source={{ uri: item }}
              style={style.image}
              resizeMode="cover"
            />
          </View>
        )}
      />
      <Indicator scrollX={scrollX} data={data} />
    </View>
  );
};

const Indicator = <T,>({ scrollX, data }: IndicatorProps<T>) => {
  return (
    <View style={style.indicatorContainer}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * global.screen.width,
          index * global.screen.width,
          (index + 1) * global.screen.width,
        ];

        const width = scrollX.interpolate({
          inputRange,
          outputRange: [10, 15, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: "clamp",
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [colors.white, colors.teal, colors.white],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={`indicator-${index}`}
            style={[style.indicatorItem, { width, backgroundColor, opacity }]}
          />
        );
      })}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    position: "relative",
  },
  image: {
    width: global.screen.width,
    height: (global.screen.height * 35) / 100,
  },
  indicatorContainer: {
    position: "absolute",
    flexDirection: "row",
    width: global.screen.width,
    gap: 8,
    justifyContent: "center",
    bottom: 10,
  },
  indicatorItem: {
    width: 8,
    height: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
