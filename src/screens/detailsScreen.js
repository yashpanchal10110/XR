import React from "react";
import { View, Image, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { validationSchema } from "../utils/validations";


const DetailScreen = ({ route, navigation }) => {
  const { image } = route.params;

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("lastname", values.lastname);
    formData.append("phone", values.phone);

    formData.append("image", {
      uri: image.xt_image,
      name: "upload.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await axios.post(
        "https://dev3.xicomtechnologies.com/xttest/savedata.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Response:", response.data);
      Alert.alert("Success", "Data submitted successfully!");
      resetForm();
      navigation.goBack();
    } catch (error) {
      console.error("Submission Error:", error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Display Selected Image */}
      <Image source={{ uri: image.xt_image }} style={styles.image} />

      <Formik
        initialValues={{ name: "", email: "", lastname: "", phone: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Last Name"
              onChangeText={handleChange("lastname")}
              onBlur={handleBlur("lastname")}
              value={values.lastname}
            />
            {touched.lastname && errors.lastname && <Text style={styles.error}>{errors.lastname}</Text>}

            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Phone"
              keyboardType="numeric"
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
            />
            {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

// **Styles**
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetailScreen;
