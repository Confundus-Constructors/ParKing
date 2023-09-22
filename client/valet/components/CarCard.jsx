import React, {useState, useRef, useEffect} from 'react';
import { View, Text, LayoutAnimation, SafeAreaView, StyleSheet, TouchableOpacity, Image, Button} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Dimensions } from 'react-native'
import {host, port} from "../../../env.js";

const CarCard = ({info,  buttonText, navigation}) => {

  const [imageSource, setImageSource] = useState(null);
  const [big, setBig] = useState(false);
  const imageRef = useRef();
  const [top, setTop] = useState(0);

  const formatCustomDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(2);
  const hours = date.getHours();
  const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedDate = `${month}/${day}/${year}, ${hours % 12 || 12}:${minutes} ${ampm}`;
    return formattedDate;
  };

  const date1 = new Date(info.reservation_start_time);
  const date2 = new Date(info.reservation_end_time);

  const onPressCheck = () => {

  //  imageRef.current.measure((x, y, width, height, pagex, pagey) => {
  //   setTop(-pagey);
  //   });
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   if (imageSource) {
  //     setBig(!big);
  //   }
  }

  useEffect(() => {
    axios.get(`http://${host}:${port}/image/${info.confirmation_id}`)
    .then((result) => {
      if (result.data.rows[0].photo) {
        var base64 = result.data.rows[0].photo;
        var base64Pic = 'data:image/png;base64,' + base64;
        setImageSource(base64Pic)
      }
    })
  });

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

  const capitalizeString = (string) => {
    if (string) {
      return string[0].toUpperCase() + string.slice(1,string.length).toLowerCase();
    }
    else {
      return null;
    }
  };

  const handleCheckCar = () => {
    if (buttonText) {
      navigation.navigate('CheckIn', {qr_code: info.confirmation_id, carInfo: info, list: true})
    } else {
      navigation.navigate('CheckOut', {qr_code: info.confirmation_id, carInfo: info, list: true})
    }
  }

  return (
    <SafeAreaView className="text-lg" style={styles.container}>

      <View style={styles.row}>
        <View style={styles.row}>
          <View>
            <Text style={styles.row}>
              <Text style={styles.boldText}>Reservation ID: </Text>
              <Text>{info.confirmation_id}</Text>
            </Text>
            <Text style={styles.row}>
              <Text style={styles.boldText}>Owner: </Text>
              <Text style={styles.user}>{info.user}</Text>
            </Text>
            <Text style={styles.row}>
              <Text style={styles.boldText}>Make: </Text>
              <Text style={styles.carInfo}>{info.make_model}</Text>
            </Text>
            <Text style={styles.row}>
              <Text style={styles.boldText}>Color: </Text>
              <Text>{capitalizeString(info.color)}</Text>
            </Text>
            <Text style={styles.row}>
              <Text style={styles.boldText}>License Plate: </Text>
              <Text>{info.license_plate}</Text>
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.box} onPress={onPressCheck}>
            {imageSource ? (
              <Image
              ref={imageRef}
              // onLayout={event => {
              //   const layout = event.nativeEvent.layout;
              //   console.log('screen height:', Dimensions.get('window').height);
              //   // console.log('width:', layout.width);
              //   // XRef.current = layout.x;
              //   // YRef.current = layout.y;
              //   // console.log('x:', layout.x);
              //   // console.log('y:', layout.y);
              // }}
              src={imageSource}
              style={
                {
                  height: !big ? 120 : Dimensions.get('window').height,
                  width: !big ? 180 : Dimensions.get('window').width,
                  borderRadius: 10,
                  resizeMode: "cover",
                  marginRight: !big ? 0 : 200,
                  position: 'absolute',
                  top: top,
                  left: !big ? 0 : -205,
                  zIndex: 1
                }
              } />
            ) : (
              <FontAwesomeIcon icon={faCamera} style={{color: "#a9927d", opacity: 0.7}} size={80} fade-size={'lg'}/>

            )}
          </TouchableOpacity>
      </View>

     </View>

      <View>
      <View style={styles.row}>
        <View>
        <Text style={styles.row}>
          <Text style={styles.boldText}>Arrival: </Text>
          <Text style={styles.user}>{formatCustomDate(date1)}</Text>        </Text>
        <Text style={styles.row}>
          <Text style={styles.boldText}>Depart: </Text>
          <Text style={styles.user}>{formatCustomDate(date2)}</Text>        </Text>
        </View>
        <View>
        <Text style={[styles.row, { paddingRight: 60 }, { marginTop: 5 }]}>
          <Text style={styles.boldText}>Garage: </Text>
          <Text style={styles.user}>{}</Text>
        </Text>
        <Text style={styles.row, { paddingRight: 60 }}>
         {info.parking_spot_number && <Text style={styles.boldText}>Spot ID: </Text>}
        <Text>{info.parking_spot_number}</Text>
</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCheckCar}>
        <Text style={styles.buttonText}>{buttonText ? buttonText : 'Check Out'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D6D6D6',
    padding: 10,
    borderRadius: 0,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 0,
    // position: 'absolute'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginLeft: 1,
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black',

  },
  box: {
    width: 180,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginRight: 5,
  },
  image: {
    width: 180,
    height: 120,
    borderRadius: 10,
    resizeMode: "cover",
  },
  carInfo: {
    marginTop: 15,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#49111c",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "98%",
    marginBottom: 5,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 2,

    // Android shadow style
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  user: {
    marginTop: 1,
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
    fontSize: 18,
},
  user: {
    marginTop: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#404040',
  },
});

export default CarCard;