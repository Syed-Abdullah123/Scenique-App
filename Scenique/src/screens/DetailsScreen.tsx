import React, { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DetailsScreen = ({ navigation, route }: any) => {
  const { item } = route.params;
  // const [overlayHeight, setOverlayHeight] = useState(new Animated.Value(0.15));

  // Use state listeners to update the height animation value when required
  // const toggleOverlay = () => {
  //   Animated.timing(overlayHeight, {
  //     toValue: overlayHeight.__getValue() < 0.5 ? 0.8 : 0.15, // Use __getValue to check the current state
  //     duration: 300,
  //     useNativeDriver: false,
  //   }).start();
  // };

  // const onGestureEvent = Animated.event(
  //   [{ nativeEvent: { translationY: overlayHeight } }],
  //   { useNativeDriver: false }
  // );

  // const onHandlerStateChange = (event: any) => {
  //   if (event.nativeEvent.state === State.END) {
  //     const { translationY } = event.nativeEvent;
  //     if (translationY > 100) {
  //       // If dragged down more than 100, close the overlay
  //       Animated.timing(overlayHeight, {
  //         toValue: 0.15,
  //         duration: 300,
  //         useNativeDriver: false,
  //       }).start();
  //     } else {
  //       // Otherwise, open the overlay fully
  //       Animated.timing(overlayHeight, {
  //         toValue: 0.8,
  //         duration: 300,
  //         useNativeDriver: false,
  //       }).start();
  //     }
  //   }
  // };

  // const toggleOverlay = () => {
  //   if (overlayHeight._value < 0.5) {
  //     Animated.timing(overlayHeight, {
  //       toValue: 0.8,
  //       duration: 300,
  //       useNativeDriver: false,
  //     }).start();
  //   } else {
  //     Animated.timing(overlayHeight, {
  //       toValue: 0.15,
  //       duration: 300,
  //       useNativeDriver: false,
  //     }).start();
  //   }
  // };

  return (
    // <GestureHandlerRootView style={styles.container}>
    <View style={styles.container}>
      <Pressable style={styles.backIcon} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left" size={24} color="#FF6B6B" />
      </Pressable>
      <View>
        <Image source={item.image} style={styles.image} />
        {/* <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View
            style={[
              styles.overlay,
              {
                height: overlayHeight.interpolate({
                  inputRange: [0.15, 0.8],
                  outputRange: ["15%", "80%"],
                }),
              },
            ]}
          > */}
        <View style={styles.overlay}>
          <Pressable style={styles.line} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.authorName}</Text>
          </View>
          {/* <Text style={styles.desc}>{item.description}</Text> */}
          {/* </Animated.View> */}
          {/* </PanGestureHandler> */}
        </View>
      </View>
    </View>
    // {/* </GestureHandlerRootView> */}
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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  line: {
    width: 40,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#FF6B6B",
    alignSelf: "center",
    marginBottom: 10,
  },
  titleContainer: {
    marginBottom: 20,
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
