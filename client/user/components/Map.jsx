import { View,Text,Image,TextInput,ScrollView,StyleSheet, SafeAreaView } from 'react-native';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Spot from './ParkingSpot.jsx'
import MapView, { Marker }  from 'react-native-maps';
import * as Location from 'expo-location';

const Map = () => {
  //query all garages in db
  //make child component for each garage
  const [valetGarages, setValetGarages] = useState([]);
  const [status, requestPermission] = Location.useForegroundPermissions()
  const [location, setLocation] = useState({
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const getGarages = function() {
    axios.get('http://localhost:3000/garages')
      .then(garages => {
        setValetGarages(garages.data);
        console.log('garages: ', garages.data);
      })
      .catch(err => {
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
      console.log('in async: ', location)
      console.log('in async loca.coords.lata: ', location.coords.latitude)
      let newLocation = {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
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
  const MiamiRegion = {
    latitude: 25.761681,
    longitude: -80.191788,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const ShowGarages = () => {
    if (!valetGarages){
      return null
    } else {
      return valetGarages.map(garage =>{
        garageCordinates = {
          latitude: garage.latitude,
          longitude: garage.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }
        console.log('garage coord: ', garageCordinates)
        return (
            <Marker
            coordinate={garageCordinates}
            key={garage.id}
            pinColor="red"
          >
            <View >
              <Text>Hourly Rate: {garage.hourly_rate}</Text>
            </View>
          </Marker>

        )
      })
    }
    console.log('get garages ran')
  }

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>This will be header</Text>
      </View>
      <MapView
        showsUserLocation={true}
        style={styles.map}
        // minZoomLevel={18}
        animateToRegion={location, 2000}
        zoomEnabled = {true}
        maxZoomLevel={20}
        onPress={e =>
          console.log('this will be valet garage', e.nativeEvent.coordinate)
        }
      >
      <Marker coordinate={MiamiRegion}
        pinColor="green"
       //dynamically create marker children all all garages
      />
      {valetGarages.length > 0  ? (
        valetGarages.map(garage =>{
          console.log('garage in map: ', garage)
          garageCordinates = {
            latitude: garage.latitude,
            longitude: garage.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }
          return (
              <Marker
              coordinate={garageCordinates}
              key={garage.id}
              pinColor="red"
              title={garage.valet_company_id} //would prefer name over id
            />
          )
      })): null}
      </MapView>
      <View style={styles.footer}>
        {/* list valet garages */}

        <Text>This will be footer</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    //...StyleSheet.absoluteFillObject,
    // height: 400
    // width: 400,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header:{
    flex: 2,
    //backgroundColor: '#000000',
    color:'#a9a9a9',
    width: '100%',
    height: '150%',
  },
  footer:{
    flex: 2,
    //backgroundColor: '#000000',
    color:'#a9a9a9',
    width: '100%',
    height: '150%',
  },
  map: {
    //...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    //flex: 10,
    // marginTop: '10em',
    width: '100%',
    height: '90%',
  },
  marker: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#007bff",
    borderColor: "#eee",
    borderRadius: 5,
    elevation: 10,
  }
});

export default Map;