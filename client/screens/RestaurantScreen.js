import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ArrowLeft from "react-native-feather/lib/ArrowLeft.js";
import MapPin from "react-native-feather/lib/MapPin.js";
import Star from "react-native-feather/lib/Star.js";
import { useDispatch } from "react-redux";
import CartIcon from "../components/CartIcon";
import DishRow from "../components/DishRow";
import { urlFor } from "../sanity";
import { setRestaurant } from "../slices/RestaurantSlice";
import { themeColors } from "../theme";

export default function RestaurantScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const item = params ?? {};

  if (!item.name) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">No restaurant selected</Text>
      </View>
    );
  }

  const dispatch = useDispatch();
// console.log('restaurant: ', item);

useEffect(() => {
  if (item && item._id) {
    dispatch(setRestaurant({ ...item }));
  }
}, []);


  return (
    <View className="flex-1 bg-white">
      <CartIcon />
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View className="relative">
         <Image
  className="w-full h-72"
  source={{ uri: urlFor(item.image).url() }}
/>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-4 bg-white p-2 rounded-full shadow"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <ArrowLeft
              height={24}
              width={24}
              stroke={themeColors.text}
              strokeWidth={2.5}
            />
          </TouchableOpacity>
        </View>

        {/* Details */}
        <View
          style={{
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
          className="bg-white -mt-12 pt-6"
        >
          <View className="px-5">
            <Text className="text-3xl font-bold">{item.name}</Text>

            <View className="flex-row items-center flex-wrap mt-2 gap-x-2">
              <View className="flex-row items-center">
                <Star
                  height={14}
                  width={14}
                  stroke="orange"
                  fill="orange"
                  style={{ marginRight: 4 }}
                />
                <Text className="text-xs text-green-700 font-medium">
                  {item.rating}
                </Text>
                <Text className="text-xs text-gray-600">
                  {" "}
                  (5.1k reviews)
                </Text>
                <Text className="text-xs text-gray-600 font-semibold">
                  {" "}
                  · {item?.type?.name}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mt-1">
              <MapPin height={14} width={14} stroke="gray" />
              <Text className="text-gray-600 text-xs ml-1">
                Nearby · {item.address}
              </Text>
            </View>

            <Text className="text-gray-500 mt-3">{item.description}</Text>
          </View>

          {/* Menu */}
          <View className="pb-40 pt-2">
            <Text className="px-5 py-4 text-2xl font-bold">Menu</Text>
            {item.dishes?.map((dish, index) => (
              <DishRow item={dish} key={dish._id ?? index} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
