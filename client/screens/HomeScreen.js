import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import MapPin from "react-native-feather/lib/MapPin.js";
import Search from "react-native-feather/lib/Search.js";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from 'react';
import * as Icon from 'react-native-feather';
import { getFeaturedRestaurants } from '../api';
import Categories from "../components/categories";
import FeaturedRow from "../components/FeaturedRow";
import { themeColors } from "../theme";

export default function HomeScreen() {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getFeaturedRestaurants()
      .then((data) => {
        setFeaturedRestaurants(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        setError(err?.message ?? 'Failed to load restaurants')
        setFeaturedRestaurants([])
      })
      .finally(() => setLoading(false))
  }, [])
  return (

    <SafeAreaView className="bg-white flex-1">
      <StatusBar style="dark" />

      {/* search bar */}
      <View className="flex-row items-center space-x-2 px-4 pb-2 pt-4">
        <View className="flex-row flex-1 items-center p-2 rounded-full border border-gray-300">
          <Search height={25} width={25} stroke="gray" />
          <TextInput
            placeholder="Restaurants"
            className="ml-2 flex-1"
          />

          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-gray-300">
            <MapPin height={20} width={20} stroke="gray" />
            <Text className="text-gray-600"> New York, NYC </Text>
          </View>


        </View>
           <View style={{ backgroundColor: themeColors.bgColor(1) }} className="p-3 rounded-full ml-3">
            <Icon.Sliders height={20} width={20} strokeWidth={2.5} stroke="white" />
          </View>
      </View>

      {/* content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        className="bg-white"
      >
        {/* categories */}
        <Categories />

        {/* featured restaurants */}
        <View className="mt-4">
          {loading ? (
            <View className="mt-5 py-4 px-4">
              <Text className="text-gray-500 text-center">Loading...</Text>
            </View>
          ) : error ? (
            <View className="mt-5 py-4 px-4">
              <Text className="text-red-500 text-center">{error}</Text>
            </View>
          ) : (
            <View className="mt-5">
              {featuredRestaurants.map((item, index) => (
                <FeaturedRow
                  key={item._id ?? index}
                  title={item.name}
                  restaurants={item.restaurants}
                  description={item.description}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
