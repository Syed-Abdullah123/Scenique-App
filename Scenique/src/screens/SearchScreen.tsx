import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Search from "../components/SearhComponent";

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Search />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#363B40",
  },
  text: {
    color: "#fff",
  },
});
