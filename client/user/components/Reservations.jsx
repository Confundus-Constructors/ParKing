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

async function loadFonts() {
  await Font.loadAsync({});
}

const Reservations = () => {
  const [info, setInfo] = useState({});
  const [startDate, setSDate] = useState("");
  const [endDate, setEDate] = useState("");
  const [ qr, setQR ] = useState("")

  const route = useRoute();
  const id = route.params.id;

  useEffect(() => {
    axios.get(`http://${host}:${port}/transactions/users/${id}`)
    .then((result) => {
      var curr = new Date().toUTCString();
      for (var i = 0; i < result.data; i++) {
        if (result.data[i].reservation_start_time >= curr && curr >= result.data[i].reservation_end_time) {
          setInfo(result.data[i]);
        }
      }
    })
    .then((resp) => {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var sd = new Date(resp.reservation_start_time);
      var ed = new Date(resp.reservation_end_time);
      var sdate = `${
        monthNames[sd.getUTCMonth()]
      }, ${sd.getUTCDate()} ${sd.getUTCHours()}:${sd.getUTCMinutes()}`;
      var edate = `${
        monthNames[ed.getUTCMonth()]
      }, ${ed.getUTCDate()} ${ed.getUTCHours()}:${ed.getUTCMinutes()}`;
      setSDate(sdate);
      setEDate(edate);
      setInfo(resp);
      setQR(resp.qr_code)
    });
  }, []);

  return (
    <SafeAreaView className="text-lg" style={styles.container}>
      <Text style={styles.title}>Reservations</Text>
      <View style={styles.info}>
        <Text style={styles.txt}>Reservation ID: {info.qr_code}</Text>
        <Text style={styles.txt}>Parking Address:</Text>
        <Text style={styles.txt}>{info.garage}</Text>
        <Text>{"\n"}</Text>
        <Text style={styles.txt}>License Plate: {info.license_plate}</Text>
        <Text style={styles.txt}>Arrive At: {startDate}</Text>
        <Text style={styles.txt}>Depart At: {endDate}</Text>
      </View>
      <View style={styles.alignmid}>
        <QRCode value={qr} />
        <Text style={styles.ltxt}>Use QR Code To Check-In And Check-Out</Text>
        <CustomButton
          style={styles.button}
          textStyle={{ ...styles.commonFont, color: "#D0D3D2" }}
          title="Notify For Early Pickup"
          color="#171412"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontFamily: "Oswald-Bold",
    padding: 30,
  },
  alignmid: {
    alignItems: "center",
  },
  button: {
    width: 350,
  },
  txt: {
    fontSize: 20,
    fontFamily: "Oswald-Light",
  },
  info: {
    padding: 30,
    paddingTop: 0,
  },
  ltxt: {
    color: "#A9927D",
    fontSize: 16,
    fontFamily: "Oswald-Medium",
    padding: 10,
  },
});

export default Reservations;
