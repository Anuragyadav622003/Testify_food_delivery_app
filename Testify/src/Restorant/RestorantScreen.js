
import { createStackNavigator } from '@react-navigation/stack';
import RestaurantDetailsScreen from './RestorantDetails';
import React, { memo } from 'react'
import HomeScreen from './HomeScreen';


import CartScreen from '../CartScreen/CartScreen';
import OrderNow from './OrderNow';

const Stack = createStackNavigator();
const RestorantScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Restaurants">
    <Stack.Screen name="Restaurants" component={HomeScreen}   options={{ headerShown: true }}/>
    <Stack.Screen name="Menu" component={RestaurantDetailsScreen} options={{ headerShown: true }}/>
    <Stack.Screen name="Cart Screen" component={CartScreen} options={{ headerShown: true }}/>
   
    <Stack.Screen name="Order Now" component={OrderNow}  options={({ navigation }) => ({
            headerShown: true,
            // headerRight: () => (
            //   <TouchableOpacity onPress={() => navigation.navigate('Cart Screen')} style={{paddingRight:10}}>
            //     <Icon name="cart" size={25} color="#000" style={{ marginLeft: 15 }} />
            //   </TouchableOpacity>
            // ),
            title: 'Order Now',
          })}/>

  </Stack.Navigator>
  )
}

export default memo(RestorantScreen);