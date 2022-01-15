import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import colors from "../config/colors";
import Counter from "../components/Counter";
function DetailsScreen({ route }) {
  const trip = route.params;

  const mapRef = useRef();

  return (
    <Screen style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={trip.startPosition}
      >
        <Marker coordinate={trip.startPosition} />
        <Marker coordinate={trip.endPosition} />
        <MapViewDirections
          origin={trip.startPosition}
          destination={trip.endPosition}
          apikey={"AIzaSyDTJbZ9-DOQNrPtSQoudwl7E0ceBeDa73o"}
          strokeWidth={3}
          strokeColor={colors.black}
          optimizeWaypoints={true}
          onReady={(result) => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: 30,
                bottom: 300,
                left: 30,
                top: 300,
              },
            });
          }}
        />
      </MapView>

      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <Counter
          style={styles.counter}
          title={trip.steps}
          name={"shoe-print"}
        />

        <Counter
          style={styles.counter}
          title={trip.distance}
          name={"alpha-m-circle"}
        />

        <Counter style={styles.counter} title={trip.time} name={"timer"} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  map: {
    height: "65%",
    width: "100%",
    borderWidth: 3,
    borderColor: colors.black,
  },
  counter: {
    width: 111,
    height: 100,
  },
});

export default DetailsScreen;
