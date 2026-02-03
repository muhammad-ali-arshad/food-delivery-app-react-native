import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { themeColors } from "../theme";
import RestaurantCard from "./resturantsCard";

export default function FeaturedRow({ title, description, restaurants }) {
  return (
    <View>
      {/* Header */}
      <View className="flex-row justify-between items-center px-4">
        <View>
          <Text className="font-bold text-lg">{title}</Text>
          <Text className="text-gray-500 text-xs mt-1">
            {description}
          </Text>
        </View>

        <TouchableOpacity>
          <Text
            style={{ color: themeColors.text }}
            className="font-semibold"
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Restaurants */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingVertical: 16,
        }}
        style={{ overflow: "visible" }}
        className="py-5"
      >
        {(restaurants ?? []).map((restaurant, index) => (
            <RestaurantCard
              item={restaurant}
              key={restaurant._id ?? index}
            />
          ))}
      </ScrollView>
    </View>
  );
}
