import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, Button} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';



const CarCard = () => {
  const [imageSource, setImageSource] = useState(null);

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
          <Text style={styles.boldText}>Reservation ID: [Value]</Text>
          <Text style={styles.boldText}>Owner: [Value]</Text>

          <Text style={styles.carInfo}>Make: [Value]</Text>
          <Text style={styles.boldText}>Color: [Value]</Text>
          <Text style={styles.boldText}>License Plate: [Value]</Text>
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
          <Text style={styles.boldText}>Arrives:  [Value]</Text>
          <Text style={styles.boldText}>Departs: [Value]</Text>
        </View>
        <View>
          <Text style={styles.boldText}>Garage: [Value]</Text>
          <Text style={styles.boldText}>Spot ID: [Value]</Text>
        </View>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Button pressed!')}>
      <Text style={styles.buttonText}>Check In</Text>
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
<<<<<<< HEAD
    marginTop: 20,
=======
    marginTop: 5,
>>>>>>> f83130e (carmanage tabs done)
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
<<<<<<< HEAD
    width: 200,
=======
    width: 190,
>>>>>>> f83130e (carmanage tabs done)
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