import React from "react";
import Geolocation from "@react-native-community/geolocation";
import * as Location from "expo-location";
import { PlacesMapApi } from "@/utils/helper";

export interface LocationType {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: "auto",
});

export const useLocation = () => {
  const [location, setLocation] = React.useState<LocationType>({
    latitude: 10.690715,
    longitude: 107.19322,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [errorMsg, setErrorMsg] = React.useState<string>("");
  const [address, setAddress] = React.useState<
    Location.LocationGeocodedAddress[]
  >([]);

  const getPermissions = React.useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // Permission denied, handle this case
      return;
    } else {
      Geolocation.getCurrentPosition(
        async ({ coords }) => {
          const address = await Location.reverseGeocodeAsync(location);
          setAddress(address);
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        },
        (err) => {
          console.log("error: ", err);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  React.useEffect(() => {
    getPermissions();
  }, []);

  return { location, errorMsg, address };
};
