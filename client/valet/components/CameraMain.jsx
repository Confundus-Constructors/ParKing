import { Alert, Pressable, TouchableOpacity,View,Text,StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

export default CameraScreen = ({navigation}) => {
  const cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState();
  const [taken, setTaken] = useState(false);
  const [blob, setBlob] = useState();

  const handleTakePic = async () => {
    if (cameraRef) {
      try {
      const newPhoto = await cameraRef.current.takePictureAsync();
      cameraRef.current.pausePreview();
      setTaken(true);
      const blob = await (await fetch(newPhoto.uri)).blob();
      console.log(blob);
      setImage(newPhoto.uri);
      setBlob(blob);
      } catch(e) {
        console.log(e);
      }
    }
  }

  const handleUsePic = () => {
    navigation.navigate('CheckIn', {image: image, blob: blob})
  }

  const handleRetake =( ) => {
    setTaken(false);
    cameraRef.current.resumePreview();
  }

  if (permission !== null && permission.granted) {
    return (
      <View>
        <Camera
          barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        ref={cameraRef}
        style={styles.camera}
        type={type}>
          {!taken ?
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleTakePic}>
              <Text style={styles.text}>Take Picture</Text>
            </TouchableOpacity>
          </View> :
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleUsePic}>
              <Text style={styles.text}>Use Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRetake}>
              <Text style={styles.text}>Retake</Text>
            </TouchableOpacity>
          </View>
          }
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
    justifyContent: 'center',
    marginTop: 30
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