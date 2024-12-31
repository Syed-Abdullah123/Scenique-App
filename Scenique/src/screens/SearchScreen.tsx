import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import {
  WALLPAPER_CATEGORIES,
  Category,
  useCategories,
} from "../data/categories";
import Search from "../components/SearhComponent";

const SearchScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] =
    useState(WALLPAPER_CATEGORIES);
  const { categories, loading, error } = useCategories(WALLPAPER_CATEGORIES);

  useEffect(() => {
    // Update filteredCategories whenever categories are updated
    setFilteredCategories(categories);
  }, [categories]);

  // Handle hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (searchQuery) {
          clearSearch();
          return true; // Prevent default back behavior
        }
        return false; // Let default back behavior happen
      }
    );

    return () => backHandler.remove();
  }, [searchQuery]);

  // Add navigation listener for the back button
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (searchQuery) {
        // Prevent default behavior
        e.preventDefault();
        clearSearch();
      }
    });

    return unsubscribe;
  }, [navigation, searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredCategories(categories);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredCategories(categories);
      return;
    }

    const filtered = categories.filter(
      (category) =>
        category.title.toLowerCase().includes(query.toLowerCase()) ||
        category.query.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const renderItem = ({ item }: { item: Category }) => (
    <Pressable
      style={styles.flatlistContainer}
      onPress={() =>
        navigation.navigate("Cat_Details", {
          category: item,
          title: item.title,
        })
      }
    >
      <View>
        {item.coverImage ? (
          <Image
            source={{ uri: item.coverImage }}
            style={styles.image}
            defaultSource={require("../../assets/icons/Placeholder.png")} // Add a placeholder image
          />
        ) : (
          <View style={[styles.image, styles.placeholder]}>
            <ActivityIndicator />
          </View>
        )}
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#32BAE8" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Search
        onSearch={handleSearch}
        initialValue={searchQuery}
        onClear={clearSearch}
      />
      <FlatList
        data={filteredCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No categories found</Text>
          </View>
        }
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#363B40",
    paddingHorizontal: 15,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  flatlistContainer: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    height: 85,
    width: "48%",
    marginRight: 10,
  },
  cardContainer: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#2A2D2F",
  },
  image: {
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontFamily: "Lexend_Bold",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  placeholder: {
    backgroundColor: "#e0e0e0",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#363B40",
  },
  error: {
    fontFamily: "CG_Regular",
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  emptyText: {
    fontFamily: "CG_Regular",
    color: "#FFFFFF",
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
});
