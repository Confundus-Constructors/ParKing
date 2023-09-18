import { Alert, SafeAreaView, Touchable, Pressable, TouchableOpacity, View, ScrollView, Text, TextInput, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Modal, Portal, PaperProvider } from 'react-native-paper';
import AnimatedLoader from "react-native-animated-loader";

export default CheckOut = () => {

  // const [confirming, setConfirming] = useState(false);
  const [waitingVisible, setWaitingVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const handleReturn = () => {
    // console.log(waitingVisible);
    setWaitingVisible(true);
    setTimeout(() => {
      setWaitingVisible(false);
      setConfirmationVisible(true);
    }, 2000)

  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Please bring out the following vehicle and press the 'Vehicle Returned' button after returning vehicle</Text>
        <Text style={styles.text}>Reservation ID: </Text>
        <Text style={styles.text}>Spot: </Text>
        <Text style={styles.text}>Owner:</Text>
        <Text style={styles.text}>Make:</Text>
        <Text style={styles.text}>Color:</Text>
        <Text style={styles.text}>License Plate:</Text>
        <Image style={styles.carPic}></Image>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle} onPress={handleReturn}>Vehicle Returned</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={waitingVisible} style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.waitingText}>Waiting For Confirmation From Owner</Text>
          <Image style={styles.loadingGif} source={require('./../../../assets/loading.gif')} ></Image>
        </View>
      </Modal>
      <Modal visible={confirmationVisible} style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Pressable onPress={()=> {setConfirmationVisible(false)}}>
            <Text style={styles.waitingText}>Confirmed!</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A9927D',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    height: 'auto',
    width: '90%',
    borderRadius: 30,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 3,
    // justifyContent: 'flex-start',
    padding: 50
  },
  button: {
    backgroundColor: '#49111C',
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonTitle: {
    color: 'white',
    borderRadius: 20,
    fontSize: 25
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  carPic: {
    height: 100,
    width: 100,
    borderWidth: 1
  },
  modalContainer: {
    alignItems:'center',
    justifyContent:'center'
    // // width: '90%',
    // marginLeft: 10,
    // marginRight: 10,
    // borderRadius: 30,
    // backgroundColor: 'white',
  },
  lottie: {
    width: 100,
    height: 30,
  },
  modalView: {
    height: 'auto',
    alignItems:'center',
    justifyContent:'center',
    padding: 20,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  waitingText: {
    fontSize: 20,
  },
  loadingGif: {
    height: 50
  }
})