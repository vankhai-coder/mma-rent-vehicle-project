import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Sử dụng Expo Icons

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Dữ liệu giả lập danh sách xe (ảnh cục bộ)
  const vehicles = [
    { id: "1", name: "Car Model 1", price: "$20,000", location: "Da Nang", image: require("../assets/vinfast.png") },
    { id: "2", name: "Car Model 2", price: "$22,500", location: "Da Nang", image: require("../assets/vinfast.png") },
    { id: "3", name: "Car Model 3", price: "$18,000", location: "Da Nang", image: require("../assets/vinfast.png") },
    { id: "4", name: "Car Model 4", price: "$25,000", location: "Da Nang", image: require("../assets/vinfast.png") },
    { id: "5", name: "Car Model 5", price: "$18,000", location: "Da Nang", image: require("../assets/vinfast.png") },
    { id: "6", name: "Car Model 6", price: "$25,000", location: "Da Nang", image: require("../assets/vinfast.png") },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search vehicle"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
      </View>

      {/* Vehicle List (Grid) */}
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        numColumns={2} 
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.vehicleCard}>
            <Image 
              source={typeof item.image === "string" ? { uri: item.image } : item.image}
              style={styles.vehicleImage} 
            />
            <Text style={styles.vehicleName}>{item.name}</Text>
            <Text style={styles.vehiclePrice}>{item.price}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="#555" />
              <Text style={styles.vehicleLocation}>{item.location}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5A9FE3",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop : 25,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  vehicleCard: {
    width: "48%",  
    backgroundColor: "#c7d9ec",
    borderRadius: 10,
    margin: 5, 
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1, 
  },
  vehicleImage: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  vehiclePrice: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  vehicleLocation: {
    fontSize: 14,
    color: "#555",
    marginLeft: 5,
  },
});

export default SearchScreen;
