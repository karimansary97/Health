import AppStopWatch from "./components/AppStopWatch";
import Counter from "./components/Counter";
import DetailsScreen from "./screens/DetailsScreen";
import HomeScreen from "./screens/HomeScreen";
import Distance from "./components/Distance";
import AppNavigator from "./navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./navigation/navigationTheme";
import ListItem from "./components/ListItem";
import HistoryScreen from "./screens/HistoryScreen";
import TripNavigator from "./navigation/TripNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DataContext from "./hooks/context";
import { useEffect, useState } from "react";

const initialTrips = [
  {
    id: 1,
    title: "Demo Trip",
    distance: 200,
    steps: 100,
    time: "20:00",
    startPosition: {
      latitude: 30.005493,
      longitude: 31.477898,
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
    },
    endPosition: {
      latitude: 30.044281,
      longitude: 31.340002,
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
    },
  },
];
export default function App() {
  const [data, setData] = useState(initialTrips);

  const asyncGet = async () => {
    await AsyncStorage.getItem("storeTrips")
      .then((data) => {
        if (data !== null) setData(JSON.parse(data));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    asyncGet();
  }, []);
  return (
    <DataContext.Provider value={{ data, setData }}>
      <NavigationContainer theme={navigationTheme}>
        <AppNavigator />
      </NavigationContainer>
    </DataContext.Provider>
  );
}
