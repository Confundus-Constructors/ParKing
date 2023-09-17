import { Alert, Pressable, TouchableOpacity,View,Text,StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
// import {
//   useFonts as useOswald,
//   Oswald_400Regular,
// } from "@expo-google-fonts/oswald";

export default CameraScreen = ({navigation}) => {
  const cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState();


  useEffect(() => {
    navigation.addListener(

      'focus', () => {
        // console.log(permission);
        // if (permission) {
          requestPermission();
        // } else if (!permission) {
      //     Alert.alert('Camera Permission Denied','Please Allow Camera Access in Settings')
      //   }
      // })},
      })},
    []);

    const handlePress = async () => {
      console.log(cameraRef);
      if (cameraRef) {
        try {
        const newPhoto = await cameraRef.current.takePictureAsync();
        setImage = (newPhoto.uri);
        } catch(e) {
          console.log(e);
        }
      }

    }

    if (permission !== null && permission.granted) {
      return (
        // <View style={styles.selectionContainer}>
        //   <Pressable style={styles.selectionButton} onPress={handlePress}>
        //     <Text style={styles.text}>Take Picture</Text>
        //   </Pressable>
        //   <Pressable style={styles.selectionButton} onPress={handlePress}>
        //     <Text style={styles.text}>Scan QR Code</Text>
        //   </Pressable>
        // </View>
        <View>
          <Camera
           barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          ref={cameraRef}
          style={styles.camera}
          type={type}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.text}>Take Picture</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>

      )
    }
}

const styles = StyleSheet.create({
  camera: {
    height: '100%',
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
    alignItems:'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 10,
    width: 250,
    height: 50,
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  selectionContainer: {
    height: '100%',
    justifyContent:'center',
    alignItems:'center'
  },
  selectionButton: {
    backgroundColor: '#49111C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 50,
    height: 100,
    width: 300,
  }
 });