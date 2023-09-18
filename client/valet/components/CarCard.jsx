import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {launchCamera} from 'react-native-image-picker';


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
           <Text>{"\n"}</Text>
          <Text>Make: [Value]</Text>
          <Text>Color: [Value]</Text>
          <Text>License Plate: [Value]</Text>
        </View>

        <View>
          <TouchableOpacity style={styles.box} onPress={selectImage}>
            {imageSource ? (
              <Image source={imageSource} style={styles.image} />
            ) : (
              <Image source={require('../../../assets/icon.png')} style={styles.image} />
            )}
          </TouchableOpacity>
      </View>

     </View>

      <View style={styles.row}>
        <View>
          <Text>Arrives:  [Value]</Text>
          <Text>Departs: [Value]</Text>
        </View>
        <View>
          <Text>Garage: [Value]</Text>
          <Text>Spot ID: [Value]</Text>
        </View>
    </View>
  </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
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
    marginTop: 15,
  },
  boldText: {
    fontWeight: 'bold',
  },
  box: {
    width: 190,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default CarCard;