import React, { useState, useContext, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  ActivityIndicator,
  ToastAndroid,
  Platform,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Toast from "react-native-toast-message";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LikedImagesContext } from "../context/LikedImagesContext";

const DetailsScreen = ({ navigation, route }: any) => {
  const { item } = route.params;
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { likedImages, toggleLike } = useContext(LikedImagesContext);
  const isLiked = likedImages.some((img) => img.id === item.id); // Check if image is liked

  const handleToggleLike = async () => {
    if (!loading) {
      setLoading(true); // Start loading
      await toggleLike(item); // Wait for the toggleLike action to complete
      setLoading(false); // Stop loading
    }
  };

  // Handle download functionality
  // const handleDownload = async () => {
  //   setDownloading(true);
  //   try {
  //     // Request permissions
  //     const { granted } = await MediaLibrary.requestPermissionsAsync();
  //     if (!granted) {
  //       throw new Error("Permission to access media library is required.");
  //     }

  //     // Download the file
  //     const fileUri = `${FileSystem.documentDirectory}${item.id}.jpg`;
  //     const { uri } = await FileSystem.downloadAsync(
  //       item.urls.regular,
  //       fileUri
  //     );

  //     // Save to the media library
  //     const asset = await MediaLibrary.createAssetAsync(uri);
  //     await MediaLibrary.createAlbumAsync("Wallpapers", asset, false);

  //     // Notify the user
  //     if (Platform.OS === "android") {
  //       ToastAndroid.show(
  //         "Wallpaper downloaded successfully!",
  //         ToastAndroid.SHORT
  //       );
  //     } else {
  //       alert("Wallpaper downloaded successfully!");
  //     }
  //   } catch (error) {
  //     console.error("Error downloading wallpaper:", error);
  //     if (Platform.OS === "android") {
  //       ToastAndroid.show("Failed to download wallpaper.", ToastAndroid.SHORT);
  //     } else {
  //       alert("Failed to download wallpaper.");
  //     }
  //   } finally {
  //     setDownloading(false);
  //   }
  // };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const uri = item.urls.full; // Use full-resolution image for download
      const fileUri = `${FileSystem.cacheDirectory}${item.id}.jpg`; // Save to cache first
      const downloadResumable = FileSystem.createDownloadResumable(
        uri,
        fileUri
      );

      const { uri: downloadedUri } = await downloadResumable.downloadAsync();

      // Request media library permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Permission Denied",
          text2: "Media library access is required to save the wallpaper.",
          visibilityTime: 4000,
          autoHide: true,
          position: "top",
          topOffset: 50,
          text1Style: {
            fontFamily: "CG_Bold",
            fontSize: 14,
            color: "#000",
          },
          text2Style: {
            fontFamily: "CG_Regular",
            fontSize: 14,
            color: "#aaa",
          },
        });
        return;
      }

      // Save to media library
      const asset = await MediaLibrary.createAssetAsync(downloadedUri);
      await MediaLibrary.createAlbumAsync("Scenique Images", asset, false);

      Toast.show({
        type: "success",
        text1: "🎉 Wallpaper Downloaded!",
        text2: "Your wallpaper is saved to your gallery.",
        visibilityTime: 5000,
        autoHide: true,
        position: "top",
        bottomOffset: 30,
        text1Style: {
          fontFamily: "CG_Bold",
          fontSize: 14,
          color: "#000",
        },
        text2Style: {
          fontFamily: "CG_Regular",
          fontSize: 14,
          color: "#aaa",
        },
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "😞 Download Failed",
        text2: "An error occurred. Please try again.",
        visibilityTime: 5000,
        autoHide: true,
        position: "top",
        bottomOffset: 30,
        text1Style: {
          fontFamily: "CG_Bold",
          fontSize: 14,
          color: "#000",
        },
        text2Style: {
          fontFamily: "CG_Regular",
          fontSize: 14,
          color: "#aaa",
        },
      });

      console.error("Error downloading image:", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backIcon} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left" size={24} color="#32BAE8" />
      </Pressable>
      <View>
        <Image
          source={{ uri: item.urls.regular }}
          style={styles.image}
          defaultSource={require("../../assets/icons/Placeholder.png")}
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
          <View style={styles.iconsContainer}>
            <Pressable onPress={handleToggleLike} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#32BAE8" />
              ) : (
                <Ionicons
                  name={isLiked ? "heart" : "heart-outline"}
                  size={28}
                  color={isLiked ? "red" : "#e0e0e0"}
                />
              )}
            </Pressable>
            <Pressable onPress={handleDownload} disabled={downloading}>
              {downloading ? (
                <ActivityIndicator size="small" color="#32BAE8" />
              ) : (
                <Ionicons name="download-outline" size={28} color="#e0e0e0" />
              )}
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
  iconsContainer: {
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
