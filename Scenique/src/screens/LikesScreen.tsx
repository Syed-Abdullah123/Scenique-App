import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoaderAnimation from "../components/CustomLoader";

const LikesScreen = () => {
  return (
    <View style={styles.container}>
      <LoaderAnimation />
    </View>
  );
};

export default LikesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#363B40",
  },
  text: {
    color: "#fff",
  },
});
