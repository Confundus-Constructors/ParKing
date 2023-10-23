import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import Spot from './ParkingSpot';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';

function AddGarages({ checkTokenExpirationAndRefresh, onAdd, accessToken, mapRegion, tempPin, setTempPin, setAdditionalPins, selectedPinCoordinate, formatAddress, suggestions, setSuggestions, setToggler, secondaryAddress, setSecondaryAddress, pin, garage, setGaddress, gaddress}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [numOfSpots, setNumOfSpots] = useState("");
  const [locationList, setLocationList] = useState([]);

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

    const [spots, setSpots] = useState([]);

    const handleAddressSelected = async (address) => {
      const formattedAddress = formatAddress(address);
      handleGeocode(formattedAddress);
      setSecondaryAddress(formattedAddress);
      setSuggestions([]); // Clear the suggestions
      setToggler(pin)
    };


    const handleGeocode = async (addressToGeocode) => {
       await checkTokenExpirationAndRefresh();
        const encodedAddress = encodeURIComponent(addressToGeocode);
        console.log('logger', encodedAddress)
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

    // const formatAddress = (displayLines) => {
    //   console.log('formatlog', displayLines)
    //   const cityState = displayLines[1].split(', ').slice(0, 2);
    //   return displayLines[0] + ', ' + cityState.join(', ');
    // };
    const handleInputChange = (text) => {
        setSecondaryAddress(text);
       fetchAutocompleteSuggestions(text);
       setGaddress(text)
    }

    return (
    <View style={{flex: 1, width: '100%', zIndex: 4}}>
        <View style={styles.secondaryInputContainer}>
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
    {/* { suggestions.length > 0 && (
        <View style={styles.overlay}>
        <FlatList
        style={{marginTop: '55%'}}
        data={suggestions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity style={styles.suggestionContainer} onPress={() => handleAddressSelected(item)}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>{formatAddress(item)}</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{marginRight: 8, marginTop:1}}>
                    <Text style={{color:'gray'}}>{item.location.latitude.toFixed(6)} N</Text>
                    <Text style={{color:'gray'}}>{item.location.longitude.toFixed(6)} W</Text>
                    </View>
                    <View style={{marginTop:7}}>
                    <FontAwesomeIcon icon={faCar} size={22} color="#49111c" />
                    </View>
                </View>
            </View>
            </TouchableOpacity>
            )}
        />
        </View>
    )} */}

    {/* <View style={{margin: 50}}>
         <Button title="Add Pin" onPress={() => setModalVisible(true)} />
    </View> */}
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
            <Text style={{fontSize: 19, color: 'gray' }}>Set Up Parking Location</Text>
            <Text style={{fontSize: 17}}>{secondaryAddress}</Text>
            <TextInput
                    style={[styles.modaltext, {marginTop: 10}]}
                    placeholder="Name this location"
                    value={locationName}
                    onChangeText={text => setLocationName(text)}
                />

                <TextInput style={styles.modaltext}
                    placeholder="Number of Spots"
                    value={numOfSpots}
                    onChangeText={text => setNumOfSpots(text)}
                    keyboardType="numeric"
                />
    <Button
        title="Add Location"
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
        }}
    />

            <Button title="Cancel" onPress={() => {setModalVisible(false); setTempPin(null); setLocationName(""); setSecondaryAddress("");}} />
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
        width: 310,
        height: 50,
        padding: 12,
        paddingHorizontal: 20,
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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',  // For a semi-transparent background outside the modal
  },
  modal: {
      width: 400,
      height: 240,
      backgroundColor: '#F5F5F5',
      borderRadius: 10,
      padding: 20,
      marginTop: 400,
      alignItems: 'center'
  },
  modaltext:{
    fontSize: 17,
    backgroundColor: 'white',
    margin: 3,
    width: '100%',
    height: 35,
    padding: 10,
  }
});
export default AddGarages;
