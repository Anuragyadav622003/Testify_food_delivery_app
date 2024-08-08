import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const AlertMessages = ({ message, onClose }) => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      if (message === 'User registered successfully') {
        navigation.navigate('SignIn');
      }
      if (message === 'Successfully Login') {
        navigation.navigate('Main');
      }
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer when the component unmounts
  }, [message, onClose, navigation]);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalView}>
        <Image 
          source={message === 'User registered successfully' || message === 'Successfully Login' 
            ? require('../../assets/checkmark.png') 
            : require('../../assets/cross.png')} 
          style={styles.modalImage} 
        />
        <Text style={styles.modalText}>{message}</Text>
     
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
});

export default AlertMessages;
