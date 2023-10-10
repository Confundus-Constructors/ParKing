import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, TextInput, Button, Text, FlatList} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useAuth } from './Auth';



function MyMap() {
  const { accessToken, expirationTime, setAccessToken, setExpirationTime } = useAuth();

  const [suggestions, setSuggestions] = useState([]);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
  });
  const [mapRegion, setMapRegion] = useState({
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    latitudeDelta: 0.010,
    longitudeDelta: 0.010,
  });


  async function requestNewToken() {
    console.log('made it here')
    try {const response = await fetch('https://maps-api.apple.com/v1/token', {
      method: 'GET',
      headers: {'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkRXM1JBNlE4UzMifQ.eyJpc3MiOiJUOVE5OTVGN1dLIiwiaWF0IjoxNjk2NjA1MjYxLCJleHAiOjE3MjgwMDAwMDB9.EJxpGWWxp3TGKP11u9SJ5d2KyfNGJ4J07IP8tKZ9dD_DhCc1IunM8jF2y1AdQ_1pQSxpWtyWL_SpRVcjWeeuDQ'},
    });
    if (response.status === 200) {
      const data = await response.json();
      setAccessToken(data.accessToken);
      setExpirationTime(Date.now() + data.expiresInSeconds * 1000);
    } else {
      console.error('Token refresh failed');
    }
    } catch (error) {
      console.error('Error refreshing token', error)
    }
  }

  async function checkTokenExpirationAndRefresh() {
    if (!accessToken || Date.now() >= expirationTime) {
      await requestNewToken();
    }
  }

  const fetchAutocompleteSuggestions = async (input) => {
    try {
      const apiUrl = `https://maps-api.apple.com/v1/searchAutocomplete?q=${encodeURIComponent(input)}&resultTypeFilter=Address`;


      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }});
      if (response.status === 200) {
        const data = await response.json();
        console.log('geolog', data.results)
        if (data.results) {
          setSuggestions(data.results);
        } else {
          setSuggestions([]);
        }
      } else {
        console.error('Autocomplete request failed.');
      }
    } catch (error) {
      console.error('Error fetching autocomplete suggestions:', error);
    }
  };


  const handleGeocode = async () => {
    try {

      await checkTokenExpirationAndRefresh();

      const encodedAddress = encodeURIComponent(address);

      const apiUrl = `https://maps-api.apple.com/v1/geocode?q=${encodedAddress}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
      }});

      if (response.status === 200) {
        const data = await response.json();

        if (data.results && data.results[0] && data.results[0].coordinate) {
          const { latitude, longitude } = data.results[0].coordinate;

          setCoordinates({ latitude, longitude });

          setMapRegion({
            latitude,
            longitude,
            latitudeDelta: 0.010,
            longitudeDelta: 0.010,
          });
        } else {

          console.error('Geocoding response format is not as expected.');
        }
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleInputChange = (text) => {
    setAddress(text);
    fetchAutocompleteSuggestions(text);
  };

  const handleSuggestionTap = async (suggestion) => {
    const {latitude, longitude} = suggestion.location;
    setCoordinates({latitude, longitude});
    setMapRegion({
      latitude,
      longitude,
      latitudeDelta: 0.010,
      longitudeDelta: 0.010,
    });

    setSuggestions([]);
  };


  return (
    <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Enter an address"
      value={address}
      onChangeText={handleInputChange}
    />
    <Button title="Search" onPress={handleGeocode} />

    <FlatList
      data={suggestions}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleSuggestionTap(item)}>
          {console.log('itemlog', item)}
          <Text>{item.displayLines.join(", ")}</Text>
        </TouchableOpacity>
      )}
    />
      <MapView
        style={styles.map}
        region={mapRegion}
      >
        <Marker
            coordinate={coordinates}
            pinColor='black'
            draggable={true}
            onDragStart={(e) => {
              console.log('Drag start', e.nativeEvent.coordinates)
            }}
            onDragEnd={(e) => {
              setCoordinates({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              })
            }}
            title="Location">
        <Callout><Text>Service Location</Text></Callout>
        </Marker>
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
