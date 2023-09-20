import { Alert, SafeAreaView, Touchable, Pressable, TouchableOpacity, View, ScrollView, Text, TextInput, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Modal, Portal, PaperProvider } from 'react-native-paper';
import axios from 'axios';
import moment from 'moment';
import * as FileSystem from 'expo-file-system';

async function loadFonts() {
  await Font.loadAsync({
    'Oswald-Medium': require('../../../assets/fonts/Oswald-Medium.ttf'),  // adjust the path accordingly
  });
};

export default Checkin = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState();
  const [confirming, setConfirming] = useState(false);
  const [carInfo, setCarInfo] = useState({});
  const [blob, setBlob] = useState();
  const [qrCode, setQRCode] = useState('test2');

  useEffect(() => {
    if (route.params && route.params.carInfo) {
      setCarInfo(route.params.carInfo);
    }
  });

  const handleConfirm = () => {
      setModalVisible(true);
      axios.put(`https://051f-2603-7000-3900-7052-f0a4-43e1-9eb2-cce9.ngrok-free.app/transactions/${qrCode}`)
      .catch((err) => {
        console.log(err);
      })
  };


  const addPic = () => {
    {navigation.navigate('CameraMain')};
  };


  const handleSubmit = async() => {
    const base64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' });
    setConfirming(true);
    axios.post('https://051f-2603-7000-3900-7052-f0a4-43e1-9eb2-cce9.ngrok-free.app/image', {image: base64, blob: blob, qr_code: qrCode})
    .then(() => {
      setConfirming(false);
      setModalVisible(false);
      setImage(null);
      navigation.navigate('QRScanner');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    if (route.params && route.params.image) {
      setImage(route.params.image);
      setBlob(route.params.blob);
    }
  }, [route.params]);

  const capitalizeString = (string) => {
    if (string) {
      return string[0].toUpperCase() + string.slice(1,string.length).toLowerCase();
    }
    else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.text}>{'Owner: ' + carInfo.user}</Text>
        <Text style={styles.text}>{'Make: ' + carInfo.make_model }</Text>
        <Text style={styles.text}>{'Color: ' + capitalizeString(carInfo.color)}</Text>
        <Text style={styles.text}>{'License Plate: ' + carInfo.license_plate}</Text>
        <Text style={styles.text}>{'Reservation Start: ' + moment(carInfo.reservation_start_time).format('LLL')}  </Text>
        <Text style={styles.text}>{'Reservation End: ' + moment(carInfo.reservation_end_time).format('LLL')}  </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle} onPress={handleConfirm}>Confirm Details</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible}>
        <View style={styles.modalView}>
          <View>
            <Text style={styles.confirmed}>Checked In ✓</Text>
            <Text style={styles.modalText}>Please park the car and then enter the parking location</Text>
            <Text style={styles.modalText}>{'Parking Spot: ' + carInfo.parking_spot_number} </Text>
            <Text style={styles.modalText}>Please take a picture of the car in its spot. Include the license plate if possible</Text>
            {!image?
            <TouchableOpacity style={styles.picButton} onPress={addPic}>
              <Text style={styles.buttonTitle}>Add Picture</Text>
            </TouchableOpacity>
            :
            <View>
              <Image
                style={styles.image}
                source={{
                  uri: image,
                }}
              />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.picButtonTwins} onPress={addPic}>
                <Text style={styles.buttonTitle}>Retake</Text>
              </TouchableOpacity>
              <Text>   </Text>
              <TouchableOpacity style={styles.picButtonTwins} onPress={handleSubmit}>
                <Text style={styles.buttonTitle}>Submit</Text>
              </TouchableOpacity>
            </View>
            </View>}
          </View>
        </View>
      </Modal>
      <Modal visible={confirming} >
        <View style={styles.confirmingView}>
          <Text style={styles.waitingText}>Uploading Image</Text>
          <Image style={styles.loadingGif} source={require('./../../../assets/loading.gif')} ></Image>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A9927D',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  formContainer: {
    backgroundColor: 'white',
    height: 'auto',
    width: 'auto',
    borderRadius: 30,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 3,
    padding: 20,
    // alignItems: 'center'
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
    fontSize: 25,
    fontFamily: 'Oswald-Medium',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'Oswald-Medium',
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
    alignSelf: 'center'
  },
  lottie: {
    width: 100,
    height: 30,
  },
  modalText: {
    fontSize: 22,
    marginBottom: 20,
    fontFamily: 'Oswald-Medium',
  },
  confirmed: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 30,
    fontFamily: 'Oswald-Medium',
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 22,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontFamily: 'Oswald-Medium',
  },
  picButton: {
    backgroundColor: '#49111C',
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  picButtonTwins: {
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
    height: 160,
    width: 160,
    alignSelf: 'center',
    borderRadius: 20
  },
  waitingText: {
    fontSize: 20,
    fontFamily: 'Oswald-Medium',
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


