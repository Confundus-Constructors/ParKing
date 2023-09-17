import { Alert, SafeAreaView, Pressable, TouchableOpacity, View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Modal, Portal, PaperProvider } from 'react-native-paper';
import AnimatedLoader from "react-native-animated-loader";

export default InfoConfirmation = ({navigation, route}) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmed, setConfirmed] = useState(true);
  const [parkingSpot, setParkingSpot] = useState('');
  const [image, setImage] = useState();

  const handleConfirm = () => {
    setModalVisible(true)
  };

  const addPic = () => {
    {navigation.navigate('CameraMain')};
  };

  const handleSubmit = () => {
    //send information to server
    //clear states
    setParkingSpot('');
    setConfirmed('false');
    setImage(null);
    setModalVisible(false);
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
      <Modal visible={modalVisible} style={styles.modalContainer}>
        <View style={styles.modalView}>
          {!confirmed?
          <View>
            <Text style={styles.modalText}>Confirming</Text>
            {/* <AnimatedLoader
              visible={true}
              overlayColor="rgba(255,255,255,0.75)"
              animationStyle={styles.lottie}
              speed={1}>
              <Text>Doing something...</Text>
            </AnimatedLoader> */}
          </View>
          :
          <View>
            <Text style={styles.confirmed}>Checked In ✓</Text>
            <Text style={styles.modalText}>Please park the car and then enter the parking location</Text>
            <TextInput style={styles.input}></TextInput>
            <Text style={styles.modalText}>Please take a picture of the car in it's spot. Include the license plate if possibled</Text>
            {!image ? <TouchableOpacity style={styles.picButton} onPress={addPic}>
              <Text style={styles.buttonTitle}>Add Picture</Text>
            </TouchableOpacity>
            :
            <View>
            <TouchableOpacity style={styles.picButton} onPress={addPic}>
              <Text style={styles.buttonTitle}>Retake</Text>
            </TouchableOpacity>
            <Image
              style={styles.image}
              source={{
                uri: image,
              }}
            />
            <TouchableOpacity style={styles.picButton} onPress={handleSubmit}>
              <Text style={styles.buttonTitle}>Submit</Text>
            </TouchableOpacity>
            </View>}
          </View>
          }
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
    justifyContent: 'flex-start',
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
    alignItems:'center'
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 40,
    width: 380,
    height: 'auto',
  },
  lottie: {
    width: 100,
    height: 30,
  },
  modalText: {
    fontSize: 22
  },
  confirmed: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 30
  },
  input: {
    marginTop: 20,
    marginBottom: 40,
    fontSize: 22,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  picButton: {
    backgroundColor: '#49111C',
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  image: {
    marginTop: 10,
    height: 100,
    width: 50,
    alignSelf: 'center'
  }

});