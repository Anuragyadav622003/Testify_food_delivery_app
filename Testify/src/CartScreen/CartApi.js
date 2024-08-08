import axios from "axios";
import api_base_url from "../../api_base_url";
import AsyncStorage from "@react-native-async-storage/async-storage";

const addToCart = async (item) => {
  try { 
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.post(
      `${api_base_url}/addToCart`,
      {
        productId: item._id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Corrected 'Bearer' spelling
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error adding item to cart', error);
    return error.response ? error.response.data : { message: error.message };
  }
};

const getCartItem = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.get(`${api_base_url}/getUserCart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting cart item', error);
    return error.response ? error.response.data : { message: error.message };
  }
};

const updateCart = async (itemId, quantity) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.post(
      `${api_base_url}/updateCartItem`,
      {
        itemId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating cart item', error);
    return error.response ? error.response.data : { message: error.message };
  }
};

const clearCart = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.post(
      `${api_base_url}/removeUserCart`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error clearing cart', error);
    return error.response ? error.response.data : { message: error.message };
  }
};

const removeCartItem = async (id) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.post(
      `${api_base_url}/removeCartItem`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error removing cart item', error);
    return error.response ? error.response.data : { message: error.message };
  }
};

export { addToCart, getCartItem, updateCart, removeCartItem, clearCart };
