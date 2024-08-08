import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StepIndicator from 'react-native-step-indicator';

const OrderDetailsScreen = ({ selectedOrder, closeModal }) => {

  const formatTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours}:${minutes} ${period}`;
  };

  const statuses = ['Order Placed', 'Order Confirmed', 'Order Processed', 'Ready to Pickup', 'Delivered'];

  const getStatusIndex = (status) => {
    return statuses.indexOf(status);
  };

  const getIconForStatus = (status) => {
    switch (status) {
      case 'Order Placed':
        return 'hourglass-outline';
      case 'Order Confirmed':
        return 'checkmark-done-outline';
      case 'Order Processed':
        return 'create-outline';
      case 'Ready to Pickup':
        return 'bicycle-outline';
      case 'Delivered':
        return 'checkmark-done';
      default:
        return 'alert-circle-outline';
    }
  };

  const getStatusDescription = (status) => {
    switch (status) {
      case 'Order Placed':
        return 'We have received your order.';
      case 'Order Confirmed':
        return 'Your order has been confirmed.';
      case 'Order Processed':
        return 'We are preparing your order.';
      case 'Ready to Pickup':
        return 'Your order is ready for pickup.';
      case 'Delivered':
        return 'successfully delivered your order.';
      default:
        return 'Unknown status.';
    }
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderProduct}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>Price: ₹{item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIcon} onPress={closeModal}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Track Order</Text>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headingContainer}>
          <View style={styles.heading}>
            <Text style={styles.headingText}>Estimated Time</Text>
            <Text style={styles.headingValue}>30 minutes</Text>
          </View>
          <View style={styles.heading}>
            <Text style={styles.headingText}>Order Number</Text>
            <Text style={styles.headingValue}>#{selectedOrder.orderNumber.substring(0, 6)}</Text>
          </View>
        </View>
        <View style={styles.scheduleContainer}>
          <View style={styles.schedule}>
            <Text style={styles.scheduleText}>Order Placed Date</Text>
            <Text style={styles.scheduleDate}>{selectedOrder.date.split('T')[0]}</Text>
          </View>
          <View style={styles.schedule}>
            <Text style={styles.scheduleText}>Order Placed Time</Text>
            <Text style={styles.scheduleTime}>{formatTime(selectedOrder.date)}</Text>
          </View>
        </View>
        <View style={styles.itemList}>
          {selectedOrder.items.map((item, index) => (
            <View key={index} style={styles.orderProduct}>
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>Price: ₹{item.price.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={[styles.stepIndicatorContainer, { height: Dimensions.get('window').height * 0.5 }]}>
          <StepIndicator
            customStyles={stepIndicatorStyles}
            currentPosition={getStatusIndex(selectedOrder.status)}
            stepCount={statuses.length}
            direction="vertical"
            labels={statuses.map((status, index) => (
              <View key={index} style={styles.stepLabel}>
                <Ionicons name={getIconForStatus(status)} size={30} color="#757575" style={styles.stepIcon} />
                <View style={styles.stepLabelTextContainer}>
                  <Text style={styles.stepText}>{status}</Text>
                  <Text style={styles.stepSubText} numberOfLines={2} >{getStatusDescription(status)}</Text>
                </View>
              </View>
            ))}
          />
        </View>
      </ScrollView>
    </View>
  );
};

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight || 0,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#4CAF50',
  },
  headerIcon: {
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  cancelButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
  },
  cancelText: {
    color: '#fff',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  heading: {
    alignItems: 'center',
  },
  headingText: {
    fontSize: 16,
    color: '#333',
  },
  headingValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  scheduleContainer: {
    padding: 10,
  },
  schedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  scheduleText: {
    color: '#777',
    fontSize: 14,
  },
  scheduleDate: {
    fontSize: 16,
    color: '#333',
  },
  scheduleTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  orderProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  itemList: {
    paddingHorizontal: 10,
  },
  stepIndicatorContainer: {
    paddingHorizontal: 20,
  },
  stepLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepIcon: {
    marginRight: 10,
  },
  stepLabelTextContainer: {
    flex: 1,
  },
  stepText: {
    fontWeight: 'bold',
    color: '#333',
  },
  stepSubText: {
    color: '#777',
    fontSize: 12,
    marginTop: 5,
  
  },
});

export default OrderDetailsScreen;
