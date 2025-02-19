import React from "react";
import {
  View, Text, Image, StyleSheet, TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const VehicleDetailScreen = () => { 
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.headerTitle}>Name vehicle</Text>
      </View>

      {/* Image of Vehicle */}
      <View style={styles.imageContainer}>
        <Image source={require('../assets/vinfast.png')} style={styles.vehicleImage} />
      </View>

      {/* Price & Detail */}
      <View style={styles.infoContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>Xe điện VF8</Text>
          <TouchableOpacity style={styles.rentButton}>
            <Text style={styles.rentButtonText}>Rent</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.priceText}>$20,000</Text>
        <Text style={styles.detailText}>
        VinFast VF 8 là mẫu SUV điện thông minh của VinFast, được ra mắt vào năm 2022 với thiết kế hiện đại, công nghệ tiên tiến và hiệu suất mạnh mẽ. Xe thuộc phân khúc D-SUV, hướng đến người dùng yêu thích xe điện với khả năng vận hành bền bỉ và thân thiện môi trường.
        </Text>
      </View>

      {/* Feedback Box */}
      {[...Array(3)].map((_, index) => (
        <View key={index} style={styles.feedbackBox}>
          <View style={styles.feedbackHeader}>
            <Ionicons name="person-circle-outline" size={50} color="#555" />
            <View style={styles.starContainer}>
              {Array(5).fill(null).map((_, index) => (
                <Ionicons key={index} name="star-outline" size={20} color="#FFD700" />
              ))}
            </View>
          </View>
          <View style={styles.feedbackDisplay}>
            <Text style={styles.feedbackText}>
              "VF 8 mang đến trải nghiệm lái tuyệt vời, công nghệ hiện đại, xứng đáng là lựa chọn hàng đầu cho xe điện tại Việt Nam!"
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5A9FE3",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop : 25
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  imageContainer: {
    width: "90%",
    height: 220,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 20,
  },
  vehicleImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  infoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  rentButton: {
    backgroundColor: "#5A9FE3",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  rentButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  detailText: {
    fontSize: 16,
    color: "#444",
    lineHeight: 22,
  },
  feedbackBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginTop : 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  feedbackHeader: {
    alignItems: 'flex-start', 
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: "row",
    marginTop: 5, 
  },
  feedbackDisplay: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#F9F9F9",
  },
  feedbackText: {
    fontSize: 14,
    color: "#333",
  },
});

export default VehicleDetailScreen;