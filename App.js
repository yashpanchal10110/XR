import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import AppNavigator from "./src/navigation/navigations";
import "./global.css"
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
