import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Modal, Dimensions, TouchableHighlight } from 'react-native';
import { Input, Button, Card, Text, Avatar } from 'react-native-elements';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PaymentAlert from './PaymentAlert';
import { placeOrder } from '../Order/OrderApi';

const { width } = Dimensions.get('window');

const PaymentForm = () => {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryPhoneNumber, setDeliveryPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [quantity, setQuantity] = useState('1'); // New state variable for quantity
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isFailureModalVisible, setFailureModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const item = await AsyncStorage.getItem('BuyItem');
        if (item) {
          const parsedItem = JSON.parse(item);
          if (parsedItem) {
            setProduct(parsedItem);
          } else {
            console.error("Parsed item is null");
          }
        } else {
          console.error("No item found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching product from AsyncStorage:", error);
      }
    })();
  }, []);

  const handleStoreCurrentLocation = async () => {
    try {
      const currentLocationAddress = await AsyncStorage.getItem('address');
      if (currentLocationAddress) {
        const parsedAddress = JSON.parse(currentLocationAddress);
        if (parsedAddress && parsedAddress.formattedAddress) {
          setDeliveryAddress(parsedAddress.formattedAddress);
        } else {
          console.error("Parsed address or formattedAddress is null");
        }
      } else {
        setDeliveryAddress(''); // Fallback address
      }
    } catch (error) {
      console.error("Error fetching address from AsyncStorage:", error);
    }
  };

  const postOrder = async () => {
    try {
      const response = await placeOrder(deliveryName, deliveryAddress, deliveryPhoneNumber, { ...product, quantity });
      console.log(response);
    } catch (error) {
      console.log("error placing order", error);
    }
  };

  const handlePayment = () => {
    if (!validateInputs()) {
      setFailureModalVisible(true);
      return;
    }

    // Simulate a successful payment
    setTimeout(() => {
      postOrder();
      setSuccessModalVisible(true);
    }, 1000); // Simulating a delay for payment processing
  };

  const validateInputs = () => {
    if (!name || !cardNumber || !expiryDate || !cvv || !deliveryName || !deliveryPhoneNumber || !deliveryAddress) {
      return false;
    }
    if (!/^\d{16}$/.test(cardNumber)) return false; // Simple card number validation
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) return false; // Simple expiry date validation
    if (!/^\d{3}$/.test(cvv)) return false; // Simple CVV validation
    return true;
  };

  const clearForm = () => {
    setName('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setDeliveryName('');
    setDeliveryPhoneNumber('');
    setDeliveryAddress('');
    setQuantity('1');
  };

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.productInfo}>
          <Avatar
            size="xlarge"
            rounded
            source={{ uri: product.image }}
            containerStyle={styles.avatar}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>
        </View>

        <Card containerStyle={styles.card}>
          <Text style={styles.cardTitle}>Delivery Details</Text>
          <Input
            placeholder="Name"
            value={deliveryName}
            onChangeText={setDeliveryName}
            leftIcon={<FontAwesome name="user" size={24} color="#0288D1" />}
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            placeholderTextColor="#999"
          />
          <Input
            placeholder="Phone Number"
            keyboardType="numeric"
            value={deliveryPhoneNumber}
            onChangeText={setDeliveryPhoneNumber}
            leftIcon={<FontAwesome name="phone" size={24} color="#0288D1" />}
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            placeholderTextColor="#999"
          />
          <Input
            placeholder="Delivery Address"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
            leftIcon={<MaterialIcons name="location-on" size={24} color="#0288D1" />}
            rightIcon={<FontAwesome name="location-arrow" size={24} color="#0288D1" onPress={handleStoreCurrentLocation} />}
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            placeholderTextColor="#999"
          />
        </Card>

        <Card containerStyle={styles.card}>
          <Text style={styles.cardTitle}>Payment Details</Text>
          <Input
            placeholder="Name on Card"
            value={name}
            onChangeText={setName}
            leftIcon={<FontAwesome name="user" size={24} color="#0288D1" />}
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            placeholderTextColor="#999"
          />
          <Input
            placeholder="Card Number"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
            leftIcon={<FontAwesome name="credit-card" size={24} color="#0288D1" />}
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            placeholderTextColor="#999"
          />
          <Input
            placeholder="Expiry Date (MM/YY)"
            value={expiryDate}
            onChangeText={setExpiryDate}
            leftIcon={<FontAwesome name="calendar" size={24} color="#0288D1" />}
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            placeholderTextColor="#999"
          />
          <Input
            placeholder="CVV"
            keyboardType="numeric"
            value={cvv}
            onChangeText={setCvv}
            leftIcon={<FontAwesome name="lock" size={24} color="#0288D1" />}
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            placeholderTextColor="#999"
          />
          <Input
            placeholder="Quantity"
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
            leftIcon={<FontAwesome name="sort-numeric-asc" size={24} color="#0288D1" />}
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            placeholderTextColor="#999"
          />
          <Button
            title={`Pay ₹${product.price * quantity}`}
            onPress={handlePayment}
            buttonStyle={styles.payButton}
          />
        </Card>

        <Modal
          visible={isSuccessModalVisible}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setSuccessModalVisible(false)}
        >
  
           
              <PaymentAlert />

            
       
        </Modal>

        <Modal
          visible={isFailureModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setFailureModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Payment Failed. Please try again.</Text>
              <TouchableHighlight
                style={styles.closeButton}
                onPress={() => setFailureModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  productDescription: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 5,
  },
  card: {
    width: width - 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0288D1',
  },
  input: {
    color: '#333',
  },
  inputContainer: {
    marginBottom: 10,
  },
  payButton: {
    backgroundColor: '#0288D1',
    borderRadius: 5,
    marginVertical: 10,
  },
  successModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  successModalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  closeButton: {
    backgroundColor: '#0288D1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
});

export default PaymentForm;
