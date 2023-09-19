import { View,Text,Image,TextInput,ScrollView,StyleSheet, SafeAreaView } from 'react-native';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Spot from './ParkingSpot.jsx'
import MapView, { Marker }  from 'react-native-maps';
import * as Location from 'expo-location';

const Map = () => {
  //query all garages in db
  //make child component for each garage
  const [valetGarages, setValetGarages] = useState(null);
  const [status, requestPermission] = Location.useForegroundPermissions()
  const [location, setLocation] = useState({
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const getGarages = function() {
    console.log('in getGarage func')
    axios.get('http://localhost:3000/garages')
      .then(garages => {
        setValetGarages(garages.data);
      })
      .catch(err => {
        console.log('err: ');
        console.error(err);
      })
  };

  Location.enableNetworkProviderAsync()
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      let newLocation = {
        longitude: location.longitude,
        latitude: location.latitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
      setLocation(newLocation);
    })();
    getGarages()
    // console.log('location in useEffect: ', location)
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  const testRegion = {
    latitude: 37.79035162611023,
    longitude: -122.39719273185551,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const makeMarkers = () => {
    if (!valetGarages){
      return null
    }else {
      valetGarages.map(garage =>{
        garageCordinates = {
          latitude: garage.longitude,
          longitude: garage.latitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }
        return (
          <Marker coordinate={garageCordinates}>
            <CustomMarker />
          </Marker>
        )
      })
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {console.log('location: ', location)}
      {console.log('garages!: ', valetGarages)}
      <Text>In Maps component</Text>
      <Text style={styles.paragraph}>{text}</Text>
      <MapView
        showsUserLocation={true}
        style={styles.map}
        // minZoomLevel={15}
        zoomEnabled = {true}
        maxZoomLevel={20}
        onPress={e =>
          console.log('this will be valet garage', e.nativeEvent.coordinate)
        }
      >
      <Marker coordinate={testRegion}
        pinColor="green"
       //dynamically create marker children all all garages
      />
      </MapView>
      {/* {makeMarkers()} */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#007bff",
    borderColor: "#eee",
    borderRadius: 5,
    elevation: 10,
  },
});

export default Map;