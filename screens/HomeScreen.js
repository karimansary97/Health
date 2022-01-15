import React, { useContext, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import Counter from "../components/Counter";
import Screen from "../components/Screen";
import AppStopWatch from "../components/AppStopWatch";
import useSteps from "../hooks/useSteps";
import DataContext from "../hooks/context";
import location from "../hooks/location";
function HomeScreen({ navigation }) {
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [time, setTime] = useState();
  const [changeTextStop, setChangeTextStop] = useState("stop");
  const [changeTextStart, setChangeTextStart] = useState("start");
  const [changeColor, setChangeColor] = useState("red");
  const [enableStopBt, setEnableStopBt] = useState(true);
  const [startPosition, setStartPosition] = useState();
  const [lastPosition, setLastPosition] = useState({});

  const { data, setData } = useContext(DataContext);
  const { startCount, step, removeCount, setSteps } = useSteps();
  const {
    distanceTravelled,
    coordss,
    getRealLocation,
    setDistanceTravelled,
    getLocation,
  } = location();

  const handleStopBt = () => {
    if (changeTextStart === "start") return;
    setChangeColor(isStopwatchStart ? "green" : "red");
    setChangeTextStop(isStopwatchStart ? "resume" : "stop");
    setIsStopwatchStart(!isStopwatchStart);
    //console.log(startPosition);
  };

  const handleGetTime = (time) => {
    setTime(time);
  };

  const handleResetBt = () => {
    setEnableStopBt(true);
    setChangeTextStop("stop");
    setChangeColor("red");
    setChangeTextStart("start");
    setIsStopwatchStart(false);
    setIsReset(true);
    setDistanceTravelled(0);
    removeCount();
  };

  const handleStartBt = () => {
    if (changeTextStart === "start") {
      setChangeTextStart("reset");
      setSteps(0);
      getLocation();
      setStartPosition(coordss);
      setEnableStopBt(false);
      setIsReset(false);
      getRealLocation();
      setIsStopwatchStart(true);
      startCount();
      console.log(coordss, "yes");
      setStartPosition(coordss);
    } else {
      Alert.alert("Start", "Are you want new round ?", [
        {
          text: "no",
        },

        {
          text: "yes",
          onPress: () => {
            handleResetBt();
          },
        },
      ]);
    }
  };

  return (
    <Screen style={styles.screen}>
      <Counter title={step} name={"shoe-print"}></Counter>
      <View style={styles.time}>
        <Counter title={distanceTravelled} name={"alpha-m-circle"} />
        <AppStopWatch
          isStopwatchStart={isStopwatchStart}
          resetStopwatch={isReset}
          getTime={(time) => {
            handleGetTime(time);
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <AppButton
          title={changeTextStart}
          onPress={() => {
            handleStartBt();
          }}
        />
        <AppButton
          title={changeTextStop}
          color={changeColor}
          onPress={handleStopBt}
          disabled={enableStopBt}
        />
        <AppButton
          title="end"
          onPress={() => {
            getLocation();
            setLastPosition(coordss);

            Alert.alert("End", "Are you want to end and save your trip ?", [
              {
                text: "Cancel",
              },
              {
                text: "accept",
                onPress: () => {
                  const newTrip = {
                    id: Math.random() * 20,
                    title: "Trip",
                    distance: distanceTravelled,
                    steps: step,
                    time: time,
                    startPosition: {
                      latitude: startPosition["latitude"],
                      longitude: startPosition["longitude"],
                      latitudeDelta: 0.04,
                      longitudeDelta: 0.05,
                    },
                    endPosition: {
                      latitude: lastPosition["latitude"],
                      longitude: lastPosition["longitude"],
                      latitudeDelta: 0.04,
                      longitudeDelta: 0.05,
                    },
                  };
                  setData([...data, newTrip]);
                  setIsStopwatchStart(false);
                  removeCount();

                  // x();
                  // console.log(trips);
                  navigation.navigate("tripNav", {
                    screen: "History",
                    params: { data },
                  });
                  handleResetBt();
                },
                style: "cancel",
              },
            ]);
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    flex: 0.8,
    flexDirection: "row",
  },

  time: {
    flex: 3,
    flexDirection: "row",
  },
  timer: {
    backgroundColor: "#000",
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
});

export default HomeScreen;
