import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Counter from "./Counter";
import Screen from "./Screen";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import colors from "../config/colors";
function AppStopWatch({ isStopwatchStart, resetStopwatch, getTime }) {
  const options = {
    text: {
      fontSize: 24,
      color: colors.black,
    },
  };
  return (
    <Counter name={"timer"}>
      <Stopwatch
        //laps
        //msecs
        start={isStopwatchStart}
        //To start
        reset={resetStopwatch}
        //To reset
        options={options}
        //options for the styling
        getTime={getTime}
      />
    </Counter>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 18,
  },
});

export default AppStopWatch;
