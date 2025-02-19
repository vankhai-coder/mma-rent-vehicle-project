import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import component : 
import ManageFeedback from './pages/ManageFeedback';
import ManageRental from './pages/ManageRentals'
import SearchScreen from './pages/SearchScreen';
import SignUpScreen from './pages/SignUpScreen';
import VehicleDetailScreen from './pages/VehicleDetailScreen';
import BookingHistory from './pages/BookingHistory';
import RegisterOwner from './pages/RegisterOwner';


export default function App() {
  return (
    <View style={styles.container}>
      {/* VAN KHAI :   */}
      {/* <ManageFeedback /> */}
      {/* <ManageRental /> */}

      {/* Thai Bao :  */}
      <SearchScreen />
      {/* <SignUpScreen /> */}
      {/* <VehicleDetailScreen /> */}

      {/* Phuong  : */}
      {/* <BookingHistory /> */}
      {/* <RegisterOwner /> */}

      {/* Duc Hoan :  */}
      

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
