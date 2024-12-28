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
  const { category, title } = route.params;
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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

  const loadWallpapers = async (pageNum = 1, refresh = false) => {
    if (!hasMore && pageNum !== 1) return;

    try {
      setIsLoadingMore(pageNum !== 1);
      const searchQuery = category.query || category.title;
      const newWallpapers = await fetchWallpapers({
        query: searchQuery,
        page: pageNum,
        perPage: 20,
      });

      if (refresh) {
        setWallpapers(newWallpapers);
      } else {
        setWallpapers((prev) => [...prev, ...newWallpapers]);
      }
      setHasMore(newWallpapers.length === 20);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    loadWallpapers();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    loadWallpapers(1, true);
  };

  const handleLoadMore = () => {
    if (!loading && !isLoadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadWallpapers(nextPage);
    }
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#32BAE8" />
      </View>
    );
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

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#32BAE8" />
      </View>
    );
  }

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
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#32BAE8"]}
          />
        }
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
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
  columnWrapper: {
    // justifyContent: "space-between",
    // paddingHorizontal: 16,
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#363B40",
  },
  footerLoader: {
    padding: 16,
  },
});
