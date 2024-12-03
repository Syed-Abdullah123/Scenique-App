import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LikeScreenComponent from "../components/LikeScreenComponent";

const LikesScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <LikeScreenComponent navigation={navigation} />
    </View>
  );
};

export default LikesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#363B40",
  },
  text: {
    color: "#fff",
  },
});
