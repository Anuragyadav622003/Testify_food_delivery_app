import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Banner = () => {
    return (
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.banner}
        >
          <Image 
            source={{ uri: 'https://img.freepik.com/premium-photo/delivery-man-courier-riding-scooter-service-fast-food-box-phone-app-concept-vector_1199132-72405.jpg?w=900' }} 
            style={styles.bannerImage} 
          />
          <Text style={styles.bannerText}>Your Shopping Cart</Text>
          <Text style={styles.bannerText}>Order Now</Text>
        </LinearGradient>
      );
    };
    
    const styles = StyleSheet.create({
      banner: {
        width: '98%',
        height: "30%",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderRadius: 16,
        overflow: "hidden",
        margin: 10,
      },
      bannerImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: 16,
        opacity: 0.8,
      },
      bannerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        zIndex: 1,
      },
    });

export default Banner;
