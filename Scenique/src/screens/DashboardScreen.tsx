import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text>DashboardScreen</Text>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
