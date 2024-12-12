import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Welcome = () => {
  return (
    <View style={styles.container}>
      <View style={styles.midContainer}>
        <Text>
          Welcome to
          <Image
            source={require("../../assets/icons/splash-icon.png")}
            style={{
              width: 60,
              height: 60,
              marginTop: 50,
              resizeMode: "contain",
            }}
          />
        </Text>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#363B40",
    paddingHorizontal: 15,
  },
  midContainer: {
    flex: 1,
  },
});
