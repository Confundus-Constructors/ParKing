import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Car from "./Car.jsx";
import CustomButton from "./CustomButton.jsx";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AddCar from './AddCar'
import axios from 'axios'
import { useRoute } from "@react-navigation/native";

// import crypto from "./crypto";

const Select = () => {
  const route = useRoute();
  const id = route.params.id;
  const time = route.params.time;
  const navigation = useNavigation();
  const [ cars,setCars ] = useState(["Tesla Model X", "Mercedes E-Class", "Tesla Model 3"]);
  const [ selected, setSelected ] = useState({});
  const [clicked, setClicked] = useState(0);
  const [ see,setSee ] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/vehicles/${id}`)
      .then((result) => {
        setCars(result.data);
      })
  },[see])

  const handleComplete = () => {
    navigation.navigate("Checkout", {data: route.params.data, vehicle: selected, id:id, time});
  };
  const handleModal = () => {
    setSee(true);
  }
  return (
    <SafeAreaView style={styles.background}>
      {cars.map((carInfo, index) => {
        return (
          <View style={styles.width}>
            <Car data={carInfo} key={carInfo} index={index} set={setClicked} setsel={setSelected} />
            {clicked === index ? (
              <View style={styles.check}>
                <Text>&#x2713;</Text>
              </View>
            ) : (
              <></>
            )}
          </View>
        );
      })}
      <AddCar see={see} set={setSee} id={id}/>
      <CustomButton
        style={styles.button}
        textStyle={{ ...styles.commonFont, color: "#D0D3D2" }}
        title="Add A Car"
        color="#171412"
        onPress={handleModal}
      />
      <CustomButton
        style={styles.button}
        textStyle={{ ...styles.commonFont, color: "#D0D3D2" }}
        title="Continue To Pay"
        color="#171412"
        onPress={handleComplete}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#F2F4F3",
    alignItems: "center",
    height: "100%",
  },
  button: {
    justifyContent: "bottom",
    width: 350,
    borderRadius: 15,
    overflow: "hidden",
    margin: 10,
  },
  width: {
    width: "100%",
    position: "relative",
  },
  check: {
    position: "absolute",
    right: 20,
    top: 30,
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: "green",
    borderStyle: "solid",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Select;
