import React from "react";
import { global, styles } from "@/utils/root.style";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Loading } from "../Loading";
import { recommended } from "mocks";
import { Motel } from "@/utils/type";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { StarRating } from "../StarRating";
import * as CustomHooks from "@uidotdev/usehooks";
import {
  PlacesMapApi,
  Prediction,
  formatCurrencyWithoutSymbol,
} from "@/utils/helper";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TextInputChangeEventData,
  NativeSyntheticEvent,
  TouchableOpacity,
} from "react-native";
import { colors } from "@/utils/variables";
import { Border } from "../Border";
import { useSearchContext } from "@/contexts";
import { useAppDispatch, useAppSelector } from "@/stores";
import {
  changeSearchInputFocus,
  changeSearchInputValueHandler,
  searchOnChangeHandler,
  searchStore,
} from "@/stores/search/search.slice";

interface Props {
  shouldScroll: boolean;
  setShouldScroll: (shouldScroll: boolean) => void;
}

interface SearchResultListProps {
  results: Motel[];
  width?: number;
  height?: number;
}
interface SearchResultItemProps {
  data: Motel;
  width?: number;
  height?: number;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  data,
  width,
  height,
}) => {
  return (
    <View
      className="flex-row space-x-2 bg-white"
      style={[style.searchItemContainer, { width, height }]}
    >
      {/* Image */}
      <View style={style.searchItem}>
        <Image
          source={{ uri: data.thumbnails[0] }}
          resizeMode="cover"
          style={style.searchItemImage}
        />
      </View>
      {/* Short description */}
      <View className="flex-1 my-2">
        <Text numberOfLines={1} className="text-lg w-[90%]">
          {data.title}
        </Text>
        <View className="flex-row item-center space-x-1">
          <View>
            <Ionicons name="md-location-sharp" size={18} color={"red"} />
          </View>
          <View className="w-[90%]">
            <Text numberOfLines={1} className="text-zinc-500 pr-2">
              {data.address}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center mt-1">
          <StarRating rating={data.rating} />
        </View>
        <View>
          <Text className="mt-2 font-semibold text-teal-500">
            {formatCurrencyWithoutSymbol(data.price)}
            <Text> {data.unitPrice} / Tháng</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export const SearchResultList: React.FC<SearchResultListProps> = ({
  results,
  width,
  height,
}) => {
  const [isFinding, setIsFinding] = React.useState<boolean>(false);

  return (
    <View
      className="z-20"
      style={[
        style.container,
        {
          width: width || global.screen.width,
          height: height || global.screen.height,
        },
      ]}
    >
      <View className="flex-col" style={style.autoCompletedContainer}>
        {isFinding ? (
          <Loading width={100} height={100} />
        ) : (
          // <ScrollView horizontal={true} scrollEnabled={false}>
          <FlatList
            data={results}
            keyExtractor={(item) => item.ID}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <SearchResultItem key={item.ID} data={item} />
            )}
            scrollEventThrottle={32}
            ItemSeparatorComponent={() => (
              <View style={{ paddingVertical: 3 }} />
            )}
            contentContainerStyle={{ padding: 10 }}
            style={{ width: global.screen.width }}
          />
          // </ScrollView>
        )}
      </View>
    </View>
  );
};

interface PlaceListProps {
  data: Prediction[];
}

interface PlaceItemProps {
  data: Prediction;
}

export const PlaceItem: React.FC<PlaceItemProps> = React.memo(({ data }) => {
  const dispatch = useAppDispatch();

  return (
    <TouchableOpacity
      className="flex-row items-center space-x-2 p-2 z-10"
      onPress={() =>
        dispatch(
          changeSearchInputValueHandler({
            searchValue: data.description,
            place_id: data.place_id,
          })
        )
      }
    >
      <Ionicons name="md-location-sharp" size={16} color="red" />
      <View style={{ width: global.screen.width * 0.85 }}>
        <Text numberOfLines={1}>{data.description}</Text>
      </View>
    </TouchableOpacity>
  );
});

export const PlaceList: React.FC<PlaceListProps> = React.memo(({ data }) => {
  if (data.length === 0) {
    return (
      <View
        className="mt-2 z-20"
        style={{
          height: global.screen.height * 0.5,
        }}
      >
        <Loading width={100} height={100} />
      </View>
    );
  }
  return (
    <View className="absolute z-20 mt-12" style={style.container}>
      <View
        className="flex-col rounded-lg"
        style={[
          style.autoCompletedContainer,
          {
            height: data.length === 0 ? 0 : "auto",
          },
        ]}
      >
        <ScrollView
          horizontal={true}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        >
          <FlatList
            data={data}
            keyExtractor={(item) => item.place_id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <PlaceItem key={item.place_id || index} data={item} />
            )}
            scrollEventThrottle={32}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  paddingVertical: 3,
                }}
              >
                <Border />
              </View>
            )}
            contentContainerStyle={{ paddingVertical: 5 }}
            style={{ width: global.screen.width }}
          />
        </ScrollView>
      </View>
    </View>
  );
});

export const Searchbar = React.memo(() => {
  const searchState = useAppSelector(searchStore);
  const dispatch = useAppDispatch();

  return (
    <View className="relative flex-1 flex-col px-2 mt-2">
      <View
        style={styles.shadow}
        className="flex-row items-center space-x-2 bg-transparent p-2 rounded-lg z-20"
      >
        {/* Searchbar */}
        <Feather name="search" size={22} color="gray" />
        <TextInput
          defaultValue={searchState.searchKey}
          className="flex-1 placeholder:text-slate-500"
          placeholder="Search proerty..."
          onFocus={(e) => dispatch(changeSearchInputFocus(true))}
          onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
            dispatch(searchOnChangeHandler(event.nativeEvent.text))
          }
        />
        <Ionicons name="options-outline" size={22} color="gray" />
      </View>
      {searchState.inputIsFocus &&
        searchState.places &&
        searchState.places?.length > 0 && (
          <PlaceList data={searchState.places} />
        )}
    </View>
  );
});

const style = StyleSheet.create({
  container: {
    width: global.screen.width,
    backgroundColor: "transparent",
  },
  autoCompletedContainer: {
    zIndex: 10,
    // marginHorizontal: 10,
    backgroundColor: "white",
  },

  searchItemContainer: {
    borderRadius: 5,
    ...styles.shadow,
  },
  searchItem: {
    // width: 64,
    // height: 64,
    padding: 5,
  },
  searchItemImage: {
    width: 120,
    height: 100,
    objectFit: "cover",
    borderRadius: 5,
  },
});
