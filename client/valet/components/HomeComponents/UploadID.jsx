import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faIdCard, faFileInvoice, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
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
    <View style={styles.uploads}>

    <TouchableOpacity style={styles.box}>
    {imageSource ? (
      <Image source={imageSource} style={styles.image} />
    ) : (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesomeIcon icon={faIdCard} style={{ color: "white", opacity: 1 }} size={30} fade-size={'lg'} />
        <View style={{ marginLeft: 10 }}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18 }}>
            Add Valid  Driver's License
          </Text>
        </View>
      </View>
    )}
    </TouchableOpacity>
    </View>
        <View style={styles.uploads}>
        <TouchableOpacity style={styles.box}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} />
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faFileInvoice} style={{ color: "white", opacity: 1 }} size={30} fade-size={'lg'} />
            <View style={{ marginLeft: 10 }}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18 }}>
                Add Proof of Car Insurance
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
        </View>
        <View style={styles.uploads}>
        <TouchableOpacity style={styles.box}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} />
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faFolderOpen} style={{ color: "white", opacity: 1 }} size={30} fade-size={'lg'} />
            <View style={{ marginLeft: 10 }}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18 }}>
                Supplemental Documents
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
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
    width: 300,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#a9927d',
    borderRadius: 20,
    marginRight: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: 'lightgray',
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
  row: {
    flexDirection: 'row',
  },
  uploads: {
    alignItems: 'center',
    margin: 3
  },
  littletitle: {
    color: 'grey',
    margin: 2,
  }
})

export default UploadID;
