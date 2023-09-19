import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, Button} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const CarCard = ({info,  buttonText}) => {
  const [imageSource, setImageSource] = useState(null);
  const date1 = new Date(info.reservation_start_time);
  const date2 = new Date(info.reservation_end_time);


  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('Camera cancelled');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        const source = {uri: response.uri};
        setImageSource(source);
      }
    });
  };

  return (
    <SafeAreaView className="text-lg" style={styles.container}>

      <View style={styles.row}>
        <View>
          <Text style={styles.boldText}>Reservation ID: {info.confirmation_id}</Text>
          <Text style={styles.boldText}>Owner: {info.user}</Text>

          <Text style={styles.carInfo}>Make: {info.make_model}</Text>
          <Text style={styles.boldText}>Color: {info.color}</Text>
          <Text style={styles.boldText}>License Plate: {info.license_plate}</Text>
        </View>

        <View>
          <TouchableOpacity style={styles.box} onPress={selectImage}>
            {imageSource ? (
              <Image source={imageSource} style={styles.image} />
            ) : (
              <FontAwesomeIcon icon={faCamera} style={{color: "#a9927d"}} size={80} fade-size={'lg'}/>

            )}
          </TouchableOpacity>
      </View>

     </View>

      <View style={styles.row}>
        <View>
          <Text style={styles.boldText}>Arrival: {date1.toLocaleString()}</Text>
          <Text style={styles.boldText}>Depart: {date2.toLocaleString()}</Text>
        </View>
        <View>
          <Text style={styles.boldText}>Garage: </Text>
          <Text style={styles.boldText}>Spot ID: </Text>
        </View>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Button pressed!')}>
      <Text style={styles.buttonText}>{buttonText ? buttonText : 'Check Out'}</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 0,
    marginTop: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,

    // Android shadow style
    elevation: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginLeft: 2,
  },
  boldText: {
    fontWeight: 'bold',
  },
  box: {
    width: 190,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginRight: 5,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  carInfo: {
    marginTop: 25,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#49111c',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '98%',
    marginBottom: 5,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 2,

    // Android shadow style
    elevation: 5
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
}
});

export default CarCard;