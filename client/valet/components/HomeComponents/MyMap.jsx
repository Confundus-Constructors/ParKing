import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, TextInput, Text, FlatList, SafeAreaView} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useAuth } from './Auth';
import AddGarages from './AddGarages';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapPin, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-elements';


function MyMap({route}) {
  const defaultCityState = route.params?.defaultCityState;
  const [selectedPinCoordinate, setSelectedPinCoordinate] = useState(null);
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
          console.log('response', response)
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

        if (data.results && data.results[0] && data.results[0].coordinate) {
          const { latitude, longitude } = data.results[0].coordinate;

          setMapRegion({ latitude, longitude, latitudeDelta: 0.0010,
            longitudeDelta: 0.010});
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

      const apiUrl = `https://maps-api.apple.com/v1/searchAutocomplete?q=${encodeURIComponent(input)}&resultTypeFilter=Address&searchLocation=${searchLocation}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }});
      if (response.status === 200) {
        const data = await response.json();
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
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0040,
            longitudeDelta: 0.0040,
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
    checkTokenExpirationAndRefresh(),
    setAddress(text);
    fetchAutocompleteSuggestions(text);
  };

  const handleSuggestionTap = async (suggestion) => {
    const {latitude, longitude} = suggestion.location;
    const [street] = suggestion.displayLines
    setAddress(street);
    setCoordinates({latitude, longitude});
    setMapRegion({
      latitude,
      longitude,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004,
    });
    setSuggestions([]);
  };

  const formatAddress = (item) => {
    const cityState = item.displayLines[1].split(', ').slice(0, 2);
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

        <View>
          <Text style={{fontSize: 19}}>{item.displayLines[0]}</Text>
          <Text style={{fontSize: 16}}>{cityState.join(', ')}</Text>
        </View>

      {/* <View style={{flexDirection: 'row'}}>
        <View>
          <Text style={{color:'gray'}}>{item.location.latitude.toFixed(6)} N</Text>
          <Text style={{color:'gray'}}>{item.location.longitude.toFixed(6)} W</Text>
        </View> */}
      {/* </View> */}
    </View>
    )
  };
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Account')
   }

  const handleBluePinDragEnd = (event, index) => {
    const newCoordinate = event.nativeEvent.coordinate;
    setSelectedPinCoordinate(newCoordinate);
  };


  return (<>

    <View style={styles.container} behavior='position' enabled={true}>
    <TextInput
      style={styles.input}
      placeholder="Enter Service Location Address"
      value={address}
      onChangeText={handleInputChange}
      placeholderTextColor='#5A5A5A'
    />

    { suggestions.length > 0 && (
    <View style={styles.overlay}>
    <FlatList
      style={{marginTop: 160}}
      data={suggestions}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.suggestionContainer} onPress={() => handleSuggestionTap(item)}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>{formatAddress(item)}</Text>
            <View style={{flexDirection: 'row'}}>
              <View>
              <Text style={{color:'gray'}}>{item.location.latitude.toFixed(6)} N</Text>
              <Text style={{color:'gray'}}>{item.location.longitude.toFixed(6)} W</Text>
              </View>
              <FontAwesomeIcon icon={faMapPin} size={25} color="#49111c" />
            </View>
           </View>
        </TouchableOpacity>
        )}
    />
    </View>
    )}

    {accessToken && (
      <MapView
        style={styles.map}
        region={mapRegion}
      >
        <SafeAreaView style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <View style={{marginLeft: 20, marginTop: -20}}>
          <Button color="#49111c"
          titleStyle={{color: "#5A5A5A", fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}
            buttonStyle={{
            backgroundColor: "white",
            borderRadius: 20,
            height: 40,
            width: 40,
          }}
          title='&#8592;' onPress={handleBack}/>
        </View>
        {selectedPinCoordinate && (
            <View style={{marginTop: -20, marginRight: 5}}>
                <Text>{selectedPinCoordinate.latitude.toFixed(6)} N</Text>
                <Text>{selectedPinCoordinate.longitude.toFixed(6)} W</Text>
            </View>

)}
        </SafeAreaView>
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

    <TouchableOpacity onPress={() => checkTokenExpirationAndRefresh()}>
           <View style={{alignItems: 'center'}}>
            <AddGarages setAdditionalPins={setAdditionalPins} setTempPin={setTempPin} tempPin={tempPin} checkTokenExpirationAndRefresh={checkTokenExpirationAndRefresh} mapRegion={mapRegion} onAdd={handleAddPin} accessToken={accessToken} selectedPinCoordinate={selectedPinCoordinate} />
            </View>
         </TouchableOpacity>
      </View>
      </>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  suggestionContainer: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: 60,
    width: '100%'
  },
  overlay: {
    zIndex: 2,
    marginTop: 0,
        ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    marginTop: 100,
    zIndex: 3,
    backgroundColor: 'white',
    width: '85%',
    height: 50,
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'flex-start',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'System',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    width: 33,
    height: 33,
    borderRadius: 15,
    margin: 10,
  }
});


export default MyMap;
