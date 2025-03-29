import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Checkout from "../screens/checkout";
import CouponScreen from "../screens/coupons";
import SelectDateAndTime from "../screens/selectDateAndTime";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="checkout" component={Checkout} />
      <Stack.Screen name="coupon" component={CouponScreen} />
      <Stack.Screen name="selectDateAndTime" component={SelectDateAndTime} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
