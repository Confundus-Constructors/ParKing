import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faIdCard, faFileInvoice, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { launchImageLibrary } from 'react-native-image-picker';




const UploadID = ({navigation, isUploaded, setIsUploaded}) => {
  const [imageSource, setImageSource] = useState(null);
  const [seeModal, setSeeModal] = useState(false);
  const [driverLicenseImage, setDriverLicenseImage] = useState(null);
  const [insuranceImage, setInsuranceImage] = useState(null);
  const [supplementalDocsImage, setSupplementalDocsImage] = useState(null);

  const chooseImage = (setImage) => {
    const options = {
      title: `Upload`,
      storageOptions: {
        skipBackup: true,
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = response.assets[0].uri
        setImage(source);
      }
    });
  };

  useEffect(() => {
    if (driverLicenseImage && insuranceImage && supplementalDocsImage) {
      setIsUploaded(true);
    } else {
      setIsUploaded(false);
    }
  }, [driverLicenseImage, insuranceImage, supplementalDocsImage]);


  return (
    <View style={styles.container}>
    <View style={styles.uploads}>

    <TouchableOpacity style={styles.box} onPress={() => chooseImage(setDriverLicenseImage)}>
    {driverLicenseImage ? (
      <View style={{flexDirection: 'row'}}>
        <Text style={{marginLeft: 6, fontWeight: 'bold', color: 'green', fontSize: 18}}>
        &#x2713;
        </Text>
        <Text style={{marginLeft: 6, fontWeight: 'bold', color: 'lightgray', fontSize: 18}}>
          Driver's License Uploaded
        </Text>
      </View>
    ) : (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesomeIcon icon={faIdCard} style={{ color: "white", opacity: 1 }} size={30} fade-size={'lg'} />
        <View style={{ marginLeft: 10 }}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18 }}>
            Valid Driver's License
          </Text>
        </View>
      </View>
    )}
    </TouchableOpacity>
    </View>
        <View style={styles.uploads}>
        <TouchableOpacity style={styles.box} onPress={() => chooseImage(setInsuranceImage)}>
        {insuranceImage ? (
          <View style={{flexDirection: 'row'}}>
          <Text style={{marginLeft: 6, fontWeight: 'bold', color: 'green', fontSize: 18}}>
          &#x2713;
          </Text>
          <Text style={{marginLeft: 6, fontWeight: 'bold', color: 'lightgray', fontSize: 18}}>
            Proof of Insurance Uploaded
          </Text>
        </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faFileInvoice} style={{ color: "white", opacity: 1 }} size={30} fade-size={'lg'} />
            <View style={{ marginLeft: 10 }}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18 }}>
                Proof of Car Insurance
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
        </View>
        <View style={styles.uploads}>
        <TouchableOpacity style={styles.box} onPress={() => chooseImage(setSupplementalDocsImage)}>
        {supplementalDocsImage ? (
          <View style={{flexDirection: 'row'}}>
          <Text style={{marginLeft: 6, fontWeight: 'bold', color: 'green', fontSize: 18}}>
          &#x2713;
          </Text>
          <Text style={{marginLeft: 6, fontWeight: 'bold', color: 'lightgray', fontSize: 18}}>
            Supplementals Uploaded
          </Text>
        </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faFolderOpen} style={{ color: "white", opacity: 1 }} size={30} fade-size={'lg'}/>
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
    width: 200
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
    padding: 5,
    paddingHorizontal: 9,
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
