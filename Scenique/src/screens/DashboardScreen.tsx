import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableHighlight,
} from "react-native";
import { wallpapers } from "../data/wallpapers";
import LoaderAnimation from "../components/CustomLoader";

const DashboardScreen = ({ navigation }) => {
  const renderItem = ({ item }: any) => {
    return (
      <TouchableHighlight
        style={styles.flatlistContainer}
        onPress={() => navigation.navigate("Details", { item })}
      >
        <View>
          <Image source={item.image} style={styles.image}></Image>
          <View style={styles.overlay}>
            <Text style={styles.title}>{item.title}</Text>
            {/* <Text style={styles.author}>{item.authorName}</Text> */}
          </View>
        </View>
        {/* <Text style={styles.desc}>{item.description}</Text> */}
      </TouchableHighlight>
    );
  };

  if (!wallpapers) return <LoaderAnimation />;

  return (
    <View style={styles.container}>
      <FlatList
        data={wallpapers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#363B40",
  },
  flatlistContainer: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontFamily: "CG_Bold",
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 120,
  },
  author: {
    fontFamily: "Lexend_Bold",
    fontSize: 16,
    color: "#fff",
  },
  desc: {
    fontFamily: "Lexend_Regular",
    fontSize: 12,
    color: "#e0e0e0",
  },
});
