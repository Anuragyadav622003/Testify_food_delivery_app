import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { loginUser } from './UserAuthApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertMessages from './AlertMessages';

const { width } = Dimensions.get('window');

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSignIn = async () => {
    setMessage('');

    if (!email || !password) {
      setMessage('Please enter email and password');
      return;
    }

    try {
      const formData = { email, password };
      const response = await loginUser(formData);

      if (response && response.status === 200) {
        await AsyncStorage.setItem('token', response.data.token);
        setMessage(response.data.message);
        setModalVisible(true);
        // navigation.navigate('Main');
      } else if (response && response.status === 400) {
        setMessage(response.data.message);
        setModalVisible(true);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error logging in');
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.gradient}
    >
      <Modal visible={isModalVisible} onRequestClose={() => setModalVisible(false)} transparent={true}>
        <AlertMessages message={message} onClose={() => setModalVisible(false)} />
      </Modal>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image source={require('../../assets/auth.png')} style={styles.image} />
          <Text style={styles.title}>Sign In</Text>
          {message ? <Text style={styles.error}>{message}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          {/* <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Sign in with Google')}>
              <Image source={require('../../assets/google-icon.webp')} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Sign in with Facebook')}>
              <Image source={require('../../assets/facebook.webp')} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Sign in with Email')}>
              <Image source={require('../../assets/email.webp')} style={styles.socialIcon} />
            </TouchableOpacity>
          </View> */}
          <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupButtonText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  error: {
    color: '#ff3d00',
    marginBottom: 20,
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    padding: 5,
  },
  socialIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  signupButton: {
    marginTop: 20,
  },
  signupButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 30,
    resizeMode: 'contain',
  },
});

export default SignInScreen;
