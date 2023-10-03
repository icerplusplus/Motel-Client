import { View, StyleSheet, Button, Text } from "react-native";
import React from "react";
import MapView, { Callout, Marker, Polyline } from "react-native-maps";
import { global } from "@/utils/root.style";
import { useLocation } from "@/hooks";
import MapViewDirections from "react-native-maps-directions";
import { googleMapApiKey } from "@/utils/variables";

interface MapProps {
  latitude: number;
  longitude: number;
  title?: string;
  description?: string;
}

export const MapScreen = (props: MapProps) => {
  const [destination, setDestination] = React.useState<MapProps>({ ...props });
  const [routeCoordinates, setRouteCoordinates] = React.useState([]);
  const [isRouting, setIsRouting] = React.useState(false);
  const { location, address, errorMsg } = useLocation();

  return (
    <View style={styles.container} className="px-2">
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: props.latitude,
          longitude: props.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && <Marker coordinate={location} title="Your location" />}
        {destination && (
          <Marker
            coordinate={destination}
            title={props.title}
            description={props.title}
          >
            <Callout tooltip>
              <View style={styles.bubble}>
                <View>
                  <Text>{props.title}</Text>
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </View>
            </Callout>
          </Marker>
        )}
        {/* {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={3}
            strokeColor="#3498db"
          />
        )} */}
        <MapViewDirections
          origin={location}
          destination={destination}
          apikey={googleMapApiKey}
        />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    width: (global.screen.width * 96) / 100,
    height: (global.screen.height * 30) / 100,
  },
  bubble: {},
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -12,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
});
