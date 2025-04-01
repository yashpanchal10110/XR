import React, { useEffect, useState } from "react";
import { View, FlatList, Image, TouchableOpacity, Text, ActivityIndicator, Platform } from "react-native";
import axios from "axios";

const ImageListScreen = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [imageDimensions, setImageDimensions] = useState({}); // Store dimensions dynamically
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false); 

  const fetchImages = async () => {
    if (loading || allLoaded) return; // Prevent duplicate API calls
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

    //   console.log("API Response:", response.data);

      if (response.data.status === "success" && response.data.images.length > 0) {
        setImages((prevImages) => [...prevImages, ...response.data.images]);
        setOffset((prevOffset) => prevOffset + 1);
      } else {
        setAllLoaded(true);
      }
    } catch (error) {
    //   console.error("Axios Error:", error.message);
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
                height: imageDimensions[item.xt_image] ? imageDimensions[item.xt_image] : 200, // Default height
                resizeMode: "contain",
                borderRadius: Platform.OS === "ios" ? 10 : 0,
              }}
              onLoad={(event) => {
                const { width, height } = event.nativeEvent.source;
                setImageDimensions((prev) => ({
                  ...prev,
                  [item.xt_image]: (height / width) * 300, // Dynamic height calculation
                }));
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
