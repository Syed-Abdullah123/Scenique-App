import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { wallpapers } from "../data/wallpapers";
import Search from "../components/SearhComponent";

const SearchScreen = ({ navigation }: any) => {
  const renderItem = ({ item }: any) => {
    return (
      <Pressable
        style={styles.flatlistContainer}
        onPress={() => navigation.navigate("Cat_Details", { item })}
      >
        <View>
          <Image source={item.image} style={styles.image}></Image>
          <View style={styles.overlay}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Search />
      <FlatList
        data={wallpapers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        key={"Search wallpapers"}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#363B40",
    paddingHorizontal: 15,
  },
  flatlistContainer: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    height: 85,
    width: 160,
    marginRight: 10,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 15,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontFamily: "Lexend_Bold",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});
