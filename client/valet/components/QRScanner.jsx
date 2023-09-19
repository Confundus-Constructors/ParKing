import { Alert, Button, Pressable, TouchableOpacity,View,Text,StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

export default QRScanner = ({navigation}) => {
  const [permission, setPermission] = useState(false);
  const [scanData, setScanData] = useState();

  useEffect(() => {
   (async() => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
    setPermission(status === 'granted');
  })()
  },[]);

  useEffect(() => {
    if (scanData) {
      axios('https://051f-2603-7000-3900-7052-f0a4-43e1-9eb2-cce9.ngrok-free.app/transactions/' + scanData)
      .then((result) => {
        console.log(result.data);
        if (result.data.status === 'reserved') {
          navigation.navigate('CheckIn', params={carInfo: result.data});
        } else if (result.data.status === 'checked-in') {
          navigation.navigate('CheckOut', params={carInfo: result.data});
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [scanData])

if (!permission) {
  return (
    <View style={styles.container}>
      <Text>Please grant camera permissions to app.</Text>
    </View>
  );
}

const handleBarCodeScanned = ({type, data}) => {
  setScanData(data);
  // console.log(`Data: ${data}`);
  // console.log(`Type: ${type}`);
};

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
        />
      {scanData && <TouchableOpacity style={styles.button} onPress={() => setScanData(undefined)}>
         <Text style={styles.buttonTitle} >Scan Again</Text>
          </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#49111C',
    width: 150,
    height: 50,
    borderRadius: 20,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 20,
    color:'white',
    fontWeight: 800
  }

});