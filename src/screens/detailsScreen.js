import React from "react";
import { View, Image, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import { Formik } from "formik";
import { validationSchema } from "../utils/validations";
import { submitFormData } from "../services/apiServices";

const DetailScreen = ({ route, navigation }) => {
  const { image } = route.params;
  const secureImageUri = image.xt_image.startsWith("http:") 
    ? image.xt_image.replace("http:", "https:") 
    : image.xt_image;

  const handleSubmit = async (values, { resetForm }) => {
    const success = await submitFormData(values, secureImageUri);
    if (success) {
      Alert.alert("Success", "Data submitted successfully!");
      resetForm();
      navigation.goBack();
    } else {
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: secureImageUri }} style={styles.image} />

      <Formik initialValues={{ name: "", email: "", lastname: "", phone: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            {["name", "email", "lastname", "phone"].map((field, index) => (
              <View key={index}>
                <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter ${field}`}
                  keyboardType={field === "email" ? "email-address" : "default"}
                  onChangeText={handleChange(field)}
                  onBlur={handleBlur(field)}
                  value={values[field]}
                />
                {touched[field] && errors[field] && <Text style={styles.error}>{errors[field]}</Text>}
              </View>
            ))}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#f9f9f9", padding: 20, alignItems: "center" },
  image: { width: "100%", aspectRatio: 16 / 9, borderRadius: 10, marginBottom: 20 },
  formContainer: { width: "100%", backgroundColor: "#fff", padding: 20, borderRadius: 10, elevation: 3 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, fontSize: 16, marginBottom: 10 },
  error: { color: "red", fontSize: 14, marginBottom: 10 },
  button: { backgroundColor: "#007bff", padding: 15, borderRadius: 5, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default DetailScreen;
