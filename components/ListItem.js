import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Swipeable from "react-native-gesture-handler/Swipeable";

import colors from "../config/colors";
import Screen from "./Screen";

function ListItem({ title, onPress, renderRightActions }) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.circle}>
            <MaterialCommunityIcons
              color={colors.primary}
              name="map-marker-distance"
              size={30}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <MaterialCommunityIcons
            color={colors.medium}
            name="chevron-right"
            size={28}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.black,
  },

  title: {
    fontSize: 25,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListItem;
