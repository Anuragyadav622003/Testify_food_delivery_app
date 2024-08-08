import axios from "axios";
import api_base_url from "../../api_base_url";


 export const getRestaurants=async()=>{
try { console.log("hello")
  const response = await axios.get(`${api_base_url}/get_restaurants`);
 
  return response.data;
} catch (error) {
  return error.response.data;
}
 };


 export const addRestItemToCart  = async(item)=>{
try {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.post(
    `${api_base_url}/addRestToCart`,
    {
    item
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Corrected 'Bearer' spelling
      },
    }
  );

} catch (error) {
  console.log("error in add to resto item",error)
}

 };