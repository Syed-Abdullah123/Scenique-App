import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { wallpapers } from "../data/wallpapers";

const CategoryDetails = ({ route, navigation }) => {
  // displaying header with the category name from previous screen
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: route.params.item.title,
      headerStyle: {
        backgroundColor: "#363B40",
      },
      headerTitleStyle: {
        fontFamily: "CG_Bold",
        color: "#fff",
      },
      headerTintColor: "#fff",
    });
  }, [navigation, route.params.item.title]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.flatlistContainer}>
        <Image source={item.image} style={styles.image}></Image>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={wallpapers}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        key="id"
      />
    </View>
  );
};

export default CategoryDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#363B40",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  flatlistContainer: {
    width: "31%",
    marginRight: 10,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 10,
  },
});
