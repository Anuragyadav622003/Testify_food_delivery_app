import React, { useEffect, useState,memo } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getFoodProduct } from './productAPi';
import { useNavigation } from '@react-navigation/native';
import { addToCart } from '../CartScreen/CartApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const CategoryFilter = () => {
  const [selected, setSelectedCategory] = useState();
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [foodApi, setFoodApi] = useState([]);
  const [likedItems, setLikedItems] = useState({});

  useEffect(() => {
    const fetchFoodProducts = async () => {
      try {
        const response = await getFoodProduct();
        setFoodApi(response);

        const categories = await AsyncStorage.getItem('selectedCategory');
        setSelectedCategory(categories);
        await AsyncStorage.removeItem("selectedCategory");
      } catch (error) {
        console.log(error);
      }
    };
    fetchFoodProducts();
  }, []);

  useEffect(() => {
    try {
      const filteredData = foodApi.filter(item =>
        item.category?.toLowerCase() === selected?.toLowerCase()
      );
      setData(filteredData);
    } catch (err) {
      console.log(err);
    }
  }, [selected, foodApi]);

  const toggleLike = (id) => {
    setLikedItems((prevLikedItems) => ({
      ...prevLikedItems,
      [id]: !prevLikedItems[id],
    }));
  };

  const BuyNow = async (item) => {
    try {
      await AsyncStorage.setItem('BuyItem', JSON.stringify(item));
      navigation.navigate('Payment');
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async (item) => {
    try {
      console.log(`Adding ${item.name} to cart`);
      const response = await addToCart(item);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{item.name}</Text>
          <TouchableOpacity onPress={() => toggleLike(item.id)}>
            <Ionicons
              name={likedItems[item.id] ? 'heart' : 'heart-outline'}
              size={24}
              color={likedItems[item.id] ? 'red' : 'gray'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.price}>₹{item.price}</Text>
          <View style={styles.buttonsContainer}>
            <Button
              title="Buy"
              icon={
                <Icon
                  name="arrow-right"
                  size={15}
                  color="white"
                  style={{ marginRight: 5 }}
                  type="font-awesome-5"
                />
              }
              buttonStyle={styles.buyButton}
              onPress={() => BuyNow(item)}
            />
            <Button
              title="Add to Cart"
              icon={
                <Icon
                  name="cart-plus"
                  size={15}
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
    <LinearGradient
      colors={['#FF8C00', '#FF00FF', '#1E90FF']}
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{selected} items</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  card: {
    padding: 0,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buyButton: {
    backgroundColor: '#0288D1',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default memo(CategoryFilter);
