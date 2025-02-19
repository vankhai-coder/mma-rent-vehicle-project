import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const UpdateProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'a.nguyen@example.com',
    phone: '0123456789',
    address: 'Hà Nội, Việt Nam',
    avatar: 'https://example.com/avatar.jpg',
    licenseNumber: '123456789',
    idNumber: '123456789'
  });

  const handleUpdate = async () => {
    // Xử lý logic cập nhật thông tin
    console.log('Updated info:', userInfo);
    alert('Cập nhật thông tin thành công!');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setUserInfo({...userInfo, avatar: result.assets[0].uri});
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cập Nhật Hồ Sơ</Text>
        </View>

        {/* Avatar Section */}
        <View style={styles.avatarWrapper}>
          <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
            <Image
              source={{ uri: userInfo.avatar }}
              style={styles.avatar}
            />
            <View style={styles.cameraIcon}>
              <MaterialIcons name="photo-camera" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Input Field */}
          <View style={styles.inputContainer}>
            <FontAwesome name="user-o" size={18} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Họ và tên"
              value={userInfo.fullName}
              onChangeText={(text) => setUserInfo({...userInfo, fullName: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={18} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={userInfo.email}
              onChangeText={(text) => setUserInfo({...userInfo, email: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="phone" size={18} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              keyboardType="phone-pad"
              value={userInfo.phone}
              onChangeText={(text) => setUserInfo({...userInfo, phone: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="location-on" size={18} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Địa chỉ"
              value={userInfo.address}
              onChangeText={(text) => setUserInfo({...userInfo, address: text})}
            />
          </View>

          {/* Divider */}
          <View style={styles.sectionDivider}>
            <Text style={styles.sectionTitle}>Thông Tin Pháp Lý</Text>
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="directions-car" size={18} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Số giấy phép lái xe"
              value={userInfo.licenseNumber}
              onChangeText={(text) => setUserInfo({...userInfo, licenseNumber: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="credit-card" size={18} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Số CCCD/CMND"
              value={userInfo.idNumber}
              onChangeText={(text) => setUserInfo({...userInfo, idNumber: text})}
            />
          </View>

          {/* Update Button */}
          <TouchableOpacity onPress={handleUpdate}>
            <LinearGradient
              colors={['#4B79A1', '#283E51']}
              style={styles.updateButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Lưu Thay Đổi</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
  },
  avatarWrapper: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatarContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#4B79A1',
    borderRadius: 15,
    padding: 5,
  },
  formContainer: {
    paddingHorizontal: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    marginVertical: 25,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 5,
  },
  updateButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#4B79A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default UpdateProfileScreen;