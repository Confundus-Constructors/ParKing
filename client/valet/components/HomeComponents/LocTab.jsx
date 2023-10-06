import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

function MyMap() {
  const [address, setAddress] = useState(''); // State to store the user's input address
  const [coordinates, setCoordinates] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
  }); // State to store the coordinates of the geocoded address

  const handleGeocode = async () => {
    try {
      // Encode the user's input address to be used in the query
      const encodedAddress = encodeURIComponent(address);

      // Define the API endpoint URL with the address query parameter
      const apiUrl = `https://maps-api.apple.com/v1/geocode?q=${encodedAddress}`;

      // Make a GET request to the Apple Maps API
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkRXM1JBNlE4UzMifQ.eyJpc3MiOiJUOVE5OTVGN1dLIiwiaWF0IjoxNjk2NjA1MjYxLCJleHAiOjE3MjgwMDAwMDB9.EJxpGWWxp3TGKP11u9SJ5d2KyfNGJ4J07IP8tKZ9dD_DhCc1IunM8jF2y1AdQ_1pQSxpWtyWL_SpRVcjWeeuDQ`, // Replace with your Apple Maps API access token
        },
      });

      // Check if the response status is OK (200)
      if (response.status === 200) {
        const data = await response.json();

        // Extract the geocoded coordinates from the response
        if (data.results && data.results[0] && data.results[0].location) {
          const { latitude, longitude } = data.results[0].location;

          // Update the `coordinates` state with the geocoded coordinates
          setCoordinates({ latitude, longitude });
        } else {
          // Handle cases where the geocoding response doesn't contain the expected data
          console.error('Geocoding response format is not as expected.');
        }
      } else {
        // Handle non-OK response statuses (e.g., error handling)
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      // Handle any network or other errors that may occur during the request
      console.error('An error occurred:', error);
    }
  };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter an address"
        value={address}
        onChangeText={text => setAddress(text)}
      />
      <Button title="Geocode" onPress={handleGeocode} />
      <MapView
        style={styles.map}
        initialRegion={{
          ...coordinates,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
      >
        <Marker coordinate={coordinates} title="Geocoded Location" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    width: 300,
    height: 300,
  },
});


export default MyMap;
