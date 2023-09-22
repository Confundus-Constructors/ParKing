import React, { useState, useEffect,useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import CustomButton from "./CustomButton";
import QRCode from "react-native-qrcode-svg";
import { useRoute } from "@react-navigation/native";
import {host, port} from "../../../env.js";
import Checkout from './Checkout'
import ResCopy from './ResCopy'

async function loadFonts() {
  await Font.loadAsync({});
}

const Upcoming = () => {
  const [ reservations,setR ] = useState([]);

  useEffect(() => {
    axios.get(`http://${host}:${port}/transactions/users/${id}`)
    .then((result) => {
      setR(result.data)
    })
  },[])

  return (
    <ScrollSafeAreaView>
      {reservations.map((reservation) => {
        return (<ResCopy data={reservation}/>)
      })}
    </ScrollSafeAreaView>
  )
}

export default Upcoming;