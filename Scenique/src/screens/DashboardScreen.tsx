import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import {
  UnsplashPhoto,
  fetchRandomWallpapers,
  fetchWallpapers,
} from "../api/unsplash";
import { WALLPAPER_CATEGORIES, useCategories } from "../data/categories";
import { FilterContext } from "../context/FiltersContext";

import Search from "../components/SearhComponent";
import Filter from "../components/FilterComponent";
import { Ionicons } from "@expo/vector-icons";

const DashboardScreen = ({ navigation }) => {
  const [bestOfMonth, setBestOfMonth] = useState<UnsplashPhoto[]>([]);
  const [searchResults, setSearchResults] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Get first 6 categories for dashboard
  const { filter, setFilter } = useContext(FilterContext);
  const dashboardCategories = WALLPAPER_CATEGORIES.slice(0, 6);
  const { categories } = useCategories(dashboardCategories);

  // Handle hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (searchResults.length > 0) {
          clearSearch();
          return true; // Prevent default back behavior
        }
        return false; // Let default back behavior happen
      }
    );

    return () => backHandler.remove();
  }, [searchResults]);

  // Add navigation listener for the back button
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (searchResults.length > 0) {
        // Prevent default behavior
        e.preventDefault();
        clearSearch();
      }
    });

    return unsubscribe;
  }, [navigation, searchResults]);

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setPage(1);
    setHasMore(true);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const randomWallpapers = await fetchRandomWallpapers(8);
        setBestOfMonth(randomWallpapers);
        setSearchResults([]); // Clear search results when loading initial data
      } catch (err) {
        setError("Failed to load wallpapers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle search functionality
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const results = await fetchWallpapers({
        query,
        orientation: filter.orientation,
        page: 1,
        perPage: 16,
      });
      setSearchResults(results);
      setPage(1);
      setHasMore(results.length === 16);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Failed to fetch search results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreResults = async () => {
    if (isLoadingMore || !hasMore || !searchQuery) return;

    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const moreResults = await fetchWallpapers({
        query: searchQuery,
        orientation: filter.orientation,
        page: nextPage,
        perPage: 16,
      });

      if (moreResults.length > 0) {
        setSearchResults((prev) => [...prev, ...moreResults]);
        setPage(nextPage);
        setHasMore(moreResults.length === 30);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error loading more results:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Handle filter changes
  const handleFilterApply = (newFilter) => {
    setFilter(newFilter);
    setShowFilter(false);

    // If there's an active search, re-run it with new filters
    if (searchResults.length > 0) {
      handleSearch(searchResults[0]?.description || "");
    }
  };

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

  const renderSearchResults = () => (
    <FlatList
      key="search"
      data={searchResults}
      renderItem={({ item }) => (
        <Pressable
          style={styles.searchResultContainer}
          onPress={() => navigation.navigate("Details", { item })}
        >
          <Image
            source={{ uri: item.urls.regular }}
            style={styles.searchResultImage}
          />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.searchResultsColumns}
      onEndReached={loadMoreResults}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isLoadingMore ? <ActivityIndicator style={{ padding: 20 }} /> : null
      }
      showsVerticalScrollIndicator={false}
    />
  );

  const renderDashboard = () => (
    <FlatList
      key="dashboard"
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
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: "90%" }}>
          <Search
            onSearch={handleSearch}
            initialValue={searchQuery}
            onClear={clearSearch}
          />
        </View>
        <TouchableOpacity
          style={styles.filterContainer}
          onPress={() => setShowFilter(true)}
        >
          <Ionicons name="filter-sharp" size={24} color="#32BAE8" />
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <Filter
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={handleFilterApply}
        initialValues={filter}
      />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#32BAE8" />
        </View>
      ) : searchResults.length > 0 ? (
        renderSearchResults()
      ) : (
        renderDashboard()
      )}
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#363B40",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingLeft: 0,
    alignItems: "center",
  },
  filterContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A5057",
    width: 40,
    height: 40,
    borderRadius: 10,
    marginLeft: 10,
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
  searchResultContainer: {
    flex: 1,
    margin: 5,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
  },
  searchResultImage: {
    width: "100%",
    height: "100%",
  },
  searchResultsColumns: {
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
});
