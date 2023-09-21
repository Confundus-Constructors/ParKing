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
// import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const Reserve = () => {
  const route = useRoute();
  const time = route.params.time;
  const [spots, setSpots] = useState([]);
//data has id, address, location, hourly rate, spot
  useEffect(() => {
    // console.log(spots);
    if (route.params.data) {
      // console.log(route.params.data);
      setSpots(route.params.data);

    }
  },[])

  return (
    <View style={styles.Outer}>
      <ScrollView>
        {spots.map((loc,index) => {
          return <Spot key={index} data={loc} passed={route.params.data} id={route.params.id} time={time} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Outer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#F2F4F3",
    margin: 0,
  },
});
export default Reserve;
