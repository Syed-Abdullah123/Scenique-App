import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { wallpapers } from "../data/wallpapers";

const LikeScreenComponent = ({ navigation }: any) => {
  const handlePress = (image: any) => {
    navigation.navigate("Details", { item: image });
  };

  const renderItem = ({ item }: any) => {
    return (
      <Pressable style={styles.itemContainer} onPress={() => handlePress(item)}>
        <Image source={item.image} style={styles.image}></Image>
        {/* <Text>{item.title}</Text> */}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={wallpapers}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default LikeScreenComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    width: "50%",
    marginRight: 5,
    marginBottom: 10,
  },
  image: {
    width: "97%",
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
  },
});
