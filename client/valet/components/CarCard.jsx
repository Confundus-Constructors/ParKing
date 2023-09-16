import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';


const CarCard = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.boldText}>Reservation ID: [Value]</Text>
        <Text style={styles.boldText}>Owner: [Value]</Text>
        <View style={styles.row}>
          <View>
            <Text>Make: [Value]</Text>
            <Text>Color: [Value]</Text>
            <Text>License Plate: [Value]</Text>
          </View>
          <View>
             <Text>IMAGE BOX</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text>Arrives:  [Value]</Text>
            <Text>Departs: [Value]</Text>
          </View>
          <View>
            <Text>Garage: [Value]</Text>
            <Text>Spot ID: [Value]</Text>
          </View>
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 0,
    marginTop: 100,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  boldText: {
    fontWeight: 'bold',
  }
});

export default CarCard;