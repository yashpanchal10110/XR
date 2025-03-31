import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ImageListScreen from "../screens/image";
import DetailScreen from "../screens/detailsScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="checkout" component={Checkout} /> */}
      {/* <Stack.Screen name="coupon" component={CouponScreen} /> */}
      {/* <Stack.Screen name="selectDateAndTime" component={SelectDateAndTime} /> */}
      <Stack.Screen name="ImageListScreen" component={ImageListScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
