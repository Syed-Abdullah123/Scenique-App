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
      <Ionicons name={icon} size={24} color="#363B40" style={{ top: 1 }} />
    </Pressable>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#32BAE8",
    padding: 12,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  buttonText: {
    color: "#363B40",
    fontSize: 16,
    fontFamily: "CG_Medium",
  },
});
