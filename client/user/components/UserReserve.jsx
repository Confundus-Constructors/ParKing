import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Spot from "./ParkingSpot.jsx";

const Reserve = () => {
  const [spots, setSpots] = useState([1, 2, 3, 4]);
  return (
    <View style={styles.Outer}>
      {spots.map((loc) => {
        return <Spot data={loc} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  Outer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "grey",
    margin: 0,
  },
});
export default Reserve;
