import { Alert, StatusBar, SafeAreaView, View,Text,Image,TextInput,ScrollView,StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';


export default CameraScreen = ({navigation}) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {

    navigation.addListener(

      'focus', () => {
        console.log(permission);
        // if (permission) {
          requestPermission();
        // } else if (!permission) {
      //     Alert.alert('Camera Permission Denied','Please Allow Camera Access in Settings')
      //   }
      // })},
      })},
    []);


    console.log(permission);
    if (permission !== null && permission.granted) {
      return (
        <View>
          <Camera style={styles.camera} type={type}>
            {/* <View style={styles.buttonContainer}> */}
              {/* <TouchableOpacity style={styles.button} onPress={toggleCameraType}> */}
                {/* <Text style={styles.text}>Flip Camera</Text> */}
              {/* </TouchableOpacity> */}
            {/* </View> */}
          </Camera>
        </View>

      )
    }
}

const styles = StyleSheet.create({
  camera: {
    height: '100%',
    width: '100%',
  }
 });