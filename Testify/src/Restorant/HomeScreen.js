import React, { useState, useEffect,memo,useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

// Importing the mock data (restaurantsApi)
import { getRestaurants } from './RestorantApi'; // Adjust the path as per your project structure

const HomeScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [isLocationSearch, setIsLocationSearch] = useState(false);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    const response = await getRestaurants();
    setRestaurants(response);
  };

  const NearbyRestaurant = useCallback(async () => {
    if (!isLocationSearch) {
      try {
        const addressString = await AsyncStorage.getItem('address');
        if (addressString) {
          const address = JSON.parse(addressString);

          console.log(address.region);
          console.log(address.city);
          console.log(address.country);

          if (restaurants.length > 0) {
            const filteredByCountry = restaurants.filter(
              restaurant => restaurant.address.country.toLowerCase() === address.country.toLowerCase()
            );
            if (filteredByCountry.length > 0) {
              setRestaurants(filteredByCountry);
              console.log('Filtered by country:', filteredByCountry.length);
            }

            const filteredByState = filteredByCountry.filter(
              restaurant => restaurant.address.state.toLowerCase() === address.region.toLowerCase()
            );
            if (filteredByState.length > 0) {
              setRestaurants(filteredByState);
              console.log('Filtered by state:', filteredByState.length);
            }

            const filteredByCity = filteredByState.filter(
              restaurant => restaurant.address.city.toLowerCase() === address.city.toLowerCase()
            );
            if (filteredByCity.length > 0) {
              setRestaurants(filteredByCity);
              console.log('Filtered by city:', filteredByCity.length);
            }

            const filteredByPostalCode = filteredByCity.filter(restaurant => Math.abs(parseInt(restaurant.address.zip, 10) - parseInt(address.postalCode, 10)) < 10);

            if (filteredByPostalCode.length > 0) {
              setRestaurants(filteredByPostalCode);
              console.log('Filtered by postalcode:', filteredByPostalCode.length);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching address from AsyncStorage:', error);
      }
    } else {
      fetchRestaurants(); // Reset to original restaurant list
    }
    setIsLocationSearch(!isLocationSearch);
  },[])

  const updateSearch = (text) => {
    setSearch(text);
    const filteredRestaurants = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(text.toLowerCase())
    );
    setRestaurants(filteredRestaurants);
  };

  const renderRestaurant = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Menu', { item })}>
      <LinearGradient colors={['#ffffff', '#f2f2f2']} style={styles.cardGradient}>
        <View style={styles.restaurantContainer}>
          <Image source={{ uri: item.image }} style={styles.restaurantImage} />
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
            <Text style={styles.restaurantRating}>Rating: {item.rating}</Text>
            <Text style={styles.restaurantAddress}>
              {item.address.street}, {item.address.city}, {item.address.state}, {item.address.zip}, {item.address.country}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <View style={styles.searchBarWrapper}>
          <Searchbar
            placeholder="Search for restaurants..."
            onChangeText={updateSearch}
            value={search}
            style={styles.searchBar}
            inputStyle={styles.searchBarInput}
            icon={() => <Icon name="search" size={24} color="#666" />}
          />
          <TouchableOpacity style={styles.locationIcon} onPress={NearbyRestaurant}>
            <Icon name={isLocationSearch ? "location" : "location-outline"} size={24} color={isLocationSearch ? "#1E90FF" : "#666"} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={restaurants}
          renderItem={renderRestaurant}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFF', // Background color for Searchbar wrapper
    borderRadius: 10, // Rounded corners for wrapper
    paddingHorizontal: 8, // Padding for wrapper
  },
  searchBar: {
    flex: 1,
    backgroundColor: 'transparent', // Transparent background for Searchbar
  },
  searchBarInput: {
    color: '#333333', // Text color for Searchbar input
  },
  locationIcon: {
    padding: 8,
  },
  cardGradient: {
    borderRadius: 15,
    marginBottom: 16,
    elevation: 3,
    overflow: 'hidden',
  },
  restaurantContainer: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  restaurantInfo: {
    marginLeft: 16,
    justifyContent: 'center',
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333', // Text color for restaurant name
  },
  restaurantCuisine: {
    fontSize: 14,
    color: '#666666', // Text color for cuisine type
  },
  restaurantRating: {
    fontSize: 14,
    color: '#ffa500', // Text color for rating
    marginTop: 4,
  },
  restaurantAddress: {
    fontSize: 14,
    color: '#666666', // Text color for address
    marginTop: 4,
    flexWrap: 'wrap',
  },
});

export default memo(HomeScreen);
