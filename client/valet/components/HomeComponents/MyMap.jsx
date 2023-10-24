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
  const pin = ['pin', 2, 4, 0]
  const garage = ['garage', 4, 2, 80]
  const [toggler, setToggler] = useState(pin);
  console.log('toggler', toggler)
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
   let nwComponent;


  const [input, setInput] = useState();


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


if (selectedPinCoordinate) {
  nwComponent = (
    <View>
      <Text style={{color:'#5A5A5A', fontWeight: 'bold', fontSize: 13}}>{selectedPinCoordinate.latitude.toFixed(6)} N</Text>
      <Text style={{color:'#5A5A5A', fontWeight: 'bold', fontSize: 13}}>{selectedPinCoordinate.longitude.toFixed(6)} W</Text>
    </View>
  );
}

  let backArrow;
  let backArrow2;


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
  if (gaddress.length > 0) {
    backArrow2 = (
      <Button color="#49111c"
      titleStyle={{color: "#5A5A5A", fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}
        buttonStyle={{
        backgroundColor: "transparent",
        borderRadius: 20,
        height: 40,
        width: 40,
      }}
      containerStyle={{ zindex: 3, position: 'absolute', marginTop: 0, left: 0}}
      title='&#x276E;' onPress={() => clearField2()}/>
    )
  }


const clearField = () => {
  setAddress([])
}


const clearField2 = () => {
  setGaddress([])
}


  return (<>

    <View style={styles.container}>
    <View style={{zIndex:5, position: 'absolute', top: 68, left: 30}}>
      {backArrow}
     </View>
     <View style={{zIndex:5, position: 'absolute', top: 123, left: 39}}>
      {backArrow2}
     </View>

    <View style={{zIndex:3, position: 'absolute', top: "93%", left: '5%'}}>
      <Button color="#49111c"
          titleStyle={{color: "#5A5A5A", fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}
            buttonStyle={{
            backgroundColor: "white",
            borderRadius: 20,
            height: 40,
            width: 40,
          }}
          containerStyle={{ zindex: 3, position: 'absolute', marginTop: 0, left: 0}}
          title='&#8592;' onPress={handleBack}/>
     </View>

     <View style={styles.nwComponent}>{nwComponent}</View>

    <TextInput
      style={[styles.input, {zIndex: toggler[2]}]}
      placeholder="Add service location address"
      value={address}
      onChangeText={handleInputChange}
      placeholderTextColor='#5A5A5A'
    />

    { suggestions.length > 0 && (
    <View style={[styles.overlay, {paddingVertical: toggler[3]}]}>
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
              <View style={{marginTop:2}}>
              <FontAwesomeIcon icon={faMapPin} size={25} color="#49111c" />
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
             <View style={{flexDirection: 'row', justifyContent: 'center', zIndex: toggler[1]}}>
            <AddGarages setAdditionalPins={setAdditionalPins} setTempPin={setTempPin} tempPin={tempPin} checkTokenExpirationAndRefresh={checkTokenExpirationAndRefresh} mapRegion={mapRegion} onAdd={handleAddPin} accessToken={accessToken} selectedPinCoordinate={selectedPinCoordinate} formatAddress={formatAddress} suggestions={suggestions} setSuggestions={setSuggestions} setToggler={setToggler} secondaryAddress={secondaryAddress} setSecondaryAddress={setSecondaryAddress} pin={pin} garage={garage} setGaddress={setGaddress}gaddress={gaddress}/>
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
    width: '85%',
    height: 50,
    padding: 12,
    paddingHorizontal: 34,
    borderRadius: 30,
    alignItems: 'flex-start',
    fontSize: 20,
    fontFamily: 'System',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    width: 33,
    height: 33,
    borderRadius: 15,
    margin: 10,
  },
  nwComponent: {
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    position: 'absolute',
    zIndex: 3,
    top: "93%",
    left: '65%',
  }
});


export default MyMap;
