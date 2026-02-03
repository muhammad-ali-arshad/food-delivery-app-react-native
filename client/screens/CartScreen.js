import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowLeft from 'react-native-feather/lib/ArrowLeft';
import Minus from 'react-native-feather/lib/Minus';
import Truck from 'react-native-feather/lib/Truck';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { urlFor } from '../sanity';
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from '../slices/CartSlice';
import { selectRestaurant } from '../slices/RestaurantSlice';
import { themeColors } from '../theme';

export default function CartScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const restaurant = useSelector(selectRestaurant);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const [groupedItems, setGroupedItems] = useState({});
  const deliveryFee = 2;

  // ✅ Group items by _id
  useEffect(() => {
    const items = cartItems.reduce((group, item) => {
      const id = item._id;

      if (group[id]) {
        group[id].push(item);
      } else {
        group[id] = [item];
      }

      return group;
    }, {});

    setGroupedItems(items);
  }, [cartItems]);

  // ✅ Go back if cart empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigation.goBack();
    }
  }, [cartItems.length, navigation]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="relative py-4 border-b border-gray-100">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="absolute z-10 rounded-full p-2 left-4 top-4"
        >
          <ArrowLeft height={22} width={22} stroke="white" strokeWidth={2.5} />
        </TouchableOpacity>

        <View className="items-center px-12">
          <Text className="font-bold text-xl">Your Cart</Text>
          <Text className="text-gray-500">{restaurant?.name ?? '—'}</Text>
        </View>
      </View>

      {/* Delivery */}
      <View
        style={{ backgroundColor: themeColors.bgColor(0.15) }}
        className="flex-row items-center px-4 py-4"
      >
        <View
          className="w-14 h-14 rounded-full items-center justify-center"
          style={{ backgroundColor: themeColors.bgColor(0.3) }}
        >
          <Truck height={28} width={28} stroke={themeColors.text} strokeWidth={2} />
        </View>

        <Text className="flex-1 pl-4 text-gray-700 font-medium">
          Deliver in 20–30 min
        </Text>

        <TouchableOpacity>
          <Text className="font-bold" style={{ color: themeColors.text }}>
            Change
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        className="flex-1 pt-4"
      >
        {Object.entries(groupedItems).map(([key, items]) => {
          const dish = items[0];

          return (
            <View
              key={key}
              className="flex-row items-center py-3 px-4 mx-3 mb-2 rounded-2xl bg-gray-50"
              style={
                Platform.OS === 'ios'
                  ? {
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.06,
                      shadowRadius: 4,
                    }
                  : { elevation: 2 }
              }
            >
              <Text
                className="font-bold mr-2"
                style={{ color: themeColors.text, minWidth: 32 }}
              >
                {items.length} ×
              </Text>

              <Image
                className="h-14 w-14 rounded-full"
                source={{ uri: urlFor(dish.image).url() }}
              />

              <Text
                className="flex-1 font-semibold text-gray-800 ml-3"
                numberOfLines={1}
              >
                {dish.name}
              </Text>

              <Text className="font-semibold text-base text-gray-700 mr-2">
                ${dish.price}
              </Text>

              <TouchableOpacity
                className="p-1.5 rounded-full"
                style={{ backgroundColor: themeColors.bgColor(1) }}
                onPress={() => dispatch(removeFromCart({ id: dish._id }))}
              >
                <Minus height={18} width={18} stroke="white" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* Totals */}
      {cartItems.length > 0 && (
        <View
          style={{ backgroundColor: themeColors.bgColor(0.15) }}
          className="p-5 px-6 rounded-t-3xl"
        >
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Subtotal</Text>
            <Text className="text-gray-700 font-medium">${cartTotal}</Text>
          </View>

          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600">Delivery fee</Text>
            <Text className="text-gray-700 font-medium">${deliveryFee}</Text>
          </View>

          <View className="flex-row justify-between mb-4">
            <Text className="text-gray-800 font-extrabold text-lg">Total</Text>
            <Text className="text-gray-800 font-extrabold text-lg">
              ${deliveryFee + cartTotal}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('OrderPrepairing')}
            style={{ backgroundColor: themeColors.bgColor(1) }}
            className="py-3 rounded-full"
          >
            <Text className="text-white text-center font-bold text-lg">
              Place order
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
