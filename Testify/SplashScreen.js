import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Main'); // Navigate to 'Main' screen after 30 ms
    }, 5000);

    return () => clearTimeout(timer); // Clear the timer if component unmounts
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#FF512F', '#F09819']}
      style={styles.container}
    >
      <Animatable.View 
        animation="fadeIn"
        duration={1000}
        delay={500}
        style={styles.logoContainer}
      >
        <Animatable.Image 
          animation="zoomIn"
          duration={1000}
          source={require('./assets/d.jpeg')} 
          style={styles.logo} 
          onError={(error) => console.log(error.nativeEvent.error)} 
        />
      </Animatable.View>
      <Animatable.Text 
        animation="fadeInUp"
        duration={1500}
        delay={1000}
        style={styles.tagline}
      >
        QuickBite - Fast and Delicious
      </Animatable.Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    borderRadius: 125,  // Rounded logo
    borderWidth: 4,     // Border around the logo
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  tagline: {
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default SplashScreen;
