import React from "react";
import { StyleSheet, Text, View } from "react-native";

const LikesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>LikesScreen</Text>
    </View>
  );
};

export default LikesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
