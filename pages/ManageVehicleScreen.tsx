import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, Alert } from 'react-native';

// Định nghĩa kiểu dữ liệu cho phương tiện
interface Vehicle {
  id: number;
  name: string;
  type: string;
  image: string; // URL hoặc local path của hình ảnh
}

const ManageVehicleScreen = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 1,
      name: 'Toyota Corolla',
      type: 'Sedan',
      image: 'https://th.bing.com/th/id/OIP.k-lb14raKtVkGUyUddp6TgHaE7?w=247&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', // Đường dẫn hình ảnh
    },
    {
      id: 2,
      name: 'Honda Civic',
      type: 'Sedan',
      image: 'https://th.bing.com/th/id/OIP.CU5e7F6JD0vXfEutLQlZpAHaEY?w=326&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    },
    {
      id: 3,
      name: 'Ford Mustang',
      type: 'Coupe',
      image: 'https://th.bing.com/th?id=OIP.OU1jcG5o6RNCWd6jCSeEhwHaDy&w=269&h=200&c=12&rs=1&p=0&o=6&dpr=1.3&pid=23.1',
    },
  ]);

  const handleDeleteVehicle = (id: number) => {
    // Xóa phương tiện dựa trên ID
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Vehicles</Text>

      {/* Hiển thị danh sách phương tiện */}
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.vehicleCard}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>Name: {item.name}</Text>
            <Text>Type: {item.type}</Text>
            <Button title="Delete" onPress={() => handleDeleteVehicle(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  vehicleCard: {
    backgroundColor: '#f4f4f4',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default ManageVehicleScreen;
