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
import React, { useState, useEffect } from "react";
import UserTabs from "./UserTabs.jsx";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { FIREBASE_AUTH } from '../../../FirebaseConfig.ts';
import { signOut } from "firebase/auth";
import { useRoute } from "@react-navigation/native"


async function loadFonts() {
  await Font.loadAsync({});
}

const UHP = () => {
  const auth = FIREBASE_AUTH;
  const route = useRoute();
  const userId = route.params.data;
  // const userId = 1;
  const [location, setLoc] = useState("");
  const [modalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();

  //#region calendar date time picker
  const [sDate, setSDate] = useState("Today");
  const [eDate, setEDate] = useState("Today");
  const [sTime, setSTime] = useState("Now");
  const [eTime, setETime] = useState("Now");
  const [mode, setMode] = useState("date");
  const [emode, setEMode] = useState("date");
  const [show, setShow] = useState(false);
  const [eshow, setEShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const handleStartDate = () => {
    showMode("date");
  };
  const handleStartTime = () => {
    showMode("time");
  };
  //#endregion

  const handleInput = (newText) => {
    setLoc(newText);
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

  const signOutUser = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Welcome');
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
          <View style={styles.timeCont}>
            <TouchableOpacity style={styles.button} onPress={handleStartDate}>
              <Text>{sDate}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleStartTime}>
              <Text>{sTime}</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                onChange={onChange}
              />
            )}
            {/* Clock */}
          </View>
          <Text style={styles.text}>Check Out</Text>
          <View style={styles.timeCont}>
            <TouchableOpacity style={styles.button} onPress={handleStartDate}>
              <Text>{eDate}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleStartTime}>
              <Text>{eTime}</Text>
            </TouchableOpacity>
            {eshow && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={emode}
                is24Hour={false}
                onChange={onChange}
              />
            )}
            {/* Clock */}
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
          <Text onPress={signOutUser} style={styles.clickableText}>Sign Out</Text>
        </TouchableOpacity>
          {/* <Icon /> */}
        </View>
      </Modal>
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
  },
  Input: {
    marginVertical: 5,
    height: 30,
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
    left: 8,
    top: 12,
  },
  locCont: {
    postition: "relative",
  },
  image: {
    height: "80%",
    width: "100%",
  },
  timeCont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 5,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    padding: 5,
    width: "40%",
  },
});
export default UHP;
