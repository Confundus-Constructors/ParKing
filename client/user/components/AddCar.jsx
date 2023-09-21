import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Modal,
  SafeAreaView,
} from "react-native";
import CustomButton from './CustomButton';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

async function loadFonts() {
  await Font.loadAsync({});
}

const AddCar = ({ id,set,see }) => {
  const [ mm,setMM ] = useState('');
  const [ license,setLicense ] = useState('');
  const [ col,setColor ] = useState('');

  const handlePress = () => {
    axios.post(`http://localhost:3000/vehicles/${id}`, {
      make_model: mm,
      license_plate: license,
      color: col
    }) .then(() => {
      set(false);
    })
  }

  return (
    <Modal
    animationType="slide"
    visible={see}>
      <SafeAreaView style={styles.Outer}>
      <View style={styles.div}>
        <Text style={styles.txt}>Make/Model: </Text>
        <TextInput style={styles.input} value={mm} onChangeText={newText => setMM(newText)}/>
      </View>
      <View style={styles.div}>
        <Text style={styles.txt}>Color: </Text>
        <TextInput style={styles.input} value={license} onChangeText={newText => setLicense(newText)}/>
      </View>
      <View style={styles.div}>
        <Text style={styles.txt}>License Plate: </Text>
        <TextInput style={styles.input} value={col} onChangeText={newText => setColor(newText)}/>
      </View>
      <CustomButton
      title="Register Car"
      style={styles.button}
      textStyle={{ ...styles.commonFont, color: "#D0D3D2" }}
      color="#171412"
      onPress={handlePress}/>
      </SafeAreaView>
    </Modal>
  )
}

export default AddCar;

const styles = StyleSheet.create({
  Outer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#171412",
  },
  input: {
    width: "100%",
    borderColor: "#D0D3D2",
    borderBottomWidth: 1,
  },
  button: {
    width: 350,
    marginTop: 60,
  },
  txt: {
    fontSize: 20,
    fontFamily: "Oswald-Medium",
    paddingBottom: 20,
  },
  div: {
    width: "80%"
  }
})