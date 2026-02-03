import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MapPin from "react-native-feather/lib/MapPin.js";
import Star from "react-native-feather/lib/Star.js";
import { urlFor } from "../sanity";
import { themeColors } from "../theme";

// Helper function to truncate text to 15 characters
const truncateText = (text, maxLength = 15) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export default function RestaurantCard({ item }) {
  const navigation = useNavigation();

return (
  <TouchableWithoutFeedback
    onPress={() =>
      navigation.navigate("Restaurant", { ...item })
    }
  >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 24,
          shadowColor: themeColors.bgColor(1),
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.35,
          shadowRadius: 10,
          ...(Platform.OS === "android" && { elevation: 10 }),
        }}
        className="mr-6"
      >
       <Image
  className="h-36 w-64 rounded-t-3xl"
  source={{ uri: urlFor(item.image).url() }}
/>


        <View className="px-3 pb-4 space-y-2">
          <Text className="text-lg font-bold pt-2">
            {item.name}
          </Text>

<View className="flex-row items-center mb-2">
  <Star
    height={14}
    width={14}
    stroke="orange"
    fill="orange"
    className="mr-1"
  />

  <Text className="text-xs space-x-4">
    <Text className="text-green-700 "> {item.rating} </Text>
    <Text className="font-semibold"> ·  {item?.type?.name}</Text>
  </Text>
</View>

          <View className="flex-row items-center space-x-1">
            <MapPin height={15} width={15} stroke="gray" />
            <Text className="text-gray-700 text-xs mx-2" numberOfLines={1}>
              Nearby · {truncateText(item.address)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
