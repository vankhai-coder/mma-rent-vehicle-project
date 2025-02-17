import React, { useState } from "react";
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const initialFeedback = [
  { id: "1", user: "John Doe", content: "Great service!", date: "2025-02-16", read: false, image: "https://randomuser.me/api/portraits/men/1.jpg", phone: "123-456-7890", email: "john.doe@example.com", age: 28, totalRent: 5 },
  { id: "2", user: "Jane Smith", content: "Very smooth experience!", date: "2025-02-15", read: true, image: "https://randomuser.me/api/portraits/women/2.jpg", phone: "234-567-8901", email: "jane.smith@example.com", age: 25, totalRent: 3 },
  { id: "3", user: "Alice Brown", content: "Loved the bike condition!", date: "2025-02-14", read: false, image: "https://randomuser.me/api/portraits/women/3.jpg", phone: "345-678-9012", email: "alice.brown@example.com", age: 30, totalRent: 7 },
  { id: "4", user: "Bob Martin", content: "Reasonable price!", date: "2025-02-13", read: false, image: "https://randomuser.me/api/portraits/men/4.jpg", phone: "456-789-0123", email: "bob.martin@example.com", age: 35, totalRent: 4 },
  { id: "5", user: "Chris Evans", content: "Booking was easy!", date: "2025-02-12", read: false, image: "https://randomuser.me/api/portraits/men/5.jpg", phone: "567-890-1234", email: "chris.evans@example.com", age: 40, totalRent: 6 },
  { id: "6", user: "Diana Prince", content: "The owner was helpful!", date: "2025-02-11", read: true, image: "https://randomuser.me/api/portraits/women/6.jpg", phone: "678-901-2345", email: "diana.prince@example.com", age: 27, totalRent: 8 },
  { id: "7", user: "Ethan Hunt", content: "Good communication!", date: "2025-02-10", read: false, image: "https://randomuser.me/api/portraits/men/7.jpg", phone: "789-012-3456", email: "ethan.hunt@example.com", age: 38, totalRent: 9 },
  { id: "8", user: "Fiona Carter", content: "Smooth transaction!", date: "2025-02-09", read: false, image: "https://randomuser.me/api/portraits/women/8.jpg", phone: "890-123-4567", email: "fiona.carter@example.com", age: 32, totalRent: 5 },
  { id: "9", user: "George Lucas", content: "Will rent again!", date: "2025-02-08", read: true, image: "https://randomuser.me/api/portraits/men/9.jpg", phone: "901-234-5678", email: "george.lucas@example.com", age: 45, totalRent: 10 },
  { id: "10", user: "Hannah Lee", content: "Highly recommended!", date: "2025-02-07", read: false, image: "https://randomuser.me/api/portraits/women/10.jpg", phone: "012-345-6789", email: "hannah.lee@example.com", age: 29, totalRent: 7 },
];

const ManageFeedback = () => {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [visibleCount, setVisibleCount] = useState(3);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  console.log('selected user : ', selectedUser );
  

  const markAsRead = (id) => {
    setFeedback((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const deleteFeedback = (id) => {
    setFeedback((prev) => prev.filter((item) => item.id !== id));
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, feedback.length));
  };

  const filteredFeedback = feedback.filter(
    (item) =>
      item.user.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage Feedback</Text>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by username or feedback..."
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={filteredFeedback.slice(0, visibleCount)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, item.read && styles.readCard]}>
            <TouchableOpacity onPress={() => setSelectedUser(item)}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.content}>
              <Text style={styles.user}>{item.user}</Text>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.text}>{item.content}</Text>
              <View style={styles.actions}>
                {!item.read && (
                  <TouchableOpacity onPress={() => markAsRead(item.id)} style={styles.button}>
                    <Text style={styles.buttonText}>Mark as Read</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => deleteFeedback(item.id)} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      {visibleCount < filteredFeedback.length && (
        <TouchableOpacity onPress={loadMore} style={styles.loadMore}>
          <Text style={styles.loadMoreText}>View More</Text>
        </TouchableOpacity>
      )}
      <Modal visible={!!selectedUser} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setSelectedUser(null)}
        >
          <View style={styles.modalContent}>
            {selectedUser && (
              <>
                <Image source={{ uri: selectedUser.image }} style={styles.modalImage} />
                <Text style={styles.modalUser}>{selectedUser.user}</Text>
                <Text style={styles.modalText}>Total Rent: {selectedUser.totalRent}</Text>
                <Text style={styles.modalText}>Age: {selectedUser.age}</Text>
                <TouchableOpacity onPress={() => setSelectedUser(null)} style={styles.closeButton}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f8f8f8", width: "100%" },
  heading: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginTop: 70 },
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 6, borderRadius: 10, marginTop: 30, marginBottom: 30, width: "40%", alignSelf: "center", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  searchIcon: { marginHorizontal: 5 },
  searchInput: { flex: 1, fontSize: 14, color: "#333" },
  card: { flexDirection: "row", backgroundColor: "#fff", padding: 10, borderRadius: 10, marginBottom: 10, width: "50%", alignSelf: "center", alignItems: "center", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  readCard: { backgroundColor: "#e0e0e0" },
  image: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  content: { flex: 1 },
  user: { fontSize: 16, fontWeight: "bold" },
  date: { fontSize: 12, color: "gray" },
  text: { fontSize: 14, marginVertical: 5 },
  actions: { flexDirection: "row", marginTop: 5 },
  button: { backgroundColor: "#4CAF50", padding: 5, borderRadius: 5, marginRight: 5 },
  deleteButton: { backgroundColor: "#f44336", padding: 5, borderRadius: 5 },
  buttonText: { color: "#fff", fontSize: 12 },
  loadMore: { backgroundColor: "#007bff", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 10 },
  loadMoreText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)", },
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center", width: '50%' },
  modalImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  modalUser: { fontSize: 18, fontWeight: "bold" },
  modalText: { fontSize: 16, marginVertical: 5 },
  closeButton: { marginTop: 10, backgroundColor: "#007bff", padding: 10, borderRadius: 5 }
});

export default ManageFeedback;
