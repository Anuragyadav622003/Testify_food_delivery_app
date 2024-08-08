import React, { useState, useEffect,memo } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const RestaurantDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const [restaurant, setRestaurant] = useState(item);

  useEffect(() => {
    // Fetch additional restaurant details if needed
    // Example: Use axios to fetch data from an API
    // axios.get(`https://api.example.com/restaurants/${restaurant.id}`)
    //   .then(response => setRestaurant(response.data))
    //   .catch(error => console.error(error));
  }, [item]);

  if (!restaurant) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Order Now', { item ,restaurant})}>
      <View style={styles.menuItemContainer}>
        <Image source={{ uri: item.image }} style={styles.menuItemImage} />
        <View style={styles.menuItemInfo}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemDescription}>{item.description}</Text>
          <Text style={styles.menuItemPrice}>&#8377;{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: restaurant.image }} style={styles.headerImage} />
        <Text style={styles.headerName}>{restaurant.name}</Text>
        <Text style={styles.headerCuisine}>Cuisine: {restaurant.cuisine}</Text>
        <Text style={styles.headerAddress}>
          {restaurant.address.street}, {restaurant.address.city}, {restaurant.address.state}, {restaurant.address.zip}, {restaurant.address.country}
        </Text>
      </View>
      <FlatList
        data={restaurant.menu}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { padding: 16, alignItems: 'center' },
  headerImage: { width: 200, height: 200, borderRadius: 100 },
  headerName: { fontSize: 24, fontWeight: 'bold', marginTop: 16 },
  headerCuisine: { fontSize: 16, color: 'gray', marginTop: 8 },
  headerAddress: { fontSize: 14, color: 'gray', marginTop: 8 },
  menuItemContainer: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  menuItemImage: { width: 80, height: 80, borderRadius: 8 },
  menuItemInfo: { marginLeft: 16, justifyContent: 'center' },
  menuItemName: { fontSize: 18, fontWeight: 'bold' },
  menuItemDescription: { fontSize: 14, color: 'gray' },
  menuItemPrice: { fontSize: 16, color: 'green' },
});

export default memo(RestaurantDetailsScreen);
