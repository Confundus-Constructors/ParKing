import { Alert, SafeAreaView, Touchable, Pressable, TouchableOpacity, View, ScrollView, Text, TextInput, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Modal, Portal, PaperProvider } from 'react-native-paper';
import axios from 'axios';

export default Checkin = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [parkingSpot, setParkingSpot] = useState('');
  const [image, setImage] = useState();
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    axios.get('/')
  });

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
      setModalVisible(true);
      // navigation.navigate('QRScanner');
    }, 2000)
  };

  const addPic = () => {
    {navigation.navigate('CameraMain')};
  };

  const handleSubmit = () => {
    //send information to server
    //clear states
    setParkingSpot('');
    setModalVisible(false);
    setImage(null);
    navigation.navigate('QRScanner');
  }

  useEffect(() => {
    if (route.params) {
      setImage(route.params.image);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Reservation ID: </Text>
        <Text style={styles.text}>Owner:</Text>
        <Text style={styles.text}>Make:</Text>
        <Text style={styles.text}>Color:</Text>
        <Text style={styles.text}>License Plate:</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle} onPress={handleConfirm}>Confirm Details</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={confirming} >
        <View style={styles.confirmingView}>
          <Text style={styles.waitingText}>Waiting For Confirmation From Owner</Text>
          <Image style={styles.loadingGif} source={require('./../../../assets/loading.gif')} ></Image>
        </View>
      </Modal>
      <Modal visible={modalVisible}>
        <View style={styles.modalView}>
          <View>
            <Text style={styles.confirmed}>Checked In ✓</Text>
            <Text style={styles.modalText}>Please park the car and then enter the parking location</Text>
            <Text style={styles.modalText}>Parking Spot: ____</Text>
            <Text style={styles.modalText}>Please take a picture of the car in its spot. Include the license plate if possible</Text>
            {!image ? <TouchableOpacity style={styles.picButton} onPress={addPic}>
              <Text style={styles.buttonTitle}>Add Picture</Text>
            </TouchableOpacity>
            :
            <View>

            {/* <Pressable onPress={() => {console.log('hi')}}> */}
              <Image
                style={styles.image}
                source={{
                  uri: image,
                }}
              />
            {/* </Pressable> */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.picButton} onPress={addPic}>
                <Text style={styles.buttonTitle}>Retake</Text>
              </TouchableOpacity>
              <Text>   </Text>
              <TouchableOpacity style={styles.picButton} onPress={handleSubmit}>
                <Text style={styles.buttonTitle}>Submit</Text>
              </TouchableOpacity>
            </View>
            </View>}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A9927D',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
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
  modalContainer: {
    alignItems:'center',
    justifyContent:'flex-end'
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 30,
    width: '95%',
    height: 'auto',
    alignSelf: 'center',
    // justifySelf: 'center'
  },
  lottie: {
    width: 100,
    height: 30,
  },
  modalText: {
    fontSize: 22,
    marginBottom: 20
  },
  confirmed: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 30
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 22,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  picButton: {
    backgroundColor: '#49111C',
    flex: 1,
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  image: {
    marginTop: 10,
    height: 180,
    width: 200,
    alignSelf: 'center',
    borderRadius: 20
  },
  waitingText: {
    fontSize: 20,
  },
  loadingGif: {
    height: 50
  },
  waitingContainer: {
    backgroundColor: 'white',
    height: 'auto'
  },
  confirmingView: {
    height: 'auto',
    alignItems:'center',
    justifyContent:'center',
    padding: 30,
    borderRadius: 30,
    backgroundColor: 'white',
    width: '95%',
    alignSelf: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});


