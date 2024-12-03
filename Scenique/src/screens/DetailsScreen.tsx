import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import ButtonComponent from "../components/ButtonComponent";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const DetailsScreen = ({ navigation, route }: any) => {
  const { item } = route.params;
  const [isClicked, setIsClicked] = useState(false);

  // const translateY = useSharedValue(SCREEN_HEIGHT * 0.4); // Initially at 40% of screen height

  // const animatedStyle = useAnimatedStyle(() => ({
  //   transform: [{ translateY: translateY.value }],
  // }));

  // const onGestureEvent = (event: any) => {
  //   const newY = translateY.value + event.translationY;
  //   translateY.value = Math.max(0, Math.min(SCREEN_HEIGHT * 0.4, newY));
  // };

  // const onGestureEnd = () => {
  //   if (translateY.value > SCREEN_HEIGHT * 0.2) {
  //     translateY.value = withSpring(SCREEN_HEIGHT * 0.4); // Snap down
  //   } else {
  //     translateY.value = withSpring(0); // Snap up
  //   }
  // };

  // Shared Value for bottom sheet position
  const translateY = useSharedValue(300); // Initially down

  // Gesture handling
  const gestureHandler = (event: any) => {
    translateY.value = withSpring(
      Math.max(0, Math.min(300, translateY.value + event.translationY))
    );
  };

  const gestureEndHandler = () => {
    if (translateY.value > 150) {
      translateY.value = withSpring(300); // Snap to bottom
    } else {
      translateY.value = withSpring(0); // Snap to top
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.container}>
      <Pressable style={styles.backIcon} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left" size={24} color="#32BAE8" />
      </Pressable>
      <View>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.overlay}>
        <Pressable style={styles.line} />
        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.authorName}</Text>
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
  cont2: {
    flexDirection: "row",
    width: 70,
    gap: 15,
  },
  title: {
    fontFamily: "Lexend_Bold",
    fontSize: 24,
    color: "#fff",
  },
  author: {
    fontFamily: "Lexend_Medium",
    fontSize: 16,
    color: "#fff",
  },
  desc: {
    fontFamily: "Lexend_Regular",
    fontSize: 13,
    color: "#fff",
  },
});
