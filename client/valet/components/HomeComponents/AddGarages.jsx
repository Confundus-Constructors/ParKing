import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, TouchableOpacity, Modal, SafeAreaView, KeyboardAvoidingView } from 'react-native';

function AddGarages({ checkTokenExpirationAndRefresh, onAdd, accessToken, mapRegion, tempPin, setTempPin, setAdditionalPins }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [numOfSpots, setNumOfSpots] = useState("");

    const [secondaryAddress, setSecondaryAddress] = useState('');
    const [suggestions, setSuggestions] = useState([]);
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
                } else {
                    setSuggestions([]);
                }
            }
        } catch (error) {
            console.error('Error fetching autocomplete suggestions:', error);
        }
    };

    const handleAddressSelected = async (address) => {
      const formattedAddress = formatAddress(address.displayLines);
      handleGeocode(formattedAddress);

      setSecondaryAddress(formattedAddress);
      setSuggestions([]); // Clear the suggestions
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
            console.log('blogger', data)

            const { latitude, longitude } = data.results[0].coordinate;
            onAdd({ latitude, longitude });
        } else {
            console.error(`Error: ${response.status}`);
        }
    };

    const formatAddress = (displayLines) => {
      console.log('formatlog', displayLines)
      const cityState = displayLines[1].split(', ').slice(0, 2);
      return displayLines[0] + ', ' + cityState.join(', ');
    };


    return (
        <KeyboardAvoidingView style={styles.secondaryInputContainer} behavior='padding' enabled>
            <TextInput
                style={styles.input}
                placeholder="Enter parking location address"
                value={secondaryAddress}
                onChangeText={(text) => {
                    setSecondaryAddress(text);
                    fetchAutocompleteSuggestions(text);
                }}
            />
          <View style={styles.overlay}>
            <FlatList
                data={suggestions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.suggestionContainer} onPress={() => handleAddressSelected(item)}>
                        <Text>{formatAddress(item.displayLines)}</Text>
                    </TouchableOpacity>
                )}
            />
            </View>
            <Button title="Add Pin" onPress={() => setModalVisible(true)} />
            <FlatList
                data={locationList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
            />

<Modal
    animationType="slide"
    transparent={true}  // This should be true to allow for a transparent background
    visible={isModalVisible}
    onRequestClose={() => {
        setModalVisible(false);
    }}
>
    <View style={styles.modalContainer}>
        <SafeAreaView>
            <View style={styles.modal}>
            <Text style={{fontSize: 17}}>{secondaryAddress}</Text>
            <TextInput
                    style={[styles.modaltext, {marginTop: 10}]}
                    placeholder="Parking Location Name"
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
        setModalVisible(false);
        setLocationName("");
        setNumOfSpots("");
        setSecondaryAddress("");
        setAdditionalPins(prevPins => [...prevPins, tempPin]);
        setTempPin(null);
    }}
/>

                <Button title="Cancel" onPress={() => {setModalVisible(false); setTempPin(null); setLocationName(""); setSecondaryAddress("");}} />
            </View>
        </SafeAreaView>
    </View>
</Modal>


        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    secondaryInputContainer: {
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    },
    input: {
      height: 40,
      width: '100%',
      borderWidth: 0.5,
      borderColor: '#ccc',
      marginTop: 5,
      paddingHorizontal: 10,

    },
    overlay: {
      zIndex: 2,
      position: 'absolute',
      top: 40,  // TextInput Height
      left: 0,
      right: 0,
      maxHeight: 520,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',  // semi-transparent background
    },
    suggestionContainer: {
      borderWidth: 0.5,
      borderColor: '#ccc',
      padding: 15,
      backgroundColor: '#fff',
      marginBottom: 0,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',  // For a semi-transparent background outside the modal
  },
  modal: {
      width: 400,
      height: 200,
      backgroundColor: '#F5F5F5',
      borderRadius: 10,
      padding: 20,
      marginTop: 420,
  },
  modaltext:{
    fontSize: 17,
    backgroundColor: 'white',
    margin: 3,
  }
});
export default AddGarages;
