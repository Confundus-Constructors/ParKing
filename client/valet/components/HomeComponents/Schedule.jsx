import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from 'expo-checkbox';
import {Button} from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton } from 'react-native-gesture-handler';

const Schedule = () => {
  const [showFields, setShowFields] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [servicePeriods, setServicePeriods] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [actives, setActives] = useState(new Array(servicePeriods.length).fill(false));
  const handleAddPeriod = () => {
    setShowFields(true);
  };

  const handleSavePeriod = () => {
    setServicePeriods(prevPeriod => [...prevPeriod, [fromDate, toDate]])
    setShowFields(false)
  };

  const handleActivate = (index) => {
    const newActives = [...actives];
    newActives[index] = !newActives[index];
    setActives(newActives);
  };

  const handleDeletePeriod = (index) => {
    const newServicePeriods = [...servicePeriods];
    newServicePeriods.splice(index, 1);
    setServicePeriods(newServicePeriods);
  };


  const  renderRightActions = (index) => (
    <RectButton onPress={() => handleDeletePeriod(index)} style={styles.deleteButton}>
  <Text style={styles.deleteButtonText}>Delete</Text>
  </RectButton>
  );


  return (
    <View style={{marginTop: 20, marginBottom: 10, alignItems: 'center'}}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddPeriod}>
        <Text style={styles.buttonText}>Add Service Period</Text>
      </TouchableOpacity>

      {showFields && (
        <View style={styles.dateTime}>
        <View style={{width: 230, alignItems: 'center', backgroundColor: 'white', borderRadius: 10}}>
          <DateTimePicker
            value={fromDate}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                setFromDate(selectedDate);
              }
            }}
          />
          </View>

          <View style={{width: 230, alignItems: 'center', backgroundColor: 'white', borderRadius: 10, marginTop: 5}}>
          <DateTimePicker
            value={toDate}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                setToDate(selectedDate);
              }
            }}
          />
          </View>
          <View style={{flexDirection: 'row', marginTop: 0}}>
          <Button title="Cancel" onPress={() => setShowFields(false)}
            buttonStyle={{ backgroundColor: 'black', width: 110}}
            titleStyle={[styles.buttonText, {color: 'white'}, {fontWeight: '500'}]}
          />

          <Button title="Save" onPress={handleSavePeriod}
            buttonStyle={{ backgroundColor: 'black', width: 110}}
            titleStyle={[styles.buttonText, {color: 'white'}]}
          />
          </View>

        </View>
      )}
<FlatList
  data={servicePeriods}
  renderItem={({ item, index }) => (
    <Swipeable key={index} renderRightActions={() => renderRightActions(index)}>
    <View style={{ flexDirection: 'row', alignItems: 'center', width: 360}}>
      <View style={styles.activeButtonContainer}>
        <Button
          title={actives[index] ? 'Active' : 'Activate'}
          onPress={() => handleActivate(index)}
          buttonStyle={[
            styles.activeButton,
            actives[index] ? styles.activeButtonActive : null,
          ]}
          titleStyle={[
            styles.buttonText,
            { color: 'white', fontSize: 17 },
            { fontWeight: 'bold' },
          ]}
        />
      </View>
      <View style={styles.period}>
        <Text style={{ fontWeight: 'bold' }}>
          {item[0].toLocaleDateString("en-US", {
            weekday: 'long',
            month: 'short',
            year: 'numeric',
            day: 'numeric',
          })}{' '}
          {item[0].toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <Text style={{ marginTop: 4, fontWeight: 'bold' }}>
          {item[1].toLocaleDateString("en-US", {
            weekday: 'long',
            month: 'short',
            year: 'numeric',
            day: 'numeric',
          })}{' '}
          {item[1].toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
    </Swipeable>
  )}
/>
</View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 10,
    width: 180,
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
  },
  period: {
   alignItems: 'flex-start',
   marginLeft: 3,
   backgroundColor: '#f5f5f5',
   width: 270,
   borderRadius: 10,
   marginBottom: 10,
   paddingHorizontal: 20,
   shadowColor: '#000',
   shadowOffset: { width: 2, height: 2 },
   shadowOpacity: 0.1,
   shadowRadius: 1,
   padding: 3
  },
  activeButton: {
    backgroundColor: 'lightgray',
    width: 85,
    height: 43,
    borderRadius: 10,
  },
  activeButtonContainer: {
    marginTop: -7,
    width: 85,
    alignItems: 'center',
  },
  activeButtonActive: {
    backgroundColor: '#49111c'
  },
  deleteButton: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 10,
    height: 43
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
  },
  dateTime: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    height: 123,
    width: 240,
    padding: 5,
    marginBottom: 10
  },
});

export default Schedule;
