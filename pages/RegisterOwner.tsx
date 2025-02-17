import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Thêm icon camera
import * as ImagePicker from "expo-image-picker";

const RegisterOwner = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    vehicleType: "",
    vehicleModel: "",
    licensePlate: "",
  });

  const [images, setImages] = useState({
    cccdFront: null as string | null,
    cccdBack: null as string | null,
    vehicleRegistration: null as string | null,
    insurance: null as string | null,
  });

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const pickImage = async (field: keyof typeof images) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Cần quyền truy cập", "Vui lòng cấp quyền để tải ảnh lên.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prev) => ({ ...prev, [field]: result.assets[0].uri }));
    }
  };

  const handleSubmit = () => {
    if (!form.fullName || !form.phone || !form.vehicleType || !form.vehicleModel || !form.licensePlate) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (!images.cccdFront || !images.cccdBack || !images.vehicleRegistration || !images.insurance) {
      Alert.alert("Thiếu thông tin", "Vui lòng tải đầy đủ các ảnh trước khi gửi.");
      return;
    }

    Alert.alert("Thành công", "Yêu cầu đăng ký đã được gửi!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚗 Đăng ký chủ phương tiện</Text>

      <InputField label="Họ và Tên" placeholder="Nhập họ và tên" value={form.fullName} onChangeText={(text) => handleInputChange("fullName", text)} />
      <InputField label="Số điện thoại" placeholder="Nhập số điện thoại" keyboardType="phone-pad" value={form.phone} onChangeText={(text) => handleInputChange("phone", text)} />
      <InputField label="Loại phương tiện" placeholder="Ví dụ: Ô tô, Xe máy" value={form.vehicleType} onChangeText={(text) => handleInputChange("vehicleType", text)} />
      <InputField label="Mẫu xe" placeholder="Ví dụ: Toyota Vios 2023" value={form.vehicleModel} onChangeText={(text) => handleInputChange("vehicleModel", text)} />
      <InputField label="Biển số xe" placeholder="Nhập biển số xe" value={form.licensePlate} onChangeText={(text) => handleInputChange("licensePlate", text)} />

      <UploadField label="Ảnh CCCD (Mặt trước)" image={images.cccdFront} onPickImage={() => pickImage("cccdFront")} />
      <UploadField label="Ảnh CCCD (Mặt sau)" image={images.cccdBack} onPickImage={() => pickImage("cccdBack")} />
      <UploadField label="Ảnh Giấy đăng ký xe" image={images.vehicleRegistration} onPickImage={() => pickImage("vehicleRegistration")} />
      <UploadField label="Ảnh Bảo hiểm xe" image={images.insurance} onPickImage={() => pickImage("insurance")} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>📩 Gửi yêu cầu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const InputField = ({ label, value, placeholder, keyboardType, onChangeText }: { label: string; value: string; placeholder: string; keyboardType?: "default" | "phone-pad"; onChangeText: (text: string) => void }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} placeholder={placeholder} keyboardType={keyboardType || "default"} value={value} onChangeText={onChangeText} />
  </View>
);

const UploadField = ({ label, image, onPickImage }: { label: string; image: string | null; onPickImage: () => void }) => (
  <View style={styles.uploadContainer}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity style={styles.uploadButton} onPress={onPickImage}>
      {image ? <Image source={{ uri: image }} style={styles.image} /> : <Ionicons name="camera" size={40} color="#888" />}
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#F8F9FA", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#2C3E50" },
  inputContainer: { width: "100%", marginBottom: 15 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5, color: "#2C3E50" },
  input: { backgroundColor: "#FFF", padding: 12, borderRadius: 12, fontSize: 16, borderColor: "#DDD", borderWidth: 1, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
  uploadContainer: { width: "100%", marginBottom: 20, alignItems: "center" },
  uploadButton: { width: 120, height: 120, backgroundColor: "#E0E0E0", justifyContent: "center", alignItems: "center", borderRadius: 60, overflow: "hidden", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
  image: { width: "100%", height: "100%", borderRadius: 60 },
  button: { backgroundColor: "#27AE60", padding: 15, borderRadius: 12, marginTop: 20, width: "100%", alignItems: "center", shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 5, elevation: 3 },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
});

export default RegisterOwner;
