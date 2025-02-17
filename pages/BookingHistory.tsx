import React, { useState } from "react";
import { View, Text, FlatList, RefreshControl, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

const BookingHistory = () => {
  // Dữ liệu giả lập đơn đặt xe
  const [bookings, setBookings] = useState([
    { id: "1", vehicle: "Honda Vision 2023", date: "12/02/2024", price: "300,000 VND", status: "Hoàn thành" },
    { id: "2", vehicle: "Yamaha Exciter 155", date: "10/02/2024", price: "500,000 VND", status: "Đang xử lý" },
    { id: "3", vehicle: "Toyota Vios 2021", date: "08/02/2024", price: "1,200,000 VND", status: "Đã hủy" },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  // Làm mới danh sách
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  // Màu trạng thái đơn hàng
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hoàn thành":
        return "#4CAF50"; // Xanh lá
      case "Đang xử lý":
        return "#FFC107"; // Vàng
      case "Đã hủy":
        return "#F44336"; // Đỏ
      default:
        return "#000";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch sử đặt xe</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Text style={styles.vehicleName}>{item.vehicle}</Text>
            <Text style={styles.info}>📅 Ngày đặt: {item.date}</Text>
            <Text style={styles.info}>💰 Giá: {item.price}</Text>
            <Text style={[styles.status, { color: getStatusColor(item.status) }]}>⚡ {item.status}</Text>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F5F5F5"  , width : '100%'},
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  card: { marginVertical: 8, padding: 16, borderRadius: 10 },
  vehicleName: { fontSize: 18, fontWeight: "bold" },
  info: { color: "#666", marginVertical: 2 },
  status: { fontWeight: "bold", marginTop: 8 },
});

export default BookingHistory;
