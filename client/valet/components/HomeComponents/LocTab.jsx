import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, TextInput, Button, Text, FlatList} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useAuth } from './Auth';
import { MyContext } from './DynamicTabs';



function MyMap() {
  const {defaultCityState} = React.useContext(MyContext)
  const [defaultLocation, setDefaultLocation] = useState('USA')
  const { accessToken, expirationTime, setAccessToken, setExpirationTime } = useAuth();

  const [suggestions, setSuggestions] = useState([]);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({});
  const [mapRegion, setMapRegion] = useState({
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    latitudeDelta: 0.010,
    longitudeDelta: 0.010,
  });

  useEffect(() => {
    checkTokenExpirationAndRefresh()
  }, [])

  async function requestNewToken() {
    try {
        const response = await fetch('/requestNewToken');
        if (response.status === 200) {
            const data = await response.json();
            setAccessToken(data.accessToken);
            setExpirationTime(Date.now() + data.expiresInSeconds * 1000);
        } else {
            console.error('Error fetching token from my server');
        }
    } catch (error) {
        console.error('Error fetching token', error);
    }
}


  async function checkTokenExpirationAndRefresh() {
    if (!accessToken || Date.now() >= expirationTime) {
      await requestNewToken();
    }
  }
  useEffect(() => {
    console.log('useeffectlog', defaultCityState)
    defaultLocationGeo(defaultCityState)}, [])

  const defaultLocationGeo = async (searchLocation) => {
    try {

      await checkTokenExpirationAndRefresh();

      const encodedAddress = encodeURIComponent(searchLocation);

      const apiUrl = `https://maps-api.apple.com/v1/geocode?q=${encodedAddress}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
      }});

      if (response.status === 200) {
        const data = await response.json();
        console.log('datalog', data.results[0].coordinate)

        if (data.results && data.results[0] && data.results[0].coordinate) {
          const { latitude, longitude } = data.results[0].coordinate;
          console.log('latlong', latitude, longitude)

          setMapRegion({ latitude, longitude, latitudeDelta: 0.050,
            longitudeDelta: 0.050});
        } else {
          console.alert('There was an error with default location')
        }
      }}
      catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
      }
    };


  const fetchAutocompleteSuggestions = async (input) => {
    try {

      // const getLocation = await defaultLocationGeo(defaultCityState);
      const searchLocation = mapRegion.latitude + ',' + mapRegion.longitude;


      const apiUrl = `https://maps-api.apple.com/v1/searchAutocomplete?q=${encodeURIComponent(input)}&resultTypeFilter=Address&searchLocation=${searchLocation}`;


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


  const handleGeocode = async (searchLocation) => {
    try {

      await checkTokenExpirationAndRefresh();

      const encodedAddress = encodeURIComponent(address);

      console.log('encoced', encodedAddress
      )

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
    setAddress(formatAddress(suggestion.displayLines));
    setCoordinates({latitude, longitude});
    setMapRegion({
      latitude,
      longitude,
      latitudeDelta: 0.010,
      longitudeDelta: 0.010,
    });

    setSuggestions([]);
  };

  const formatAddress = (displayLines) => {
    const cityState = displayLines[1].split(', ').slice(0, 2);
    return displayLines[0] + ', ' + cityState.join(', ');
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
    <View style={styles.overlay}>
    <FlatList
      data={suggestions}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.suggestionContainer} onPress={() => handleSuggestionTap(item)}>
          <Text>{formatAddress(item.displayLines)}</Text>
        </TouchableOpacity>
      )}
    />
    </View>
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
  suggestionContainer: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 0,
  },
  overlay: {
    zIndex: 2,
    position: 'absolute',
    top: 25,  // TextInput Height
    left: 0,
    right: 0,
    maxHeight: 520,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',  // semi-transparent background
  },

});


export default MyMap;
