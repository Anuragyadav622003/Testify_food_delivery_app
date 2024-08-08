import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { getRestaurants } from "../Restorant/RestorantApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getCategories } from "./productAPi";

const Home = ({ navigation }) => {
  const [nearbyRestaurant, setNearByRestaurant] = useState([]);
  const [categoriesModal, setCategoriesModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);
  useEffect(()=>{
if(categoriesModal)
{setCategoriesModal(false);
  navigation.navigate('Category Filter')
  
}
  
  },[categoriesModal])

  const fetchRestaurants = async () => {
    const response = await getRestaurants();
    setRestaurants(response);
  };

  const getCategoriesData = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoriesData();
    NearbyRestaurant();
  }, []);

  const NearbyRestaurant = async () => {
    try {
      const addressString = await AsyncStorage.getItem("address");

      if (addressString) {
        const address = JSON.parse(addressString);

        if (restaurants.length > 0) {
          const filteredByCountry = restaurants.filter(
            (restaurant) =>
              restaurant.address.country.toLowerCase() ===
              address.country.toLowerCase()
          );
          if (filteredByCountry.length > 0) {
            setNearByRestaurant(filteredByCountry);
            console.log("Filtered by country:", filteredByCountry.length);
          }

          const filteredByState = filteredByCountry.filter(
            (restaurant) =>
              restaurant.address.state.toLowerCase() ===
              address.region.toLowerCase()
          );
          if (filteredByState.length > 0) {
            setNearByRestaurant(filteredByState);
            console.log("Filtered by state:", filteredByState.length);
          }

          const filteredByCity = filteredByState.filter(
            (restaurant) =>
              restaurant.address.city.toLowerCase() ===
              address.city.toLowerCase()
          );

          if (filteredByCity.length > 0) {
            setNearByRestaurant(filteredByCity);
            console.log("Filtered by city:", filteredByCity.length);
          }

          const filteredByPostalCode = filteredByCity.filter(
            (restaurant) =>
              Math.abs(
                parseInt(restaurant.address.zip, 10) -
                parseInt(address.postalCode, 10)
              ) < 10
          );

          if (filteredByPostalCode.length > 0) {
            setNearByRestaurant(filteredByPostalCode);
            console.log("Filtered by postalcode:", filteredByPostalCode.length);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching address from AsyncStorage:", error);
    }
  };

  const handleCategoriesSelect = async (selected) => {
    await AsyncStorage.setItem('selectedCategory', selected);
    setCategoriesModal(true);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Banner/Promotions */}
      <View style={styles.bannerContainer}>
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/thumbnails/001/257/233/small/online-food-delivery-service-landing-page.jpg",
          }}
          style={styles.bannerImage}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for restaurants, dishes, or cuisines"
        />
      </View>

      {/* Categories */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryContainer}
              onPress={() => handleCategoriesSelect(category.name)}
            >
              <Image
                source={{ uri: category.image }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      
      </View>

      {/* Featured Restaurants */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Featured Restaurants</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {restaurants.map((restaurant, index) => (
            <TouchableOpacity
              key={index}
              style={styles.restaurantContainer}
              onPress={() => navigation.navigate("RestaurantScreens")}
            >
              <Image
                source={{ uri: restaurant.image }}
                style={styles.restaurantImage}
              />
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Nearby Restaurants */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {nearbyRestaurant.map((restaurant, index) => (
            <TouchableOpacity
              key={index}
              style={styles.restaurantContainer}
              onPress={() => navigation.navigate("RestaurantScreens")}
            >
              <Image
                source={{ uri: restaurant.image }}
                style={styles.restaurantImage}
              />
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Add more sections for Top Picks, New Arrivals, Special Offers, etc. */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bannerContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: 200,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryContainer: {
    alignItems: "center",
    marginRight: 20,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
  },
  restaurantContainer: {
    marginRight: 20,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  restaurantName: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
});

export default Home;
