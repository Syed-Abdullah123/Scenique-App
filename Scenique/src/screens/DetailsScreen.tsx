import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Linking,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const DetailsScreen = ({ navigation, route }: any) => {
  const { item } = route.params;
  const [isClicked, setIsClicked] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable style={styles.backIcon} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left" size={24} color="#32BAE8" />
      </Pressable>
      <View>
        <Image
          source={{ uri: item.urls.regular }}
          style={styles.image}
          defaultSource={require("../../assets/icons/icon.png")}
        />
      </View>
      <View style={styles.overlay}>
        <Pressable style={styles.line} />
        <View style={styles.titleContainer}>
          <View style={styles.cont1}>
            <Text style={styles.title}>{item.alt_description}</Text>
            <Pressable
              onPress={() =>
                Linking.openURL(`https://unsplash.com/@${item.user.username}`)
              }
            >
              <Text style={styles.author}>@{item.user.username}</Text>
            </Pressable>
          </View>
          <View style={styles.cont2}>
            <Pressable onPress={() => setIsClicked(!isClicked)}>
              {!isClicked ? (
                <Ionicons name="heart-outline" size={28} color="#e0e0e0" />
              ) : (
                <Ionicons name="heart" size={28} color="red" />
              )}
            </Pressable>
            <Pressable onPress={() => console.log("Download pressed.")}>
              <Ionicons name="download-outline" size={28} color="#e0e0e0" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#363B40",
  },
  backIcon: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: "85%",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  line: {
    width: 40,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#32BAE8",
    alignSelf: "center",
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  cont1: {
    width: "70%",
    gap: 5,
  },
  cont2: {
    flexDirection: "row",
    alignItems: "center",
    width: 70,
    gap: 15,
  },
  title: {
    fontFamily: "Lexend_Bold",
    fontSize: 16,
    color: "#fff",
    flexShrink: 1,
  },
  author: {
    fontFamily: "Lexend_Medium",
    fontSize: 12,
    color: "#32BAE8",
    textDecorationLine: "underline",
  },
  desc: {
    fontFamily: "Lexend_Regular",
    fontSize: 13,
    color: "#fff",
  },
});
