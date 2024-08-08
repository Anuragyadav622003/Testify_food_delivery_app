import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Modal, TouchableOpacity } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import StepIndicator from 'react-native-step-indicator';
import { getUserOrder } from '../Order/OrderApi';
import OrderDetailsScreen from '../Order/OrderDetailsScreen';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    name: '',
    email:'',
    deliveryAddresses: [],
    orderHistory: [],
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserOrder();
        console.log("response  =>", response);

        // Mapping the API response to match the user state structure
        const mappedOrders = response.orders.map((order) => ({
          id: order._id,
          orderNumber: order.orderNumber,
          date: order.createdAt,
          items: order.items.map((item) => ({
            name: item.product.name,
            price: item.product.price,
            image: item.product.image,
          })),
          total: order.totalAmount,
          status: order.status,
          deliveryAddress: order.deliveryAddress,
          deliveryName:order.deliveryName,
        }));

        // Assuming deliveryAddresses are also fetched from the backend and present in the response
        const deliveryAddresses = response.orders.map((order) => ({
          id: order._id,
          address: order.deliveryAddress,
        }));
        

        setUser((prevUser) => ({
          ...prevUser,
          name:response.auth[0].name,
          email:response.auth[0].email,
          orderHistory: mappedOrders,
          deliveryAddresses: deliveryAddresses,
        }));
      } catch (error) {
        console.error('Error fetching user orders:', error);
        // Handle error state, for example, by showing an error message or retrying the fetch
      }
    };

    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 2 * 60 * 1000); // Fetch every 10 minutes

    return () => {
      // Cleanup on unmount
      clearInterval(interval);
    };
  }, [],[user]);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalVisible(false);
  };

  const formatTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes().toString().padStart(2, '0'); // Ensure minutes are always two digits
    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours}:${minutes} ${period}`;
  };

  const renderOrderItem = ({ item }) => (
    <Card style={styles.orderItem}>
      <Card.Content>
        <View style={styles.orderHeader}>
          <Title style={styles.orderNumber}>Order #{item?.orderNumber?.substring(0,6)}</Title>
          <View>
            <Paragraph>Date: {item.date.split('T')[0]}</Paragraph>
            <Paragraph>Time: {formatTime(item.date)}</Paragraph>
          </View>
        </View>
        {item.items.map((product, index) => (
          <View key={index} style={styles.orderProduct}>
            <TouchableOpacity onPress={() => openModal(item)}>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>Price: &#8377;{product.price.toFixed(2)}</Text>
            </View>
          </View>
        ))}
        <Text style={styles.orderTotal}>Total: &#8377;{item.total.toFixed(2)}</Text>
        <Text style={styles.orderStatus}>Status: {item.status}</Text>
        <StepIndicator
          customStyles={stepIndicatorStyles}
          currentPosition={getStatusIndex(item.status)}
          stepCount={statuses.length}
          labels={statuses}
        />
      </Card.Content>
    </Card>
  );

  const renderHeader = () => (
    <View>
      <Card style={styles.profileHeader}>
        <Card.Content>
          <Title style={styles.name}>{user.name}</Title>
          <Paragraph style={styles.email}>{user.email}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Delivery Addresses</Title>
          {user.deliveryAddresses.map((address) => (
            <Paragraph key={address.id} style={styles.address}>{address.address}</Paragraph>
          ))}
          {/* <Button
            mode="contained"
            onPress={() => {}}
            style={styles.button}
          >
            Add New Address
          </Button> */}
        </Card.Content>
      </Card>

      <Title style={styles.sectionTitle}>Order History</Title>
    </View>
  );

  const renderFooter = () => (
    <Card style={styles.orderPlacementSection}>
      <Card.Content>
        <Title style={styles.sectionTitle}>Place New Order</Title>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("FoodItems")}
          style={styles.placeOrderButton}
        >
          Select Items to Order
        </Button>
      </Card.Content>
    </Card>
  );

  // Define your step indicator styles
  const stepIndicatorStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#4aae4f',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#4aae4f',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#4aae4f',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#4aae4f',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#4aae4f',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 12,
    currentStepLabelColor: '#4aae4f',
  };

  // Define your order statuses
  const statuses = ['Order Placed', 'Order Confirmed', 'Order Processed', 'Ready to Pickup', 'Delivered'];

  // Function to get index of status for step indicator
  const getStatusIndex = (status) => {
    return statuses.indexOf(status);
  };

  return (
    <LinearGradient
      colors={['#FFDEE9', '#B5FFFC']}
      style={styles.gradient}
    >
      <FlatList
        data={user.orderHistory}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.container}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={closeModal}
      >
         <OrderDetailsScreen selectedOrder={selectedOrder} closeModal={closeModal} />
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  profileHeader: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3, // Add elevation for Android shadow
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#777',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3, // Add elevation for Android shadow
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  address: {
    marginBottom: 5,
    color: '#555',
  },
  orderItem: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3, // Add elevation for Android shadow
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  orderNumber: {
    fontWeight: 'bold',
    color: '#4aae4f',
  },
  orderProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    color: '#777',
  },
  orderTotal: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  orderStatus: {
    color: '#777',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#4aae4f', // Add background color for iOS consistency
  },
  orderPlacementSection: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3, // Add elevation for Android shadow
  },
  placeOrderButton: {
    marginTop: 10,
    backgroundColor: '#4aae4f', // Add background color for iOS consistency
  },
});

export default ProfileScreen;
