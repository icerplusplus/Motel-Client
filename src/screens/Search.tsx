import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Animated,
  Platform,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import {
  HorizontalList,
  Loading,
  SearchResultItem,
  Searchbar,
  StarRating,
} from "@/components";
import { LocationType, useLocation } from "@/hooks";
import { global, styles } from "@/utils/root.style";
import MapView, {
  Callout,
  Marker,
  MarkerPressEvent,
  PROVIDER_GOOGLE,
} from "react-native-maps";

import { MarkerIcon } from "@/utils/variables";
import { SearchProvider, useSearchContext } from "@/contexts";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { motelService } from "@/services";
import { Motel } from "@/utils/type";
import { useAppDispatch, useAppSelector } from "@/stores";
import {
  getLocation,
  saveMotels,
  searchPlaces,
  searchStore,
} from "@/stores/search/search.slice";

import * as CustomHooks from "@uidotdev/usehooks";
import { recommended } from "mocks";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { formatCurrencyWithoutSymbol } from "@/utils/helper";

interface SearchScreenProps {}

const CARD_HEIGHT = 110;
const CARD_WIDTH = global.screen.width * 0.8;
const SPACING_FOR_CARD_INSET = global.screen.width * 0.1 - 10;

export const ResultSearcher = () => {
  return;
};

// region: {
//   latitude: 22.62938671242907,
//   longitude: 88.4354486029795,
//   latitudeDelta: 0.04864195044303443,
//   longitudeDelta: 0.040142817690068,
// }

export const SearchScreen = (props: SearchScreenProps) => {
  const searchState = useAppSelector(searchStore);
  const dispatch = useAppDispatch();
  const debouncedSearch = CustomHooks.useDebounce(searchState.searchKey, 500);
  const { location } = useLocation();

  // refferences
  const _map = React.useRef<any>(undefined);
  const _scrollView = React.useRef<any>(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const mapIndex = React.useRef<number>(0);

  // use react query
  const queryClient = useQueryClient();

  const { mutate: fetchMotelByLocation, data } = useMutation({
    mutationFn: motelService.findByLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["find_motels_by_location"] });
    },
  });

  const onMarkerPress = (index: number) => {
    let x = index * CARD_WIDTH + index * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }
    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  React.useEffect(() => {
    scrollX.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= searchState.motels.length) {
        index = searchState.motels.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      const regionTimeout = setTimeout(() => {
        if (mapIndex.current !== index) {
          mapIndex.current = index;
          const { latitude, longtitude } = searchState.motels[index];
          _map.current.animateToRegion(
            {
              latitude,
              longtitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            350
          );
        }
      }, 10);

      clearTimeout(regionTimeout);
    });
  });

  React.useEffect(() => {
    debouncedSearch && dispatch(searchPlaces(debouncedSearch));
  }, [debouncedSearch]);

  React.useEffect(() => {
    searchState?.placeSeleted &&
      dispatch(getLocation(searchState.placeSeleted));
  }, [searchState.placeSeleted]);

  // fetch data
  React.useEffect(() => {
    if (!searchState.locationHasBeenSearch) {
      if (location.latitude && location.longitude) {
        console.log("find by api: ", location);
        fetchMotelByLocation({
          latitude: location?.latitude,
          longitude: location?.longitude,
        });
      }
    } else {
      fetchMotelByLocation({
        latitude: searchState.locationHasBeenSearch?.latitude,
        longitude: searchState.locationHasBeenSearch?.longitude,
      });
      _map.current.animateToRegion(searchState.locationHasBeenSearch, 350);
    }
  }, [location, searchState.locationHasBeenSearch]);

  React.useEffect(() => {
    if (data) {
      dispatch(saveMotels(data));
    }
  }, [data]);

  if (!location) return <Loading />;

  return (
    <SearchProvider>
      <View style={[styles.screen, style.container]}>
        <MapView
          ref={_map}
          initialRegion={location}
          style={style.mapSearch}
          provider={PROVIDER_GOOGLE}
        >
          {/* Location of user or user finding by searchbar */}
          {searchState.locationHasBeenSearch && (
            <Marker
              key="user-marker"
              coordinate={{
                latitude: searchState.locationHasBeenSearch.latitude,
                longitude: searchState.locationHasBeenSearch.longitude,
              }}
              // onPress={(e) => onMarkerPress(index)}
            >
              <Animated.View style={[style.markerWrap]}>
                <Animated.Image
                  source={MarkerIcon}
                  style={[style.marker]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          )}

          {/* Marker list */}
          {searchState.motels.length > 0 &&
            searchState.motels.map((marker, index) => {
              const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                (index + 1) * CARD_WIDTH,
              ];
              const width = scrollX.interpolate({
                inputRange,
                outputRange: [24, 48, 24],
                extrapolate: "clamp",
              });

              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longtitude,
                  }}
                  onPress={(e) => onMarkerPress(index)}
                >
                  <Animated.View style={[style.markerWrap]}>
                    <Animated.Image
                      source={MarkerIcon}
                      style={[style.marker, { width, height: width }]}
                      resizeMode="cover"
                    />
                  </Animated.View>
                </Marker>
              );
            })}
        </MapView>
        <Searchbar />

        <Animated.ScrollView
          ref={_scrollView}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 30}
          snapToAlignment="center"
          style={style.scrollView}
          bounces={true}
          contentInset={{
            // iOS only
            top: 0,
            left: 0,
            bottom: 0,
            right: 20,
          }}
          contentContainerStyle={{
            paddingHorizontal:
              Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
          }}
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
        >
          {searchState.motels.map((marker, index) => (
            <TouchableOpacity key={index} style={style.card}>
              <SearchResultItem
                data={marker}
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
              />
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </View>
    </SearchProvider>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  mapSearch: {
    position: "absolute",
    width: global.screen.width,
    height: global.screen.height,
  },

  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: global.screen.width - CARD_WIDTH,
  },

  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
