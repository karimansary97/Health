import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HistoryScreen from "../screens/HistoryScreen";
import DetailsScreen from "../screens/DetailsScreen";

const Stack = createStackNavigator();

const TripNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="History" component={HistoryScreen} />
    <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
  </Stack.Navigator>
);

export default TripNavigator;
