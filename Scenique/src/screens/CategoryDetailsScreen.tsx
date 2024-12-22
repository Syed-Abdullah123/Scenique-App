import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { fetchWallpapers } from "../api/unsplash";

const CategoryDetails = ({ route, navigation }: any) => {
  // Get category and title from route params
  const { category, title } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: title,
      headerStyle: {
        backgroundColor: "#363B40",
      },
      headerTitleStyle: {
        fontFamily: "CG_Bold",
        color: "#fff",
      },
      headerTintColor: "#fff",
    });
  }, [navigation, title]);

  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadWallpapers = async (pageNum = 1, refresh = false) => {
    try {
      // Use the category title as the search query if query is not available
      const searchQuery = category.query || category.title;
      const newWallpapers = await fetchWallpapers({
        query: searchQuery,
        page: pageNum,
        perPage: 10,
      });

      if (refresh) {
        setWallpapers(newWallpapers);
      } else {
        setWallpapers((prev) => [...prev, ...newWallpapers]);
      }

      setHasMore(newWallpapers.length === 10); // Set to false if fewer than 10 items are fetched
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadWallpapers();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    loadWallpapers(1, true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadWallpapers(nextPage);
    }
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.imageContainer}
      onPress={() => navigation.navigate("Details", { item })}
    >
      <Image
        source={{ uri: item.urls.regular }}
        style={styles.image}
        defaultSource={require("../../assets/icons/icon.png")}
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={wallpapers}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={
          hasMore && loading && !refreshing ? ( // Show only if fetching more
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color="#fff"
            />
          ) : null
        }
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        key="flatlist-wallpapers-category"
      />
    </View>
  );
};

export default CategoryDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#363B40",
    paddingVertical: 10,
  },
  flatlistContainer: {
    width: "48%",
    marginRight: 10,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  gridContainer: {
    padding: 8,
  },
  imageContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  loader: {
    padding: 16,
  },
});
