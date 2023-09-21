import React, {useEffect, useState} from 'react';
import CarCard from './CarCard.jsx'
import {View, Text, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Reserved from './Reserved.jsx';
import Parked from './Parked.jsx';
import Pickups from './Pickups.jsx';

const Tab = createMaterialTopTabNavigator();

function ResTab() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Upcoming</Text>
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
      <Text>Pickups</Text>
    </SafeAreaView>
  )
}

export const RefreshContext = React.createContext();

const CarManage = ({navigation}) => {
  const [refreshKey, setRefreshKey] = useState(0);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefreshKey(prev => prev + 1 );
    })
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
    {/* <NavigationContainer> */}
      <RefreshContext.Provider value={refreshKey}>
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
          backgroundColor: 'white',
        },
      }}>
        <Tab.Screen name="Reserved" component={Reserved}/>
        <Tab.Screen name="Parked" component={Parked} />
        <Tab.Screen name="Pickups" component={Pickups} />
      </Tab.Navigator>
      </RefreshContext.Provider>

    {/* </NavigationContainer> */}
    </SafeAreaView>
  )
}

export default CarManage;