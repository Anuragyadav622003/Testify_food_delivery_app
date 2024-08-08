import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { clearCart, getCartItem, removeCartItem } from './CartApi';
import Banner from './TopBanner';

const { width } = Dimensions.get('window');
const itemWidth = width * 0.95;
const imageWidth = width * 0.34;

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchUserCart();
  }, []);

  const fetchUserCart = async () => {
    try {
      const response = await getCartItem();
      const mappedData = response.map(item => ({
        id: item._id,
        name: item.productDetails.name,
        image: item.productDetails.image,
        price: item.productDetails.price,
        quantity: item.quantity,
        description: item.productDetails.description,
      }));
      setCartItems(mappedData);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const updateQuantity = (id, type) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: type === 'increment' ? item.quantity + 1 : item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = async(id)=> {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  await removeCartItem(id);
  };

  const removeAllItems = async() => {
    setCartItems([]);
    await clearCart();
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, 'decrement')}
            disabled={item.quantity === 1}
          >
            <Icon
              name='remove-circle'
              type='ionicon'
              color='#FF6347'
              size={24}
              containerStyle={styles.iconButton}
            />
          </TouchableOpacity>
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 'increment')}>
            <Icon
              name='add-circle'
              type='ionicon'
              color='#2ECC71'
              size={24}
              containerStyle={styles.iconButton}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Remove"
            onPress={() => removeItem(item.id)}
            buttonStyle={styles.removeButton}
            icon={<Icon name='trash' type='ionicon' color='white' size={20} />}
          />
          <Button
            title="Buy"
            onPress={() => console.log(`Buy ${item.name}`)} // Implement your buy action here
            buttonStyle={styles.buyButton}
            icon={<Icon name='cart' type='ionicon' color='white' size={20} />}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Banner/>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.footer}
      >
        <Text style={styles.totalText}>Total: ₹{calculateTotal()}</Text>
        <View style={styles.footerButtonContainer}>
          <Button
            title="Remove All"
            onPress={removeAllItems}
            buttonStyle={styles.footerButton}
            icon={<Icon name='trash' type='ionicon' color='white' size={20} />}
          />
          <Button
            title="Buy All"
            onPress={() => console.log('Buy All')} // Implement your buy all action here
            buttonStyle={[styles.footerButton, { backgroundColor: '#2ecc71' }]}
            icon={<Icon name='cart' type='ionicon' color='white' size={20} />}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    paddingBottom:"40%",
    
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: itemWidth,
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  itemImage: {
    width: imageWidth,
    height:"100%",
    borderRadius: 16,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FF6347',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemQuantity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  removeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FF6347',
    marginRight: 8,
  },
  buyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#2ecc71',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  footerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  iconButton: {
    padding: 8,
  },
});

export default CartScreen;
