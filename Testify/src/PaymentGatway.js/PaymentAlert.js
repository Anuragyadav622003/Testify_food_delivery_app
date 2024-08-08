import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PaymentAlert() {
  const { width, height } = useWindowDimensions();
const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={[styles.gradient, { width, height }]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.text, { fontSize: width * 0.1 }]}>Payment</Text>
          <Text style={[styles.text, { fontSize: width * 0.1 }]}>Successful</Text>
        </View>
        <Image source={require('../../assets/checkmark.png')} style={[styles.image, { width: width * 0.5, height: height * 0.3 }]} />
        <TouchableOpacity style={[styles.btn, { paddingHorizontal: width * 0.1, paddingVertical: height * 0.02 }]} onPress={()=>navigation.navigate('Profile')}>
          <Text style={[styles.btnText, { fontSize: width * 0.05 }]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: '5%',
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  header: {
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  image: {
    resizeMode: 'contain',
  },
  btn: {
    backgroundColor: 'white',
    borderRadius: 50,
  },
  btnText: {
    fontWeight: '500',
  },
});

