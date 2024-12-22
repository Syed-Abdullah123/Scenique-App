import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import {
  WALLPAPER_CATEGORIES,
  Category,
  useCategories,
} from "../data/categories";
import Search from "../components/SearhComponent";

const SearchScreen = ({ navigation }: any) => {
  const { categories, loading, error } = useCategories(WALLPAPER_CATEGORIES);

  const renderItem = ({ item }: { item: Category }) => {
    return (
      <Pressable
        style={styles.flatlistContainer}
        onPress={() =>
          navigation.navigate("Cat_Details", {
            category: item,
            title: item.title,
          })
        }
      >
        <View>
          {item.coverImage ? (
            <Image
              source={{ uri: item.coverImage }}
              style={styles.image}
              defaultSource={require("../../assets/icons/icon.png")} // Add a placeholder image
            />
          ) : (
            <View style={[styles.image, styles.placeholder]}>
              <ActivityIndicator />
            </View>
          )}
          <View style={styles.overlay}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Search />
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
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
  // gridContainer: {
  //   padding: 16,
  //   gap: 16,
  // },
  placeholder: {
    backgroundColor: "#e0e0e0",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#363B40",
  },
  error: {
    fontFamily: "CG_Regular",
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
});
