import React from 'react';
import CarCard from './CarCard.jsx'
import {View, Text, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function ResTab() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CarCard />
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
        activeTintColor: 'white',
        inactiveTintColor: '#49111c',
        labelStyle: {
          fontSize: 16,
        },
        style: {
          backgroundColor: '#a9927d',
        },
        indicatorStyle: {
          backgroundColor: 'black',
        },
      }}>
        <Tab.Screen name="Reserved" component={CarCard} />
        <Tab.Screen name="Parked" component={ParkedTab} />
        <Tab.Screen name="Pickups" component={PickTab} />
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  )


}

export default CarManage;