import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text, StyleSheet } from "react-native";
import ImageCard from "../components/imageCard";
import { fetchImages } from "../services/apiServices";

const ImageListScreen = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    if (loading || allLoaded) return;
    setLoading(true);

    const newImages = await fetchImages(offset);
    if (newImages.length > 0) {
      setImages((prev) => [...prev, ...newImages]);
      setOffset((prev) => prev + 1);
    } else {
      setAllLoaded(true);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => `${item.id || index}-${index}`}
        renderItem={({ item }) => (
          <ImageCard imageUrl={item.xt_image} onPress={() => navigation.navigate("DetailScreen", { image: item })} />
        )}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : !allLoaded ? (
            <TouchableOpacity onPress={loadImages} style={styles.loadMore}>
              <Text style={styles.loadMoreText}>Load More</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.endText}>No more images to load</Text>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  loadMore: {
    padding: 12,
    backgroundColor: "blue",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  loadMoreText: {
    color: "white",
    fontSize: 16,
  },
  endText: {
    textAlign: "center",
    padding: 10,
    color: "gray",
  },
});

export default ImageListScreen;
