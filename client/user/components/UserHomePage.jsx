import {
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
// import { Icon } from "react-native-elements";
import CustomButton from "./CustomButton";
import React, { useState, useEffect, useRoute } from "react";
import UserTabs from "./UserTabs.jsx";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FIREBASE_AUTH } from "../../../FirebaseConfig.ts";
import { signOut } from "firebase/auth";

async function loadFonts() {
  await Font.loadAsync({});
}

const UHP = () => {
  const auth = FIREBASE_AUTH;
  // const route = useRoute();
  // const data = route.params.data;
  // const userId = data.userId;
  const userId = 1;
  const [location, setLoc] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  //#region calendar date time picker
  const [sDate, setSDate] = useState(new Date());
  const [eDate, setEDate] = useState(new Date());
  const [sTime, setSTime] = useState(new Date());
  const [eTime, setETime] = useState(new Date());
  // const [ fdate, setfdate ] = useState('');
  // const [ endate, setendate ] = useState('');
  // const [ ftime, setftime ] = useState('');
  // const [ endtime, setendtime ] = useState('');

  // useEffect(() => {
  //   const today = new Date();
  //   // var date =
  //   //   today.getUTCFullYear() +
  //   //   "-" +
  //   //   (today.getUTCMonth() + 1) +
  //   //   "-" +
  //   //   today.getUTCDate();
  //   setSDate(today);
  //   setEDate(today);
  //   var time = today.getUTCHours() + ":" + today.getUTCMinutes();
  //   // ":" +
  //   // today.getUTCSeconds();
  //   // setSTime(time);
  //   // setETime(time);
  // }, []);

  const handleStartDate = (event, selectedDate) => {
    console.log(selectedDate);
    const currentDate = selectedDate;
    setSDate(currentDate);
  };
  const handleStartTime = (event, selectedTime) => {
    const currTime = selectedTime;
    console.log(selectedTime);

    setSTime(selectedTime);
  };
  const handleEndDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEDate(currentDate);
    console.log(selectedDate);
  };
  const handleEndTime = (event, selectedTime) => {
    const currTime = selectedTime;
    setETime(selectedTime);
    console.log(currTime);
  };
  //#endregion

  const handleInput = (newText) => {
    setLoc(newText);
  };

  const handlePush = () => {
    axios
      .get("/garages", {
        params: {
          location: location,
          start_date: sTime,
          end_date: eTime,
        },
      })
      .then((result) => {
        console.log(result);
        navigation.navigate("Reserve", {
          data: result,
          id: userId,
          time: { stime: sTime, etime: eTime },
        });
      });
  };
  const handlePress = () => {
    setModalVisible(true);
  };
  const onBackSignInPressed = () => {
    navigation.navigate("Welcome");
  };
  const signOutUser = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Welcome");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.Outer}>
      <Text style={styles.text}>Reserve Your Spot</Text>
      {/* <Image
        source={require("../../../assets/giraffe.png")}
        style={styles.image}
        alt="ParKing Mascot"
      /> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.Card}>
          <Text style={styles.text}>Book Parking Near</Text>
          <View style={styles.locCont}>
            <TextInput
              style={styles.Input}
              placeholder="Address,City, or Venue"
              value={location}
              onChangeText={handleInput}
            />
            <Icon name="search" size={14} color="black" style={styles.icon} />
          </View>
          <Text style={styles.text}>Check In</Text>
          <View style={styles.datetimecont}>
            <DateTimePicker
              testID="dateTimePicker"
              value={sDate}
              mode="date"
              is24Hour={false}
              onChange={handleStartDate}
            />
            <DateTimePicker
              testID="dateTimePicker"
              value={sTime}
              mode="time"
              is24Hour={false}
              onChange={handleStartTime}
            />
          </View>
          <Text style={styles.text}>Check Out</Text>
          <View style={styles.datetimecont}>
            <DateTimePicker
              testID="dateTimePicker"
              value={eDate}
              mode="date"
              is24Hour={false}
              onChange={handleEndDate}
            />
            <DateTimePicker
              testID="dateTimePicker"
              value={eTime}
              mode="time"
              is24Hour={false}
              onChange={handleEndTime}
            />
          </View>
          <CustomButton
            title="Find The Closest ParKing Locations"
            textStyle={{
              ...styles.commonFont,
              color: "#D0D3D2",
            }}
            onPush={handlePush}
            color="#171412"
          />

          <TouchableOpacity>
            <Text onPress={signOutUser} style={styles.clickableText}>
              Sign Out
            </Text>
          </TouchableOpacity>
          {/* <Icon /> */}
        </View>
      </Modal>
      {/* <UserTabs/> */}
      <CustomButton
        style={styles.button}
        textStyle={{ ...styles.commonFont, color: "#D0D3D2" }}
        title="Book Now"
        color="#171412"
        onPress={handlePress}
      />
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
  },
  Input: {
    marginVertical: 5,
    height: 40,
    width: "100%",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    paddingLeft: 30,
    margin: 0,
  },
  X: {
    position: "absolute",
  },
  text: {
    fontFamily: "Oswald-Medium",
    fontSize: 24,
  },
  icon: {
    position: "absolute",
    left: 10,
    top: 17,
  },
  locCont: {
    postition: "relative",
  },
  image: {
    height: "80%",
    width: "100%",
  },
  button: {
    borderRadius: 5,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    padding: 5,
    width: "40%",
    alignSelf: "center",
  },
  datetimecont: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
});
export default UHP;
