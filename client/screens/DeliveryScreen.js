import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import * as Icon from "react-native-feather";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../slices/CartSlice";
import { selectRestaurant } from "../slices/RestaurantSlice";
import { themeColors } from "../theme";

// Sanity schema: restaurant has lat (latitude) and lng (longitude)
const getLat = (r) => Number(r?.lat ?? r?.lng ?? 0);
const getLng = (r) => Number(r?.lng ?? r?.lat ?? 0);

const DEFAULT_DELTA = 0.012;

// Fallback region when restaurant has no coords (map must always have a region to show tiles)
const DEFAULT_REGION = {
  latitude: 40.7128,
  longitude: -74.006,
  latitudeDelta: DEFAULT_DELTA,
  longitudeDelta: DEFAULT_DELTA,
};

export default function DeliveryScreen() {
  const restaurant = useSelector(selectRestaurant)
  const navigation = useNavigation();
  const markerRef = React.useRef(null);
  const dispatch = useDispatch();

    const cancelOrder = () => {
      dispatch(emptyCart());
      navigation.navigate('Home');
    };


  const initialRegion = useMemo(() => {
    const latitude = getLat(restaurant);
    const longitude = getLng(restaurant);
    const hasCoords = latitude !== 0 && longitude !== 0 && !Number.isNaN(latitude) && !Number.isNaN(longitude);
    if (hasCoords) {
      return {
        latitude,
        longitude,
        latitudeDelta: DEFAULT_DELTA,
        longitudeDelta: DEFAULT_DELTA,
      };
    }
    return DEFAULT_REGION;
  }, [restaurant?.lat, restaurant?.lng, restaurant?._id]);

  const markerCoordinate = useMemo(() => {
    const lat = getLat(restaurant);
    const lng = getLng(restaurant);
    const hasCoords = lat !== 0 && lng !== 0 && !Number.isNaN(lat) && !Number.isNaN(lng);
    if (hasCoords) return { latitude: lat, longitude: lng };
    return { latitude: DEFAULT_REGION.latitude, longitude: DEFAULT_REGION.longitude };
  }, [restaurant?.lat, restaurant?.lng, restaurant?._id]);

  return (
    <View style={styles.container}>
      <View style={styles.mapWrapper}>
        <MapView
          style={styles.map}
          mapType="standard"
          initialRegion={initialRegion}
          mapPadding={{ top: 50, right: 50, bottom: 200, left: 50 }}
          onMapReady={() => {
            setTimeout(() => markerRef.current?.showCallout(), 500);
          }}
        >
          <Marker
            ref={markerRef}
            coordinate={markerCoordinate}
            pinColor={themeColors.bgColor(1)}
            title={restaurant?.name ?? "Restaurant"}
            description={restaurant?.address ?? ""}
          />
        </MapView>
      </View>
      <View style={styles.bottomCard}>
        <View className="flex-row justify-between px-5 pt-10">
          <View>
            <Text className="text-lg text-gray-700 font-semibold">
              Estimated Arrival
            </Text>
            <Text className="text-3xl font-extrabold text-gray-700">
              20–30 Minutes
            </Text>
            <Text className="mt-2 text-gray-700 font-semibold">
              Your order is on its way!
            </Text>
          </View>

          <Image
            className="w-24 h-24"
            source={require("../assets/images/bikeGuy2.gif")}
          />
        </View>

        {/* rider info */}
        <View
          style={{ backgroundColor: themeColors.bgColor(0.8) }}
          className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2"
        >
          <View
            className="p-1 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
          >
            <Image
              className="h-16 w-16 rounded-full"
              source={require("../assets/images/deliveryGuy.jpg")}
            />
          </View>

          <View className="flex-1 ml-3">
            <Text className="text-lg font-bold text-white">
              Mr ABC 
            </Text>
            <Text className="font-semibold text-white">
              Your Rider
            </Text>
          </View>

          <View className="flex-row items-center space-x-3 mr-3">
            <TouchableOpacity className="bg-white p-2 rounded-full mr-3">
              <Icon.Phone
                fill={themeColors.bgColor(1)}
                stroke={themeColors.bgColor(1)}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={cancelOrder}
              className="bg-white p-2 rounded-full"
            >
              <Icon.X stroke="red" strokeWidth={4} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}


const { width: SCREEN_WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapWrapper: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  bottomCard: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingBottom: 24,
  },
});