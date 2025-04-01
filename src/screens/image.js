import React, { useEffect, useState } from "react";
import { View, FlatList, Image, TouchableOpacity, Text, ActivityIndicator, Platform } from "react-native";
import axios from "axios";

const ImageListScreen = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const fetchImages = async () => {
    if (loading || allLoaded) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("user_id", "108");
    formData.append("offset", offset.toString());
    formData.append("type", "popular");

    try {
      const response = await axios.post(
        "https://dev3.xicomtechnologies.com/xttest/getdata.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.status === "success" && response.data.images.length > 0) {
        const secureImages = response.data.images.map((img) => ({
          ...img,
          xt_image: img.xt_image.startsWith("http:") ? img.xt_image.replace("http:", "https:") : img.xt_image,
        }));

        setImages((prevImages) => [...prevImages, ...secureImages]);
        setOffset((prevOffset) => prevOffset + 1);
      } else {
        setAllLoaded(true);
      }
    } catch (error) {
      console.error("Axios Error:", error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchImages(); // Fetch first batch of images on mount
  }, []);

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#f0f0f0" }}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => `${item.id || index}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("DetailScreen", { image: item })}
            style={{ marginBottom: 10 }}
            activeOpacity={0.7}
          >
            <Image
              source={{ uri: item.xt_image }}
              style={{
                width: "100%",
                height: 200, // Fixed height
                resizeMode: "cover", // Ensures aspect ratio is maintained
                borderRadius: Platform.OS === "ios" ? 10 : 0,
              }}
            />
          </TouchableOpacity>
        )}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : !allLoaded ? (
            <TouchableOpacity
              onPress={fetchImages}
              style={{
                padding: 12,
                backgroundColor: Platform.OS === "ios" ? "#007AFF" : "blue",
                borderRadius: 8,
                alignItems: "center",
                marginVertical: 10,
              }}
              activeOpacity={0.7}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Click here to load more</Text>
            </TouchableOpacity>
          ) : (
            <Text style={{ textAlign: "center", padding: 10, color: "gray" }}>
              No more images to load
            </Text>
          )
        }
      />
    </View>
  );
};

export default ImageListScreen;
