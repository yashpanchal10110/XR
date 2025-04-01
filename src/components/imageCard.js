import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, StyleSheet, View, ActivityIndicator, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const ImageCard = ({ imageUrl, onPress }) => {
  const [imageHeight, setImageHeight] = useState(200); // Default height
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (imageUrl) {
      // Get the image dimensions to calculate aspect ratio
      Image.getSize(
        imageUrl,
        (imageWidth, imageHeight) => {
          const aspectRatio = imageWidth / imageHeight;
          const calculatedHeight = width / aspectRatio; // Dynamically calculate height based on aspect ratio
          setImageHeight(calculatedHeight); // Update state with the calculated height
          setLoading(false);
        },
        () => setLoading(false) // Handle errors gracefully
      );
    }
  }, [imageUrl]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.cardContainer}>
      {loading ? (
        // Show loading spinner while the image is loading
        <View style={[styles.image, { height: imageHeight }]}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        // Display image with dynamic height
        <Image source={{ uri: imageUrl }} style={[styles.image, { height: imageHeight }]} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: "hidden", // To avoid content overflow if image is too large
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: width - 20, // Ensure the image takes the full width of the screen (with padding)
    borderRadius: 12,
    resizeMode: "cover", // Maintain aspect ratio and fit the image properly
  },
});

export default ImageCard;
