import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from './src/UserAuth/SignIn';
import SignUpScreen from './src/UserAuth/SignUp';
import Home from './src/MainComponent/Home';
import Profile from './src/MainComponent/Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import RestorantScreen from './src/Restorant/RestorantScreen';
import FoodList from './src/MainComponent/FoodList';
import PaymentForm from './src/PaymentGatway.js/Payment';
import {  ActivityIndicator, Alert, TouchableOpacity, Text } from 'react-native';
import CartScreen from './src/CartScreen/CartScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryFilter from './src/MainComponent/CategoryFilter';
import SplashScreen from './SplashScreen';
import { LinearGradient } from 'expo-linear-gradient';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="SignIn">
    <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const MainTab = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: async () => {
            // Clear AsyncStorage or perform any other logout logic here
            await AsyncStorage.removeItem('token');
            navigation.navigate('Auth'); // Navigate to Auth stack
          }
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            color: 'black',
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={focused ? 'home' : 'home-outline'} color={focused ? 'black' : color} size={size} />
          ),
          headerRight: () => (
            <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => navigation.navigate('Cart')}>
              <Icon name="cart" color="black" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="FoodItems"
        component={FoodList}
        options={{
          tabBarLabel: 'FoodItem',
          tabBarLabelStyle: {
            color: 'black',
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={focused ? 'fast-food' : 'fast-food-outline'} color={focused ? 'black' : color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            color: 'black',
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={focused ? 'person' : 'person-outline'} color={focused ? 'black' : color} size={size} />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLogout}
              style={{
                marginRight: 15,
                paddingVertical: 10,
                paddingHorizontal: 14,
                backgroundColor: 'orange',
                borderRadius: 5,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackNav = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  if (isLoading) {
    return (
      <LinearGradient
      colors={['#FF512F', '#F09819']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF512F" />
      </LinearGradient>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'SplashScreen' : 'Auth'}>
        <Stack.Screen name="SplashScreen" component = {SplashScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTab} options={{ headerShown: false }} />
        <Stack.Screen name="RestaurantScreens" component={RestorantScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={PaymentForm} options={{ headerShown: true }} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Category Filter" component={CategoryFilter}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
