import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, TextInput, Text, FlatList, SafeAreaView} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useAuth } from './Auth';
import { AddGarages, AddPin} from './AddGarages';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapPin, faChevronLeft, faCar } from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-elements';
import carIcon from '../../../../assets/caricon.png';

function MyMap({route}) {
  const defaultCityState = route.params?.defaultCityState;
  const [selectedPinCoordinate, setSelectedPinCoordinate] = useState(null);
  const [defaultLocation, setDefaultLocation] = useState('USA')
  const { accessToken, expirationTime, setAccessToken, setExpirationTime } = useAuth();
  const pin = ['pin', 2, 4, 130, 20]
  const garage = ['garage', 4, 2, 70, 90]
  const [toggler, setToggler] = useState(pin);
  const [suggestions, setSuggestions] = useState([]);
  const [address, setAddress] = useState('');
  const [gaddress, setGaddress] = useState('');
  const [coordinates, setCoordinates] = useState({});
  const [mapRegion, setMapRegion] = useState({
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    latitudeDelta: 0.004,
    longitudeDelta: 0.004,
  });
  const [tempPin, setTempPin] = useState(null);
  const [additionalPins, setAdditionalPins] = useState([]);
  const [secondaryAddress, setSecondaryAddress] = useState('');
  const handleAddPin = (coords) => {
    setTempPin(coords)
    setSelectedPinCoordinate(coords);
}
  const [input, setInput] = useState();
  const [addy, setAddy] = useState(null)

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
    let newToken = accessToken
    if (!accessToken || Date.now() >= expirationTime) {
      newToken = await requestNewToken();
    }
    return newToken;
  }

  const defaultLocationGeo = async (searchLocation, token) => {
    try {

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

          setMapRegion({ latitude, longitude, latitudeDelta: 0.090,
            longitudeDelta: 0.090});
        } else {
          console.log('There was an error with default location')
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
          setToggler(pin)
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
    checkTokenExpirationAndRefresh(),
    setAddress(text);
    fetchAutocompleteSuggestions(text);
  };




  const handleSuggestionTap = async (suggestion) => {
    const {latitude, longitude} = suggestion.location;
    const [street] = suggestion.displayLines
    setMapRegion({
      latitude,
      longitude,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004,
    });

  if (toggler[0] === 'pin') {
    setAddress(street);
    setCoordinates({latitude, longitude});
    setSelectedPinCoordinate(suggestion.location)
    setSuggestions([]);
    } else {
      setGaddress(street);
      const formattedAddress = formatAddress(suggestion);
      handleGeocode(formattedAddress);
      handleAddPin(suggestion.location)
      setSecondaryAddress(formattedAddress);
      setSuggestions([]);
      setAddy( <View style={{flexDirection: 'row', width: '100%'}}>
        <Text style={{fontSize: 14, color: '#7f7f7f', marginTop: 5}}>{suggestion.displayLines[0]}, {suggestion.displayLines[1].split(', ').slice(0, 2).join(', ')}</Text>
      </View>)
    }
  }

  const formatAddress = (item) => {
    if (item.displayLines) {
    const cityState = item.displayLines[1].split(', ').slice(0, 2);

    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={{fontSize: 19}}>{item.displayLines[0]}</Text>
          <Text style={{fontSize: 16}}>{cityState.join(', ')}</Text>
        </View>
    </View>
    )
   }
  };
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Account')
   }

  const handleBluePinDragEnd = (event, index) => {
    const newCoordinate = event.nativeEvent.coordinate;
    setSelectedPinCoordinate(newCoordinate);
  };

  let backArrow;

  if (address.length > 0) {
    backArrow = (
      <Button color="#49111c"
      titleStyle={{color: "#5A5A5A", fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}
        buttonStyle={{
        backgroundColor: "transparent",
        borderRadius: 20,
        height: 40,
        width: 40,
      }}
      containerStyle={{ zindex: 3, position: 'absolute', marginTop: 0, left: 0}}
      title='&#x276E;' onPress={() => clearField()}/>
    )
  }

  const clearField = () => {
    setSuggestions([]);
    setAddress([])
  }

  const clearField2 = () => {
    setSuggestions([]);
    setGaddress([])
    setTempPin(null)
    setAddy(null)
  }

  return (
    <>
    <View style={styles.container}>
    <View style={{zIndex:3, position: 'absolute', top: "93%", left: '5%',  shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2}}>
      <Button color="#49111c"
          titleStyle={{color: "#5A5A5A", fontWeight: 'bold', fontSize: 16 }}
            buttonStyle={{
            backgroundColor: "white",
            borderRadius: 20,
            height: 40,
            width: 70,
          }}
          containerStyle={{ zindex: 3, position: 'absolute', marginTop: 0, left: 0}}
          title='Done' onPress={handleBack}/>
     </View>

{selectedPinCoordinate && <View style={styles.nwComponent}>
      <Text style={styles.nwtext}>{selectedPinCoordinate.latitude.toFixed(6)} N</Text>
      <Text style={styles.nwtext}>{selectedPinCoordinate.longitude.toFixed(6)} W</Text></View>}

  <View style={[styles.input, {zIndex: toggler[2]}]}>
  <View style={{zIndex:5, position: 'absolute', top: 7}}>
      {backArrow}
     </View>
    <TextInput
      style={{fontSize: 20, padding: 15,
        paddingHorizontal: 37}}
      placeholder="Add service location address"
      value={address}
      onChangeText={handleInputChange}
      placeholderTextColor='#5A5A5A'
    />
  </View>

    { suggestions.length > 0 && (
    <View style={styles.overlay}>
      <View style={{alignItems: 'center', marginTop: toggler[3]}}>
      {toggler[0] === 'pin' ? <Text style={{color: '#3d3d3d', fontStyle: 'italic'}}>This is where your clients will drop off their  cars. </Text> : <Text style={{color: '#3d3d3d', fontStyle: 'italic'}}>This is where you will park the cars. </Text> }
      <Text style={{color: '#3d3d3d', fontStyle: 'italic'}}>You will be able to adjust pin position.</Text>
      </View>
    <FlatList
      style={{marginTop: toggler[4]}}
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
              <View style={{marginTop:2}}>
              {toggler[0] === 'pin' ? <FontAwesomeIcon icon={faMapPin} size={25} color="#49111c" /> : <FontAwesomeIcon icon={faCar} size={22} color="#967d68" style={{marginLeft: 7, marginTop: 5}} />}
              </View>
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

        <Marker
            coordinate={coordinates}
            pinColor='#49111c'
            draggable={true}
            onPress={() => setSelectedPinCoordinate(coordinates)}
            onDrag={(e) => setSelectedPinCoordinate(e.nativeEvent.coordinate)}
            onDragEnd={(e) => {
              setCoordinates({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
              setSelectedPinCoordinate(e.nativeEvent.coordinate);
            }}
            title="Service Location">
        </Marker>

        {tempPin && (
            <Marker
                pinColor='#967d68'
                title="Parking Location"
                draggable
                coordinate={tempPin}
                onPress={() => setSelectedPinCoordinate(tempPin)}
                onDrag={(e) => setSelectedPinCoordinate(e.nativeEvent.coordinate)}
                onDragEnd={(e) => { handleBluePinDragEnd(e)
                  setSelectedPinCoordinate(e.nativeEvent.coordinate)
                }}>
            </Marker>
                )}
            {additionalPins.map((pin, index) => (
                <Marker
                  key={index}
                  image={carIcon}
                  title="Parking Location"
                  onPress={() => setSelectedPinCoordinate(pin)}
                  coordinate={pin}
                   />
                   ))}
            </MapView>
             )}
             <View style={{flexDirection: 'row', justifyContent: 'center', zIndex: toggler[1]}}>
            <AddGarages setAdditionalPins={setAdditionalPins} setTempPin={setTempPin} tempPin={tempPin} checkTokenExpirationAndRefresh={checkTokenExpirationAndRefresh} mapRegion={mapRegion} onAdd={handleAddPin} accessToken={accessToken} selectedPinCoordinate={selectedPinCoordinate} formatAddress={formatAddress} suggestions={suggestions} setSuggestions={setSuggestions} setToggler={setToggler} secondaryAddress={secondaryAddress} setSecondaryAddress={setSecondaryAddress} pin={pin} garage={garage} setGaddress={setGaddress}gaddress={gaddress} clearField2={clearField2}/>
            </View>
          <View style={styles.addpin}>
            <AddPin tempPin={tempPin} setTempPin={setTempPin} secondaryAddress={secondaryAddress} setSecondaryAddress={setSecondaryAddress} addy={addy} setAddy={setAddy} setAdditionalPins={setAdditionalPins} selectedPinCoordinate={selectedPinCoordinate} suggestions={suggestions}/>
          </View>
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
    marginTop: 0,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 3
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    marginTop: 60,
    backgroundColor: 'white',
    width: 350,
    height: 51,
    borderRadius: 30,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  nwComponent: {
    position: 'absolute',
    zIndex: 3,
    top: "93%",
    left: '65%',
    backgroundColor: 'white',
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  addpin: {
    zIndex:4,
    position: 'absolute',
    top: 121,
    alignItems: 'center',
    right: '7%',

  },
  nwtext: {
    color:'#5A5A5A',
    fontWeight: 'bold',
    fontSize: 13
  }
});


export default MyMap;
