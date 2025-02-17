import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Modal, 
  TextInput, 
  Button 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const products = [
  { id: '1', name: 'Honda Win 110', description: 'Classic and reliable commuter bike', price: 12, voucher: 5, quantity: 4, location: 'Ho Chi Minh', image: 'https://cdn.riderly.com/storage/media/img/bikes/Honda__Win_110.png' },
  { id: '2', name: 'Yamaha Exciter 135', description: 'Sporty and powerful for city rides', price: 15, voucher: 10, quantity: 3, location: 'Hanoi', image: 'https://cdn.riderly.com/storage/media/img/bikes/Yamaha__Exciter_135.png' },
  { id: '3', name: 'Honda XR 150', description: 'Off-road adventure motorbike', price: 18, voucher: 8, quantity: 2, location: 'Da Nang', image: 'https://cdn.riderly.com/storage/media/img/bikes/honda__xr%20150.png' },
  { id: '4', name: 'Honda CB150X', description: 'Touring and adventure-ready', price: 22, voucher: 5, quantity: 5, location: 'Hue', image: 'https://cdn.riderly.com/storage/media/img/bikes/Honda__CB150X.png' },
  { id: '5', name: 'Honda Winner X 150cc', description: 'A powerful underbone motorcycle', price: 20, voucher: 7, quantity: 4, location: 'Nha Trang', image: 'https://cdn.riderly.com/storage/media/img/bikes/Honda__Winner_X_150cc.png' },
  { id: '6', name: 'Yamaha Sirius 115', description: 'Fuel-efficient and compact bike', price: 10, voucher: 15, quantity: 6, location: 'Can Tho', image: 'https://cdn.riderly.com/storage/media/img/bikes/Yamaha__Sirius_115.png' },
  { id: '7', name: 'Honda Wave 110', description: 'Affordable and easy to ride', price: 9, voucher: 10, quantity: 7, location: 'Vung Tau', image: 'https://cdn.riderly.com/storage/media/img/bikes/Honda__Wave_110.png' },
  { id: '8', name: 'Honda Vision 110', description: 'Lightweight and city-friendly', price: 13, voucher: 5, quantity: 4, location: 'Da Lat', image: 'https://cdn.riderly.com/storage/media/img/bikes/Honda__Vision_110_2015.png' },
  { id: '9', name: 'Yamaha Exciter 135', description: 'Sporty and sleek performance', price: 15, voucher: 10, quantity: 3, location: 'Hai Phong', image: 'https://cdn.riderly.com/storage/media/img/bikes/Yamaha__Exciter_135.png' },
  { id: '10', name: 'Honda PCX 125', description: 'Premium scooter with comfort', price: 25, voucher: 0, quantity: 2, location: 'Phu Quoc', image: 'https://cdn.riderly.com/storage/media/img/bikes/Honda__PCX_125_2.png' },
];

