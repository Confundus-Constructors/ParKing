import {
  Alert,
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  ScrollSafeAreaView,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import CustomButton from "./CustomButton";
import React, { useState,useEffect,useContext } from 'react';
import {host, port} from "../../../env.js";

async function loadFonts() {
  await Font.loadAsync({});
}

const Checkout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params.data;
  const id = route.params.id;
  const time = route.params.time;
  const [ code,setCode ] = useState("");

  useEffect(() => {
    axios.get(`http://${host}:${port}/transactions/confirmation`)
    .then((result) => {
      setCode(result.data.conf_code);
    })
  })

  const handleComplete = () => {
    var toBE = {
      user_id: id,
      vehicle_id: route.params.vehicle,
      garage_id: data.id,
      reservation_start_time: time.stime.toUTCString(),
      reservation_end_time: time.etime.toUTCString(),
      qr_code: code,
    };
    axios.post(`http://${host}:${port}/transactions/${code}`, toBE)
    .then(() => {
    //   navigation.navigate("Reservations", { data: code, id:id });
      Alert.alert('Finished Reservation')
    });
  };
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.httxt}>USD $21.52</Text>
        <Text style={styles.htxt}>Los Angeles International Airport</Text>
        <Text style={styles.htxt}>Sep 15, 13:00 - 14:00</Text>
      </View>
      <View style={styles.div}>
        <View style={styles.ndiv}>
          <Text style={styles.txt}>Credit Card Number</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.split}>
          <View style={styles.indiv}>
            <Text style={styles.txt}>CVV</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.indiv}>
            <Text style={styles.txt}>Exp. Date</Text>
            <TextInput style={styles.input} />
          </View>
        </View>
        <View style={styles.split}>
          <View style={styles.indiv}>
            <Text style={styles.txt}>First Name</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.indiv}>
            <Text style={styles.txt}>Last Name</Text>
            <TextInput style={styles.input} />
          </View>
        </View>
      </View>
      <CustomButton
        style={styles.button}
        textStyle={{ ...styles.commonFont, color: "#D0D3D2" }}
        title="Complete Reservation"
        color="#171412"
        onPress={handleComplete}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#D0D3D2",
    height: "100%",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#171412",
    zIndex: 3,
    width: "100%",
    padding: 20,
    paddingLeft: 30,
    marginBottom: 30,
  },
  button: {
    width: 350,
    marginTop: 60,
  },
  httxt: {
    color: "#D0D3D2",
    fontSize: 32,
    fontFamily: "Oswald-Medium",
  },
  htxt: {
    color: "#D0D3D2",
    fontSize: 20,
    fontFamily: "Oswald-Medium",
  },
  txt: {
    fontSize: 20,
    fontFamily: "Oswald-Medium",
    paddingBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#49111C",
    width: "100%",
  },
  div: {
    width: "70%",
  },
  ndiv: {
    paddingTop: 30,
    width: "100%",
  },
  indiv: {
    paddingTop: 30,
    marginBottom: 10,
    marginTop: 10,
    width: 100,
  },
  split: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default Checkout;
