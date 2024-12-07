import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { wallpapers } from "../data/wallpapers";

const DashboardScreen = ({ navigation }) => {
  const sections = [
    {
      title: "Best of the month",
      data: wallpapers,
      horizontal: true,
    },
    {
      title: "Categories",
      data: wallpapers,
      horizontal: false,
      numColumns: 2,
    },
  ];

  const renderItem = ({ item, section }: any) => {
    return (
      <Pressable
        style={
          section.horizontal
            ? styles.flatlistContainer
            : styles.categoriesContainer
        }
        onPress={() => {
          section.horizontal
            ? navigation.navigate("Details", { item })
            : navigation.navigate("Cat_Details", { item });
        }}
      >
        <Image
          source={item.image}
          style={section.horizontal ? styles.image : styles.categoryImage}
        ></Image>
        {!section.horizontal && (
          <View style={styles.overlay}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      </Pressable>
    );
  };

  const renderSectionHeader = ({ section }) => {
    return (
      <View style={styles.best}>
        <Text style={styles.bestTitle}>{section.title}</Text>
        {section.title === "Categories" && (
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Text style={styles.more}>See More</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sections}
        renderItem={({ item: section }) => (
          <View>
            {renderSectionHeader({ section })}
            <FlatList
              data={section.data}
              renderItem={({ item }) => renderItem({ item, section })}
              keyExtractor={(item) => item.id.toString()}
              horizontal={section.horizontal}
              showsHorizontalScrollIndicator={false}
              numColumns={section.numColumns}
            />
          </View>
        )}
        keyExtractor={(section, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#363B40",
    paddingVertical: 10,
  },
  flatlistContainer: {
    marginBottom: 10,
    borderRadius: 10,
    height: 180,
    width: 140,
    marginRight: 10,
  },
  best: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bestTitle: {
    fontFamily: "Lexend_Bold",
    fontSize: 20,
    color: "#fff",
    marginBottom: 10,
  },
  more: {
    fontFamily: "Lexend_Medium",
    color: "#32BAE8",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  categoriesContainer: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    height: 85,
    width: 160,
    marginRight: 10,
  },
  categoryImage: {
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
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  title: {
    fontFamily: "Lexend_Bold",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
});
