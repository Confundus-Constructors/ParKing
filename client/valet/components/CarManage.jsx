import React from 'react';
import CarCard from './CarCard.jsx'
import {View, Text, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function ResTab() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Reservations</Text>
    </SafeAreaView>
  )
}

function ParkedTab() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Parked</Text>
    </SafeAreaView>
  )
}

function PickTab() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Puckups</Text>
    </SafeAreaView>
  )
}

const CarManage = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 16,
        },
        style: {
          backgroundColor: 'blue',
        },
        indicatorStyle: {
          backgroundColor: 'yellow',
        },
      }}>
        <Tab.Screen name="Reserved" component={ResTab} />
        <Tab.Screen name="Parked" component={ParkedTab} />
        <Tab.Screen name="Pickups" component={PickTab} />
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  )


}

export default CarManage;