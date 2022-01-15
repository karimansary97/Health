import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import getDistance from "geolib/es/getDistance";

export default location = () => {
  const [distanceTravelled, setDistanceTravelled] = useState(1);
  const [prevLat, setPrevLat] = useState({});
  const [coordss, setCoors] = useState();
  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude);
      setCoors({ latitude, longitude });
    } catch (error) {
      console.log(error);
    }
  };

  const getRealLocation = async () => {
    try {
      await Location.watchPositionAsync(
        { distanceInterval: 10 },
        (position) => {
          const newLatLngs = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          if (distanceTravelled >= distanceTravelled) {
            setDistanceTravelled(
              distanceTravelled + Math.abs(calcDistance(newLatLngs))
            );
          }

          console.log(newLatLngs);

          setPrevLat(newLatLngs);
        }
      );
    } catch (error) {
      console.log("ss");
    }
  };

  calcDistance = (newLatLng) => {
    return getDistance(prevLat, newLatLng) || 0;
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    distanceTravelled,
    getRealLocation,
    setDistanceTravelled,
    getLocation,
    coordss,
  };
};
