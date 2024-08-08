// api/auth.js

import axios from 'axios';
import api_base_url from '../../api_base_url';
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${api_base_url}/register`, formData);
    return response;
  } catch (error) {
    if (error.response) {
      // Return the error response from the backend
      return error.response;
    }
    throw error;
  }
};
export const loginUser = async (userData) => {
  try { console.log("login",userData)
    const response = await axios.post(`${api_base_url}/login`, userData);

    return response;
  } catch (error) {
    if (error.response) {
      // Return the error response from the backend
      return error.response;
    }throw error;
  }
};
