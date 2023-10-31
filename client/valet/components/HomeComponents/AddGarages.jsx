import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import Spot from './ParkingSpot';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import {Button} from 'react-native-elements';


export function AddGarages({ checkTokenExpirationAndRefresh, onAdd, accessToken, mapRegion, tempPin, setTempPin, selectedPinCoordinate, formatAddress, suggestions, setSuggestions, setToggler, secondaryAddress, setSecondaryAddress, pin, garage, setGaddress, gaddress, clearField2}) {

    const fetchAutocompleteSuggestions = async (input) => {
        const searchLocation = mapRegion.latitude + ',' + mapRegion.longitude;
        const apiUrl = `https://maps-api.apple.com/v1/searchAutocomplete?q=${encodeURIComponent(input)}&resultTypeFilter=Address&searchLocation=${searchLocation}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                if (data.results) {
                    setSuggestions(data.results);
                    setToggler(garage)
                } else {
                    setSuggestions([]);
                    setToggler(pin)
                }
            }
        } catch (error) {
            console.error('Error fetching autocomplete suggestions:', error);
        }
    };


    const handleGeocode = async (addressToGeocode) => {
       await checkTokenExpirationAndRefresh();
        const encodedAddress = encodeURIComponent(addressToGeocode);
        const apiUrl = `https://maps-api.apple.com/v1/geocode?q=${encodedAddress}`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            const { latitude, longitude } = data.results[0].coordinate;
            onAdd({ latitude, longitude });
        } else {
            console.error(`Error: ${response.status}`);
        }
    };


    const handleInputChange = (text) => {
        setSecondaryAddress(text);
       fetchAutocompleteSuggestions(text);
       setGaddress(text)
       checkTokenExpirationAndRefresh()
    }

    let backArrow2;
    if (gaddress.length > 0) {
        backArrow2 = (
          <Button color="#49111c"
          titleStyle={{color: "#5A5A5A", fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}
            buttonStyle={{
            backgroundColor: "transparent",
            borderRadius: 20,
            height: 40,
            width: 40,
          }}
          containerStyle={{ zindex: 3, position: 'absolute', marginTop: 0, left: 0}}
          title='&#x276E;' onPress={() => clearField2()}/>
        )
      }



    return (
        <View style={styles.secondaryInputContainer}>
        <View style={{zIndex:5, position: 'absolute', top: '23%', left: '6%'}}>
            {backArrow2}
        </View>
            <TextInput
                style={styles.input}
                placeholder="Add parking location"
                value={gaddress}
                placeholderTextColor='#5A5A5A'
                onChangeText={(text) => {
                    handleInputChange(text)
                }}
            />
         </View>
    )
}

export const AddPin = ({secondaryAddress, setSecondaryAddress, tempPin, setTempPin, addy, setAddy, setAdditionalPins, selectedPinCoordinate, suggestions}) => {
    const [numOfSpots, setNumOfSpots] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [spots, setSpots] = useState([]);
    const [locationName, setLocationName] = useState("");
    const [locationList, setLocationList] = useState([]);

    return (
    <View style={{zIndex: 5, flexDirection: 'column', alignItems: 'center'}}>
    {(tempPin && suggestions.length <= 0) &&
    <View>
    <Button color="#49111c"
      titleStyle={{color: "#5A5A5A", fontWeight: 'bold', fontSize: 16, marginBottom: 0 }}
        buttonStyle={{
        backgroundColor: "#d3d3d3",
        borderRadius: 20,
        height: 40,
        width: 80
      }}
      title='Save' onPress={() => setModalVisible(true)}/>
     </View>
    }

    <Spot spots={spots}/>

    <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
            setModalVisible(false);
        }}
    >
    <View style={styles.modalContainer}>
        <SafeAreaView>
            <View style={styles.modal}>
            <Text style={{fontSize: 19, color: '#696969', fontWeight: 'bold'}}>Save This Parking Location</Text>
            <Text>{addy}</Text>
                <TextInput
                    style={styles.modaltext}
                    placeholder="Name this parking location"
                    value={locationName}
                    onChangeText={text => setLocationName(text)}
                />

                <TextInput style={styles.modaltext}
                    placeholder="Number of spots"
                    value={numOfSpots.toString()}
                    onChangeText={text => setNumOfSpots(parseInt(text))}
                    keyboardType="numeric"
                />
    <View style={{flexDirection: 'row', margin: 10, borderTopWidth: 1,  borderColor: '#dcdcdc', width: 350, justifyContent: 'space-around', paddingTop: 5, paddingHorizontal: 25}}>

            <Button
            title="Cancel"
            containerStyle={{backgroundColor: 'transparent'}}
            titleStyle={{color: '#49111c', fontSize: 20}}
            buttonStyle={{ backgroundColor: 'transparent' }}
            onPress={() => {setModalVisible(false); setLocationName(""); setSecondaryAddress("");
        }} />

            <View style={styles.separator}></View>

            <Button
            title="Save"
            containerStyle={{backgroundColor: 'transparent'}}
            titleStyle={{color: '#49111c', fontWeight: 'bold', fontSize: 20}}
            buttonStyle={{ backgroundColor: 'transparent' }}
            onPress={() => {
            setLocationList(prev => [...prev, secondaryAddress]);
            setSpots(prevSpots =>[...prevSpots, {
                address: locationList,
                title: locationName,
                spots: numOfSpots
            }])
            setModalVisible(false);
            setLocationName("");
            setNumOfSpots("");
            setSecondaryAddress("");
            setAdditionalPins(prevPins => [...prevPins, selectedPinCoordinate]);
            setTempPin(null);
            setAddy(null)
        }}
    />
            </View>
        </View>
            </SafeAreaView>
        </View>
    </Modal>
    </View>
    );
}

const styles = StyleSheet.create({
    secondaryInputContainer: {
        flex: 1,
        alignItems: 'center',
        zIndex: 4
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    },
    input: {
        borderWidth: 0.5,
        borderColor: '#ccc',
        marginTop: 5,
        zIndex: 4,
        backgroundColor: 'white',
        width: 350,
        height: 50,
        padding: 12,
        paddingHorizontal: 38,
        borderRadius: 30,
        alignItems: 'flex-start',
        fontSize: 20,
        fontFamily: 'System',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
      overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 2,
        position: 'absolute',
        marginTop: -150,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        width: '100%',
        height: 1000,
      },
    suggestionContainer: {
        borderWidth: 0.5,
        borderColor: '#ccc',
        padding: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        height: 60,
        width: '100%',

    },
    modalContainer: {
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modal: {
    width: 350,
    height: 215,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 20,
    marginTop: '5',
    alignItems: 'center'
  },
  modaltext: {
    fontSize: 17,
    backgroundColor: 'white',
    margin: 3,
    width: '100%',
    height: 40,
    padding: 10,
    borderRadius: 20
  },
  separator: {
    width: 1,
    height: 40,
    backgroundColor: '#dcdcdc',
  },
});
