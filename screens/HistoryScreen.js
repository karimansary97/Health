import React, { useContext, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import ListItemSeparator from "../components/ListItemSeparator";
import { useFocusEffect } from "@react-navigation/native";
import ListItemDeletAction from "../components/ListItemDeleteAction";
import cache from "../utility/cache";
import DataContext from "../hooks/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HistoryScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const { data, setData } = useContext(DataContext);

  const asyncStore = async () => {
    await AsyncStorage.setItem("storeTrips", JSON.stringify(data))
      .then(() => {
        // console.log("x");
      })
      .catch((error) => console.log(error));
  };

  useFocusEffect(
    React.useCallback(() => {
      asyncStore();
      return () => {};
    }, [asyncStore])
  );

  return (
    <Screen>
      <FlatList
        data={data}
        keyExtractor={(trip) => trip.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            onPress={() => navigation.navigate("DetailsScreen", item)}
            renderRightActions={() => (
              <ListItemDeletAction
                onPress={() => {
                  const filterdTrips = data.filter((t) => t.id !== item.id);
                  setData(filterdTrips);
                }}
              />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          console.log(data);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default HistoryScreen;
