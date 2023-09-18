import { View,Text,Image,TextInput,ScrollView,StyleSheet, SafeAreaView } from 'react-native';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Spot from './ParkingSpot.jsx'
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

const Map = () => {

  const [status, requestPermission] = Location.useForegroundPermissions()
  const [location, setLocation] = useState(null);
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
      setLocation(location);
    })();
    // console.log('location in useEffect: ', location)
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);

  }
    return (
      <SafeAreaView style={styles.container}>
      {console.log('location: ', location)}
        <Text>In Maps component</Text>
        <Text style={styles.paragraph}>{text}</Text>
        <MapView
          showsUserLocation={true}
          style={styles.map}
          zoomEnabled = {true}
          maxZoomLevel={20}
          onPress={e =>
            console.log('this will be valet garage', e.nativeEvent.coordinate)
        }
        >
        </MapView>
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
});

export default Map;