export default function ShoppingCart() {
  // Using cart for displaying and motorbikes for updating.
  const [cart, setCart] = useState(products.map(product => ({ ...product, quantity: 1, selected: false })));
  const [motorbikes, setMotorbikes] = useState(products);
  const [selectedBike, setSelectedBike] = useState(null);
  // Set initial modalVisible to false so it isn't displayed on load.
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  
  // Function to open the modal for a specific bike.
  const openModal = (bike) => {
    setSelectedBike(bike);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBike(null);
  };

  const updateMotorbike = () => {
    setMotorbikes((prevBikes) =>
      prevBikes.map((bike) => (bike.id === selectedBike.id ? selectedBike : bike))
    );
    closeModal();
  };

  const updateQuantity = (id, amount) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item));
  };

  const toggleSelection = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const deleteSelectedItems = () => {
    setCart(cart.filter(item => !item.selected));
  };

  const total = cart.reduce((sum, item) => sum + (item.selected ? item.price * item.quantity : 0), 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Manage Rental</Text>
      </View>

      <FlatList
        // Only display items from 0 to visibleCount.
        data={cart.slice(0, visibleCount)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.infoContainer}>
              <View style={styles.row}>
                <Text style={styles.productName}>{item.name}</Text>
                {/* Open the modal for editing when the pencil icon is pressed */}
                <TouchableOpacity onPress={() => openModal(item)}>
                  <Ionicons name="pencil" size={32} color="blue" style={styles.checkbox} />
                </TouchableOpacity>
              </View>
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.row}>
                <Text style={styles.price}>{item.price} $</Text>
                <View style={styles.quantityControl}>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                    <Ionicons name="remove-circle-outline" size={24} color="black" />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                    <Ionicons name="add-circle-outline" size={24} color="blue" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
      {/* Modal for updating motorbike */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Motorbike</Text>
            {selectedBike && (
              <>
                <Image source={{ uri: selectedBike.image }} style={styles.modalImage} />
                <TextInput
                  style={styles.input}
                  value={selectedBike.image}
                  onChangeText={(text) => setSelectedBike({ ...selectedBike, image: text })} 
                  placeholder="Image URL"
                />
                <TextInput
                  style={styles.input}
                  value={selectedBike.name}
                  onChangeText={(text) => setSelectedBike({ ...selectedBike, name: text })} 
                  placeholder="Name"
                />
                <TextInput
                  style={styles.input}
                  value={selectedBike.description}
                  onChangeText={(text) => setSelectedBike({ ...selectedBike, description: text })} 
                  placeholder="Description"
                />
                <TextInput
                  style={styles.input}
                  value={String(selectedBike.price)}
                  keyboardType="numeric"
                  onChangeText={(text) => setSelectedBike({ ...selectedBike, price: Number(text) })}
                  placeholder="Price per day"
                />
                <TextInput
                  style={styles.input}
                  value={String(selectedBike.voucher)}
                  keyboardType="numeric"
                  onChangeText={(text) => setSelectedBike({ ...selectedBike, voucher: Number(text) })}
                  placeholder="Voucher (%)"
                />
                <TextInput
                  style={styles.input}
                  value={String(selectedBike.quantity)}
                  keyboardType="numeric"
                  onChangeText={(text) => setSelectedBike({ ...selectedBike, quantity: Number(text) })}
                  placeholder="Quantity"
                />
                <TextInput
                  style={styles.input}
                  value={selectedBike.location}
                  onChangeText={(text) => setSelectedBike({ ...selectedBike, location: text })} 
                  placeholder="Location"
                />

                <View style={styles.buttonContainer}>
                  <Button title="Update" onPress={updateMotorbike} />
                  <Button title="Cancel" color="red" onPress={closeModal} />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
        {/* "See more" button to load additional 4 items */}
        {visibleCount < cart.length && (
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={() => setVisibleCount(prev => Math.min(prev + 4, cart.length))}
        >
          <Text style={styles.seeMoreText}>See more</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,backgroundColor : 'red', padding: 20, backgroundColor: 'white' , width : '100%' },
  header: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10, display: 'flex' },
  title: { fontSize: 40, fontWeight: 'bold', textAlign: 'center', display: 'flex' },
  deleteButton: { backgroundColor: 'blue', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 5 },
  deleteText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  product: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
  image: { width: 200, height: 200, marginRight: 10, borderRadius: 5 },
  infoContainer: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  checkbox: { marginRight: 10 },
  productName: { fontSize: 25, fontWeight: 'bold', flex: 1, marginBottom: 10 },
  description: { fontSize: 20, color: 'gray', marginBottom: 10 },
  price: { fontSize: 25, color: 'red', fontWeight: 'bold', marginBottom: 10 },
  quantityControl: { flexDirection: 'row', alignItems: 'center' },
  quantity: { marginHorizontal: 10, fontSize: 25 },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#eee', marginTop: 10 },
  totalText: { fontSize: 32, fontWeight: 'bold' },
  totalAmount: { fontSize: 32, fontWeight: 'bold', color: 'red' },
  checkoutButton: { backgroundColor: 'blue', padding: 15, alignItems: 'center', borderRadius: 5, marginTop: 10, width: '40%', marginHorizontal: 'auto' },
  seeMoreText: { color: 'white', fontSize: 32, fontWeight: 'bold' },
  
  // Modal styles
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' },
  modalTitle: { fontSize: 32, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  modalImage: { width: 150, height: 150, alignSelf: 'center', marginBottom: 10, borderRadius: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, fontSize: 18, marginBottom: 10, borderRadius: 5 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
});

