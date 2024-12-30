import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Welcome = ({ navigation }) => {
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderFeatureCard = (icon, title, description) => (
    <Animated.View
      style={[
        styles.featureCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      <BlurView intensity={50} style={styles.blurContainer}>
        <Image source={icon} style={styles.featureIcon} />
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </BlurView>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["#1a1a1a", "#363B40"]}
        style={styles.gradientBackground}
      >
        <Animated.View
          style={[
            styles.headerContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appName}>Scenique.</Text>
          <Text style={styles.tagline}>
            Transform your screen with stunning wallpapers
          </Text>
        </Animated.View>

        <View style={styles.featuresContainer}>
          {renderFeatureCard(
            require("../../assets/icons/gallery.png"),
            "Curated Collection",
            "Handpicked wallpapers from talented artists worldwide"
          )}
          {renderFeatureCard(
            require("../../assets/icons/categories.png"),
            "Browse Categories",
            "Explore diverse themes from nature to abstract art"
          )}
          {renderFeatureCard(
            require("../../assets/icons/download.png"),
            "High Quality",
            "Crystal clear resolution for every device"
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.navigate("Signup")}
          >
            <LinearGradient
              colors={["#32BAE8", "#2193b0"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Unsplash Attribution */}
        <View style={styles.attributionContainer}>
          <Text style={styles.attributionText}>
            Wallpapers provided by{" "}
            <Text
              style={styles.attributionLink}
              onPress={() => Linking.openURL("https://unsplash.com")}
            >
              Unsplash
            </Text>
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  gradientBackground: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontFamily: "Lexend_Regular",
    fontSize: 22,
    color: "#ffffff80",
    marginTop: "10%",
  },
  appName: {
    fontFamily: "Lexend_Bold",
    fontSize: 42,
    color: "#32BAE8",
  },
  tagline: {
    fontFamily: "Lexend_Regular",
    fontSize: 16,
    color: "#ffffff90",
    textAlign: "center",
    maxWidth: "90%",
  },
  featuresContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
  },
  featureCard: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#ffffff10",
    borderWidth: 1,
    borderColor: "#ffffff20",
  },
  blurContainer: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  featureIcon: {
    width: 40,
    height: 40,
    tintColor: "#32BAE8",
  },
  featureTitle: {
    fontFamily: "Lexend_Bold",
    fontSize: 13,
    color: "#fff",
    flex: 1,
  },
  featureDescription: {
    fontFamily: "Lexend_Regular",
    fontSize: 13,
    color: "#ffffff80",
    flex: 2,
  },
  buttonContainer: {
    marginBottom: 50,
    gap: 15,
  },
  getStartedButton: {
    borderRadius: 30,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#32BAE8",
  },
  gradientButton: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Lexend_Bold",
    color: "#fff",
    fontSize: 18,
  },
  attributionContainer: {
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  attributionText: {
    fontFamily: "Lexend_Regular",
    fontSize: 12,
    color: "#ffffff60",
  },
  attributionLink: {
    color: "#32BAE8",
    textDecorationLine: "underline",
  },
});
