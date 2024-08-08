import React, { memo } from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');

const OrderNow = ({ route }) => {
  const { item, restaurant } = route.params;
  const navigation = useNavigation();
  const BuyNow = async (item) => {
    try {
      await AsyncStorage.setItem('BuyItem', JSON.stringify(item));
      navigation.navigate('Payment');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.menuItemImage} />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Buy Now"
            buttonStyle={styles.buyButton}
            titleStyle={styles.buttonTitle}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#6e45e2', '#88d3ce'], // Purple to turquoise
              start: { x: 0, y: 0 },
              end: { x: 1, y: 0 },
            }}
            onPress={() => BuyNow(item)}
          />
        </View>
      </View>
      <View style={styles.restaurantContainer}>
        <Text style={styles.restaurantHeader}>Ordered from</Text>
        <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <Text style={styles.restaurantCuisine}>Cuisine: {restaurant.cuisine}</Text>
        <Text style={styles.restaurantAddress}>
          {restaurant.address.street}, {restaurant.address.city}, {restaurant.address.state}, {restaurant.address.zip}, {restaurant.address.country}
        </Text>
        <Text style={styles.restaurantContact}>Contact: {restaurant.contact}</Text>
        <Text style={styles.restaurantRating}>Rating: {restaurant.rating}</Text>
        <Text style={styles.restaurantHours}>Hours: {restaurant.openingHours}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  itemContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  menuItemImage: {
    width: width * 0.9,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  itemDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buyButton: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  buttonTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  restaurantContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  restaurantHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  restaurantCuisine: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  restaurantAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  restaurantContact: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  restaurantRating: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  restaurantHours: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default memo(OrderNow);
