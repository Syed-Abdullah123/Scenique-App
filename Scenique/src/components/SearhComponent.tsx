import React, { useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Search = ({ onSearch, initialValue = "", onClear }) => {
  const [query, setQuery] = useState(initialValue);

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <View style={styles.input}>
      <Ionicons name="search" size={24} color="#363B40" />
      <TextInput
        style={styles.inputField}
        placeholder="Search anything . . ."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      {query ? (
        <TouchableOpacity onPress={handleClear}>
          <Ionicons name="close-circle" size={20} color="#363B40" />
        </TouchableOpacity>
      ) : null}
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
    fontFamily: "Lexend_Regular",
    color: "#363B40",
  },
});
