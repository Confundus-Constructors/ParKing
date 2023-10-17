import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, TextInput, Button, Text, FlatList, KeyboardAvoidingView} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useAuth } from './Auth';
import { MyContext } from './DynamicTabs';
import AddGarages from './AddGarages';


function MyMap() {
  const [selectedPinCoordinate, setSelectedPinCoordinate] = useState(null);
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
  const [tempPin, setTempPin] = useState(null);
  const [additionalPins, setAdditionalPins] = useState([]);

  const handleAddPin = (coords) => {
    console.log('Setting tempPin to:', coords);

    setTempPin(coords)
    setSelectedPinCoordinate(coords);
}


useEffect(() => {
  let isMounted = true;
  async function fetchInitialData() {
    const token = await checkTokenExpirationAndRefresh();
      if (isMounted) {
          defaultLocationGeo(defaultCityState, token);
      }
  }

  fetchInitialData();

  return () => {
    isMounted = false;
  };
}, []);


  async function requestNewToken() {
    try {
        const response = await fetch('http://localhost:3000/requestNewToken');
        if (response.status === 200) {
            const data = await response.json();
            setAccessToken(data.accessToken);
            setExpirationTime(Date.now() + data.expiresInSeconds * 1000);
            return data.accessToken;
        } else {
            console.error('Error fetching token from my server');
        }
    } catch (error) {
        console.error('Error fetching token', error);
    }
}


  async function checkTokenExpirationAndRefresh() {
    console.log('Yo yo yo')
    let newToken = accessToken
    if (!accessToken || Date.now() >= expirationTime) {
      newToken = await requestNewToken();
    }
    return newToken;
  }

  const defaultLocationGeo = async (searchLocation, token) => {
    try {

      await checkTokenExpirationAndRefresh();

      const encodedAddress = encodeURIComponent(searchLocation);


      const apiUrl = `https://maps-api.apple.com/v1/geocode?q=${encodedAddress}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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

      const searchLocation = mapRegion.latitude + ',' + mapRegion.longitude;
      console.log('ij', searchLocation)

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
            latitude: 37.7749,
            longitude: -122.4194,
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

  const handleBluePinDragEnd = (event, index) => {
    const newCoordinate = event.nativeEvent.coordinate;
    // const updatedPins = [...additionalPins];

    // if (index >= 0 && index < updatedPins.length) {
    //   updatedPins[index] = newCoordinate;
    // } else {
    //   updatedPins.push(newCoordinate);
    // }

    // setAdditionalPins(updatedPins);
    setSelectedPinCoordinate(newCoordinate);
    // setTempPin(null)
  };





  return (
    <KeyboardAvoidingView style={styles.container} behavior='position' enabled={true}>
    <TouchableOpacity onPress={() => checkTokenExpirationAndRefresh()}>
    <TextInput
      style={styles.input}
      placeholder="Enter Service Location Address"
      value={address}
      onChangeText={handleInputChange}
    />
    </TouchableOpacity>
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
    {accessToken && (
      <MapView
        style={styles.map}
        region={mapRegion}
      >
        <Marker
            coordinate={coordinates}
            pinColor='#49111c'
            draggable={true}
            onPress={() => setSelectedPinCoordinate(coordinates)}
            onDrag={(e) => setSelectedPinCoordinate(e.nativeEvent.coordinate)}
            onDragStart={(e) => {
              console.log('Drag start', e.nativeEvent.coordinates)
            }}
            onDragEnd={(e) => {
              setCoordinates({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
              setSelectedPinCoordinate(e.nativeEvent.coordinate);
            }}
            title="Location">
        <Callout><Text>Service Location</Text></Callout>
        </Marker>
        {tempPin && (
            <Marker
                pinColor='#967d68'
                title="Parking Location"
                draggable
                coordinate={tempPin}
                onPress={() => setSelectedPinCoordinate(tempPin)}
                onDrag={(e) => setSelectedPinCoordinate(e.nativeEvent.coordinate)}
                onDragEnd={(e) => handleBluePinDragEnd(e)}
            />
                )}
            {additionalPins.map((pin, index) => (
                <Marker
                  key={index}
                  pinColor='blue'
                  title="Parking Location"
                  onPress={() => setSelectedPinCoordinate(pin)}
                  coordinate={pin}
                   />
                   ))}
            </MapView>
             )}
            {selectedPinCoordinate && (
            <View style={{padding: 10}}>
                <Text>Latitude: {selectedPinCoordinate.latitude.toFixed(6)}</Text>
                <Text>Longitude: {selectedPinCoordinate.longitude.toFixed(6)}</Text>
            </View>

)}
    <TouchableOpacity onPress={() => checkTokenExpirationAndRefresh()}>
           <View style={{alignItems: 'center'}}>
            <AddGarages setAdditionalPins={setAdditionalPins} setTempPin={setTempPin} tempPin={tempPin} checkTokenExpirationAndRefresh={checkTokenExpirationAndRefresh} mapRegion={mapRegion} onAdd={handleAddPin} accessToken={accessToken} selectedPinCoordinate={selectedPinCoordinate} />
            </View>
      </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  map: {
    width: 350,
    height: 320,
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
  input: {
    height: 40,
    borderWidth: 0.5,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingHorizontal: 10,
  }

});


export default MyMap;
