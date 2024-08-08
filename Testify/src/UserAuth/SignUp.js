import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { registerUser } from './UserAuthApi'; // Ensure this function is correctly implemented to call your backend
import AlertMessages from './AlertMessages';

const { width } = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState(''); // New state for name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignUp = async () => {
    setMessage('');
  
    if (!name || !email || !password || !confirmPassword) {
      setMessage('Please fill all fields');
      setModalVisible(true);
      return;
    }
  
    if (!validateEmail(email)) {
      setMessage('Invalid email format');
      setModalVisible(true);
      return;
    }
  
    if (password.length < 6) {
      setMessage('Password should be at least 6 characters long');
      setModalVisible(true);
      return;
    }
  
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setModalVisible(true);
      return;
    }
  
    try {
      const formData = { name, email, password };
      const response = await registerUser(formData);
  
      if (response && response.status === 201) {
        setMessage(response.data.message); // Display success message
      } else {
        setMessage(response.data.message); // Display error message from backend
      }
      setModalVisible(true);
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again.');
      setModalVisible(true);
    }
  };
  
  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <AlertMessages message={message} onClose={() => setModalVisible(false)} />
      </Modal>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image source={require('../../assets/auth.png')} style={styles.image} />
          <Text style={styles.title}>Sign Up</Text>
          {message ? <Text style={styles.error}>{message}</Text> : null}
          
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
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
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signInButtonText}>Already have an account? Sign In</Text>
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
  success: {
    color: '#00ff00',
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
  signInButton: {
    marginTop: 20,
  },
  signInButtonText: {
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

export default SignUpScreen;
