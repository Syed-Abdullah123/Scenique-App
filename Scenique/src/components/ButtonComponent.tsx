import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  icon: any;
};

const ButtonComponent: React.FC<ButtonProps> = ({ title, onPress, icon }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
      <Ionicons name={icon} size={24} color="#32BAE8" />
    </Pressable>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#e0e0e0",
    padding: 12,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    position: "absolute",
    bottom: "10%",
    left: 20,
    right: 20,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "CG_Regular",
  },
});
