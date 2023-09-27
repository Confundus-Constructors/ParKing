import React, {useEffect, useState} from 'react';
import CarCard from './CarCard.jsx'
import {View, Text, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Reserved from './Reserved.jsx';
import Parked from './Parked.jsx';
import Pickups from './Pickups.jsx';
import {useRoute} from '@react-navigation/native';


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
      <Text>Pickups</Text>
    </SafeAreaView>
  )
}

export const RefreshContext = React.createContext();

const noreserv = 'No Reservations'
const CarManage = ({navigation}) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const route = useRoute();
  const garage = route.params.garage;
  console.log('garage logcm', garage)


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
          marginBottom: 3,
        },
        indicatorStyle: {
          backgroundColor: 'white',
        },
      }}>
        <Tab.Screen garage={garage} name="Reserved" component={Reserved}/>
        <Tab.Screen garage={garage} name="Parked" component={Parked} />
        <Tab.Screen garage={garage} name="Pickups" component={Pickups} />
      </Tab.Navigator>
      </RefreshContext.Provider>
    </SafeAreaView>
  )
}

export default CarManage;