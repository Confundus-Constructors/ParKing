import React, { useState, useEffect,useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import CustomButton from "./CustomButton";
import QRCode from "react-native-qrcode-svg";
import { useRoute } from "@react-navigation/native";
import {host, port} from "../../../env.js";
import Checkout from './Checkout';
import ResPast from './ResPast';
import axios from 'axios';

async function loadFonts() {
  await Font.loadAsync({});
}

const Past = () => {
  const [ reservations,setR ] = useState([]);
  const route = useRoute();
  useEffect(() => {
    axios.get(`http://${host}:${port}/transactions/users/${route.params.data}`)
    .then((result) => {
      var curr = new Date().toUTCString();
      var arr = [];
      for (var i = 0; i < result.data.length; i++) {
        console.log('aoisnrghoainht first:', result.data[i])
        if (result.data[i].reservation_start_time < curr) {
          console.log('aoisnrghoainht:', result.data[i])
          arr.push(result.data[i]);
        }
      }
      console.log('this is the array:', arr);
      setR(arr);
    })
  },[])

  return (
    <ScrollView>
      {reservations.map((reservation) => {
        return (<ResPast data={reservation}/>)
      })}
    </ScrollView>
  )
}

export default Past;