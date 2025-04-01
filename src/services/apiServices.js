import axios from "axios";

export const fetchImages = async (offset) => {
  try {
    const formData = new FormData();
    formData.append("user_id", "108");
    formData.append("offset", offset.toString());
    formData.append("type", "popular");

    const response = await axios.post("https://dev3.xicomtechnologies.com/xttest/getdata.php", formData, { headers: { "Content-Type": "multipart/form-data" } });
    return response.data.status === "success" ? response.data.images : [];
  } catch (error) {
    console.error("Axios Error:", error);
    return [];
  }
};

export const submitFormData = async (values, imageUri) => {
  try {
    await axios.post("https://dev3.xicomtechnologies.com/xttest/savedata.php", values);
    return true;
  } catch (error) {
    console.error("Submission Error:", error);
    return false;
  }
};
