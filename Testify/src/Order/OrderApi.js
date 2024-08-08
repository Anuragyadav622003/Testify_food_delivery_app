import axios from "axios";
import api_base_url from "../../api_base_url";
import AsyncStorage from "@react-native-async-storage/async-storage";

const placeOrder = async (deliveryName, deliveryAddress, deliveryPhoneNumber, product) => {
  try { 
    console.log(deliveryName, deliveryAddress, deliveryPhoneNumber,  product)
   
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.post(
      `${api_base_url}/placeOrder`,
      {
        deliveryName, deliveryAddress, deliveryPhoneNumber, product
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Corrected 'Bearer' spelling
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error during creating order of user', error);
    return error.response ? error.response.data : { message: error.message };
  }
};

const getUserOrder= async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.get(`${api_base_url}/getOrdersByUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error during feching order of user', error);
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

export { placeOrder, getUserOrder, updateCart, removeCartItem, clearCart };
