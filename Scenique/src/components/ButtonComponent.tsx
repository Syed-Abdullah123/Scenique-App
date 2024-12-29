import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, Pressable } from "react-native";

type ButtonProps = {
  title: string | React.ReactNode;
  onPress: () => void;
  icon?: string | null;
  disabled?: boolean;
};

const ButtonComponent: React.FC<ButtonProps> = ({
  title,
  onPress,
  icon,
  disabled,
}) => {
  return (
    <Pressable
      style={[
        styles.button,
        disabled && styles.disabledButton, // Add style for disabled state
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
      {icon && (
        <Ionicons name={icon} size={24} color="#363B40" style={{ top: 1 }} />
      )}
    </Pressable>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#32BAE8",
    padding: 12,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  buttonText: {
    color: "#363B40",
    fontSize: 16,
    fontFamily: "Lexend_Medium",
  },
  disabledButton: {
    backgroundColor: "#32BAE8",
  },
});
