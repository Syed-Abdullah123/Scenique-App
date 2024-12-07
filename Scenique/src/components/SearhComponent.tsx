import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Search = () => {
  return (
    <View style={styles.input}>
      <Ionicons name="search" size={24} color="#363B40" />
      <TextInput
        style={styles.inputField}
        placeholder="Search anything . . ."
      ></TextInput>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    gap: 6,
    paddingHorizontal: 12,
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  inputField: {
    flex: 1,
    fontFamily: "CG_Regular",
    color: "#363B40",
  },
});
