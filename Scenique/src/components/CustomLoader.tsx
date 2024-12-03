import React, { useState, useEffect } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LoaderAnimation = () => {
  // Set initial state for the current icon index (0: left, 1: up, 2: right, 3: down)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity] = useState(new Animated.Value(1));

  const iconSequence = [
    "gamepad-circle-left", // Left
    "gamepad-circle-up", // Up
    "gamepad-circle-right", // Right
    "gamepad-circle-down", // Down
  ];

  // Function to cycle through the icons
  const cycleIcons = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % iconSequence.length);
  };

  // Function to fade in/out the icon
  const fadeIcon = () => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    // Start an interval to change the icon every 500ms
    const interval = setInterval(() => {
      cycleIcons();
      // fadeIcon();
    }, 150); // Change icon every 500ms

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Animated.View style={{ opacity }}>
        <MaterialCommunityIcons
          name={iconSequence[currentIndex]}
          size={40}
          color="#FF6B68"
        />
      </Animated.View>
      <Text style={styles.loadingText}>Loading . . .</Text>
    </View>
  );
};

export default LoaderAnimation;

const styles = StyleSheet.create({
  loadingText: {
    fontFamily: "CG_Regular",
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
});
