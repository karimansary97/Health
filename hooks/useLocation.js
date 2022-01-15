import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default useLocation = () => {
  const [location, setLocation] = useState();
  const deltaLocation = { latitudeDelta: 0.01, longitudeDelta: 0.01 };
  const totalLocation = { ...location, ...deltaLocation };
  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude);
      setLocation({ latitude, longitude });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);
  return location, totalLocation;
};
const [position, setPosition] = useState({
  start: {
    latitude: 30.005493,
    longitude: 31.477898,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  },
  end: {
    latitude: 30.044281,
    longitude: 31.340002,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  },
});
const { start, end } = position;
