import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  ScrollSafeAreaView,
  StyleSheet,
} from "react-native";
// import { Icon } from "react-native-elements";
import { Button } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import UserTabs from "./UserTabs.jsx";
import axios from "axios";

const UHP = () => {
  const userId = 1;
  const [text, setText] = useState("");
  const [sTime, setSTime] = useState(0);
  const [eTime, setETime] = useState(0);

  const handleInput = (newText) => {
    setText(newText);
  };
  const handlePush = () => {
    axios.get("/garages", {
      params: {
        location: text,
        start_date: sTime,
        end_date: eTime,
      },
    });
  };

  return (
    <SafeAreaView style={styles.Outer}>
      <Text style={{ fontSize: 32 }}>Reserve Your Spot</Text>
      <View style={styles.Card}>
        <View>
          <Text style={{ fontSize: 24 }}>Book Parking Near</Text>
          <TextInput
            style={styles.Input}
            placeholder="Address,City, or Venue"
            value={text}
            onChangeText={handleInput}
          />
        </View>
        <View>
          <Text style={{ fontSize: 24 }}>Check In</Text>
          {/* Calendar */}
          {/* Clock */}
        </View>
        <View>
          <Text style={{ fontSize: 24 }}>Check Out</Text>
          {/* Calendar */}
          {/* Clock */}
        </View>
        <Button
          title="Book Now"
          color="black"
          style={styles.Button}
          onPush={handlePush}
        />
        {/* <Icon /> */}
      </View>
      {/* <UserTabs/> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Outer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  Card: {
    borderRadius: "20px",
    backgroundColor: "white",
    width: "100%",
    height: 100,
    flex: 1,
    padding: 50,
    postition: "relative",
  },
  Input: {
    elevation: 5,
  },
  Button: {
    width: "40%",
    // borderRadius: "25px",
    borderRadius: "25%",
  },
  X: {
    position: "absolute",
  },
});
export default UHP;
