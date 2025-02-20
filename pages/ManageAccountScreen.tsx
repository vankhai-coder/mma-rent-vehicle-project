import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';

// Định nghĩa kiểu dữ liệu cho tài khoản
interface Account {
  id: number;
  username: string;
  email: string;
  role: string;
}

const ManageAccountScreen = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, username: 'admin1', email: 'admin1@example.com', role: 'Admin' },
    { id: 2, username: 'user1', email: 'user1@example.com', role: 'User' },
    { id: 3, username: 'user2', email: 'user2@example.com', role: 'User' },
  ]);

  const handleDeleteAccount = (id: number) => {
    // Xóa tài khoản dựa trên ID
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Accounts</Text>

      {/* Hiển thị danh sách tài khoản */}
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.accountCard}>
            <Text>Username: {item.username}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Role: {item.role}</Text>
            <Button title="Delete" onPress={() => handleDeleteAccount(item.id)} />
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
    width : '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  accountCard: {
    backgroundColor: '#f4f4f4',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ManageAccountScreen; // Đảm bảo rằng bạn đã export component này đúng cách
