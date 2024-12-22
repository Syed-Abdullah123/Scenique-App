import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { UnsplashPhoto, fetchRandomWallpapers } from "../api/unsplash";
import { WALLPAPER_CATEGORIES, useCategories } from "../data/categories";

const DashboardScreen = ({ navigation }) => {
  const [bestOfMonth, setBestOfMonth] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get first 6 categories for dashboard
  const dashboardCategories = WALLPAPER_CATEGORIES.slice(0, 6);
  const { categories } = useCategories(dashboardCategories);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const randomWallpapers = await fetchRandomWallpapers(10);
        setBestOfMonth(randomWallpapers);
      } catch (err) {
        setError("Failed to load wallpapers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const sections = [
    {
      title: "Best of the month",
      data: bestOfMonth,
      horizontal: true,
    },
    {
      title: "Categories",
      data: categories,
      horizontal: false,
      numColumns: 2,
    },
  ];

  const renderItem = ({ item, section }: any) => {
    if (section.horizontal) {
      // Best of month section
      return (
        <Pressable
          style={styles.flatlistContainer}
          onPress={() => navigation.navigate("Details", { item })}
        >
          <Image source={{ uri: item.urls.regular }} style={styles.image} />
        </Pressable>
      );
    } else {
      // Categories section
      return (
        <Pressable
          style={styles.categoriesContainer}
          onPress={() =>
            navigation.navigate("Cat_Details", {
              category: item,
              title: item.title,
            })
          }
        >
          <Image
            source={{ uri: item.coverImage }}
            style={styles.categoryImage}
            defaultSource={require("../../assets/icons/icon.png")}
          />
          <View style={styles.overlay}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </Pressable>
      );
    }
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

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity onPress={() => setError(null)}>
          <Text style={styles.retry}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
              keyExtractor={(item) => item.id}
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#363B40",
  },
  error: {
    fontFamily: "Lexend_Bold",
    fontSize: 20,
    color: "#fff",
    marginBottom: 10,
  },
  retry: {
    fontFamily: "Lexend_Medium",
    color: "#32BAE8",
    fontSize: 12,
    textDecorationLine: "underline",
  },
});
