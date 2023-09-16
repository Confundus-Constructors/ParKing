import { View,Text,Image,TextInput,ScrollView,StyleSheet } from 'react-native';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Spot from './ParkingSpot.jsx'
const Reserve = () => {
  const [ spots,setSpots ] = useState([])
  return (
    <View>
      {spots.map((loc) => {
        return (<Spot data={loc}/>)
      })}
    </View>
  )
}

export default Reserve;