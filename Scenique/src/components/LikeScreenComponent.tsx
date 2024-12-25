import React, { useContext, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { LikedImagesContext } from "../context/LikedImagesContext";

const LikeScreenComponent = ({ navigation }: any) => {
  const { likedImages } = useContext(LikedImagesContext);

  const handlePress = (image: any) => {
    navigation.navigate("Details", { item: image });
  };

  const renderItem = ({ item }: any) => {
    return (
      <Pressable style={styles.itemContainer} onPress={() => handlePress(item)}>
        <Image source={{ uri: item.urls.thumb }} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.username}>By {item.user.name}</Text>
          <Text
            style={[
              styles.username,
              { color: "#32BAE8", textDecorationLine: "underline" },
            ]}
          >
            unsplash.com/{item.user.username}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {likedImages.length === 0 ? (
        <Text style={styles.emptyText}>
          No wallpapers liked yet. Start liking wallpapers to see them here!
        </Text>
      ) : (
        <FlatList
          data={likedImages}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default LikeScreenComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  itemContainer: {
    width: "48%",
    marginRight: 10,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
  },
  emptyText: {
    fontFamily: "CG_Regular",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  username: {
    fontFamily: "CG_Regular",
    color: "#fff",
    fontSize: 12,
  },
});
