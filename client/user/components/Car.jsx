import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

async function loadFonts() {
  await Font.loadAsync({});
}

const Car = ({ data, set, index,setsel }) => {
  const handlePress = () => {
    console.log(data.id)
    set(index);
    setsel(data.id)
  };
  return (
    <View style={styles.tile}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.title}>{data.make_model}</Text>
        <Text style={styles.info}>License Plate Number: {data.license_plate}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Car;

const styles = StyleSheet.create({
  tile: {
    width: "100%",
    height: 100,
    backgroundColor: "rgb(225,225,225)",
    marginTop: 10,
    borderRadius: 15,
    padding: 30,
    paddingTop: 20,
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Oswald-Medium",
  },
  info: {
    fontSize: 16,
    fontFamily: "Oswald-Light",
  },
});
