import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';

function AddGarages({ onAdd, accessToken, mapRegion }) {
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

    const handleAddressSelected = (address) => {
        setSecondaryAddress(address);
        setSuggestions([]); // Clear the suggestions
    };

    const handleGeocode = async () => {
        const encodedAddress = encodeURIComponent(secondaryAddress);
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
            setLocationList(prev => [...prev, secondaryAddress]);
            setSecondaryAddress('');
        } else {
            console.error(`Error: ${response.status}`);
        }
    };

    return (
        <View style={styles.secondaryInputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Enter parking location address"
                value={secondaryAddress}
                onChangeText={(text) => {
                    setSecondaryAddress(text);
                    fetchAutocompleteSuggestions(text);
                }}
            />
            <FlatList
                data={suggestions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleAddressSelected(item.displayLines.join(', '))}>
                        <Text>{item.displayLines.join(', ')}</Text>
                    </TouchableOpacity>
                )}
            />
            <Button title="Add Pin" onPress={handleGeocode} />
            <FlatList
                data={locationList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    secondaryInputContainer: {
        marginTop: 10,
        width: '100%',
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        paddingHorizontal: 10,
    }
});

export default AddGarages;
