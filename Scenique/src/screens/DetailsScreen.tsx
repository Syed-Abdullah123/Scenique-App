import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>DetailsScreen</Text>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
