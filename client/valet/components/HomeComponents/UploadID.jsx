import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import ImagePicker from 'react-native-image-picker';




const UploadID = ({navigation}) => {
  const [imageSource, setImageSource] = useState(null);
  const [seeModal, setSeeModal] = useState(false);


  const addPic = () => {
    navigation.navigate('CameraMain');
    setSeeModal(false);
  }

  const chooseImage = () => {
    const options = {
      title: `Add image of your driver's license and insurance card`,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setImageSource(source);
      }
    });
  };


  return (
    <View style={styles.container}>
    <View style={styles.row}>
    <View style={styles.uploads}>
      <Text style={styles.littletitle}>Driver's License Front</Text>
        <TouchableOpacity style={styles.box} onPress={addPic}>
            {imageSource ? (
              <Image source={imageSource} style={styles.image} />
            ) : (
              <FontAwesomeIcon icon={faCamera} style={{color: "#a9927d", opacity: 0.7}} size={80} fade-size={'lg'}/>
            )}
        </TouchableOpacity>
    </View>
    <View style={styles.uploads}>
    <Text style={styles.littletitle}>Driver's License Back</Text>
        <TouchableOpacity style={styles.box} onPress={addPic}>
            {imageSource ? (
              <Image source={imageSource} style={styles.image} />
            ) : (
              <FontAwesomeIcon icon={faCamera} style={{color: "#a9927d", opacity: 0.7}} size={80} fade-size={'lg'}/>
            )}
        </TouchableOpacity>
    </View>
    </View>
    <View style={styles.row}>
    <View style={styles.uploads}>
    <Text style={styles.littletitle}>Insurance Card</Text>
        <TouchableOpacity style={styles.box} onPress={addPic}>
            {imageSource ? (
              <Image source={imageSource} style={styles.image} />
            ) : (
              <FontAwesomeIcon icon={faCamera} style={{color: "#a9927d", opacity: 0.7}} size={80} fade-size={'lg'}/>
            )}
        </TouchableOpacity>
    </View>
    <View style={styles.uploads}>
    <Text style={styles.littletitle}>Supplemental </Text>
        <TouchableOpacity style={styles.box} onPress={addPic}>
            {imageSource ? (
              <Image source={imageSource} style={styles.image} />
            ) : (
              <FontAwesomeIcon icon={faCamera} style={{color: "#a9927d", opacity: 0.7}} size={80} fade-size={'lg'}/>
            )}
        </TouchableOpacity>
    </View>
    </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
    resizeMode: "cover",
    position: 'absolute',
    zIndex: 1
  },
  box: {
    width: 150,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
  },
  uploads: {
    alignItems: 'center',
  },
  littletitle: {
    color: 'grey',
    margin: 2,
  }
})

export default UploadID;
