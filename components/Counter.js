import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import Screen from "./Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
function Counter({ children, title, style, name }) {
  return (
    <Screen>
      <View style={[styles.container, style]}>
        {children}
        <Text style={styles.text}>{title}</Text>
        <MaterialCommunityIcons name={name} color={colors.danger} size={20} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: colors.primary,
    borderWidth: 3,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: 150,
    height: 150,
    marginHorizontal: 10,
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 6,
  },
});

export default Counter;
