import { useEffect, useState } from "react";
import { Pedometer } from "expo-sensors";
export default useSteps = () => {
  const [step, setSteps] = useState(0);
  const [onStep, setOnStep] = useState(false);
  const getSteps = async () => {
    try {
      const { granted } = await Pedometer.requestPermissionsAsync();
      if (!granted) return;
    } catch (error) {
      console.log(error);
    }
  };

  const startCount = () => {
    const subSteps = Pedometer.watchStepCount((result) => {
      setSteps(result.steps);
      console.log("ss");
    });

    return subSteps;
  };
  const removeCount = () => {
    subSteps = startCount();
    setSteps(0);
    subSteps.remove();
  };

  useEffect(() => {
    getSteps();
  }, []);
  return { setSteps, step, startCount, removeCount, setOnStep };
};

/**const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
};*/
