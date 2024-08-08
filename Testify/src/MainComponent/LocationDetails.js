// LocationDetails.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationDetails = () => {
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        // Get current location
        let location = await Location.getCurrentPositionAsync({});
  console.log(location.coords.latitude),
  console.log(location.coords.longitude)
        // Reverse geocode to get address details
        let geocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        // Log geocode results for debugging
        console.log('Geocode results:', geocode);

        if (geocode.length > 0) {
          setAddress(geocode[0]);
console.log(address)
          // Store address in AsyncStorage
          await AsyncStorage.setItem('address', JSON.stringify(geocode[0]));
        } else {
          setErrorMsg('Unable to fetch address details');
        }
      } catch (error) {
        setErrorMsg('Error fetching location details');
        console.error(error);
      }
    })();
  }, []);

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.header}>Location Details</Text>
  //     {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
  //     {address && (
  //       <View style={styles.addressContainer}>
  //         <Text>Country: <Text style={styles.textValue}>{address.country}</Text></Text>
  //         <Text>Region (State): <Text style={styles.textValue}>{address.region}</Text></Text>
  //         <Text>City: <Text style={styles.textValue}>{address.city}</Text></Text>
  //         <Text>District: <Text style={styles.textValue}>{address.district || address.subregion || 'N/A'}</Text></Text>
  //         <Text>Postal Code: <Text style={styles.textValue}>{address.postalCode}</Text></Text>
  //         <Text>Street: <Text style={styles.textValue}>{address.street || address.name}</Text></Text>
  //         <Text>Full Address: <Text style={styles.textValue}>{address.name}</Text></Text>
  //       </View>
  //     )}
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  addressContainer: {
    marginTop: 10,
  },
  textValue: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default LocationDetails;
