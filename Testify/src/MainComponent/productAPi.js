import axios from "axios";
import api_base_url from "../../api_base_url";




const getFoodProduct = async()=>{
  try {
    const response = await axios.get(`${api_base_url}/getFoodProduct`);
  
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};


 const getCategories = async () => {
  try {
    const response = await axios.get(`${api_base_url}/getCategory`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export {getFoodProduct,getCategories};