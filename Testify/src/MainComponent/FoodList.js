import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import Iconicons from 'react-native-vector-icons/Ionicons';
import { getFoodProduct } from './productAPi';
import { addToCart } from '../CartScreen/CartApi';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const FoodList = () => {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [foodApi, setFoodApi] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFoodProducts = async () => {
      try {
        const response = await getFoodProduct();
        setFoodApi(response);
        setFilteredProducts(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFoodProducts();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = foodApi.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredProducts(newData);
    } else {
      setFilteredProducts(foodApi);
    }
  };

  const toggleLike = (id) => {
    setLikedItems((prevLikedItems) => ({
      ...prevLikedItems,
      [id]: !prevLikedItems[id],
    }));
  };

  const handleAddToCart = async (item) => {
    console.log('Add to Cart', item);
    const response = await addToCart(item);
    console.log(response);
  };

  const renderItem = ({ item }) => (
    
      <Card containerStyle={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{item.name}</Text>
            <Pressable onPress={() => toggleLike(item.id)}>
              <Iconicons
                name={likedItems[item.id] ? 'heart' : 'heart-outline'}
                size={24}
                color={likedItems[item.id] ? 'red' : 'gray'}
              />
            </Pressable>
          </View>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.buttonContainer}>
            <Text style={styles.price}>₹{item.price}</Text>
            <View style={styles.buttonsContainer}>
              <Button
                title="Buy"
                icon={
                  <Icon
                    name="arrow-right"
                    size={10}
                    color="white"
                    style={{ marginRight: 5 }}
                    type="font-awesome-5"
                  />
                }
                buttonStyle={styles.buyButton}
                onPress={() => navigation.navigate('Payment', { product: item })}
              />
              <Button
                title="Add to Cart"
                icon={
                  <Icon
                    name="cart-plus"
                    size={10}
                    color="white"
                    style={{ marginRight: 5 }}
                    type="font-awesome-5"
                  />
                }
                buttonStyle={styles.addToCartButton}
                onPress={() => handleAddToCart(item)}
              />
            </View>
          </View>
        </View>
      </Card>
   
  );

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Searchbar
          style={styles.searchBar}
          placeholder="Search food products..."
          value={search}
          onChangeText={(text) => handleSearch(text)}
        />
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
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
  searchBar: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    elevation: 5,
  },
  cardGradient: {
    borderRadius: 15,
    marginBottom: 20,
    elevation: 5,
  },
  card: {
    padding: 0,
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  content: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buyButton: {
    backgroundColor: '#0288D1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 25,
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 25,
    marginLeft: 10,
  },
});

export default FoodList;
