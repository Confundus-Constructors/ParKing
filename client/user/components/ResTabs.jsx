import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import { NavigationContainer,useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Reservations from './Reservations.jsx';
import ResCopy from './ResCopy.jsx';
import Upcoming from './Upcoming.jsx';

const Tab = createMaterialTopTabNavigator();

function Upcoming_first() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Upcoming</Text>
    </SafeAreaView>
  )
}

function Current() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Current</Text>
    </SafeAreaView>
  )
}

function Past() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Past</Text>
    </SafeAreaView>
  )
}

function Cancelled() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Cancelled</Text>
    </SafeAreaView>
  )
}

export const RefreshContext = React.createContext();

const ResTabs = () => {
  const route = useRoute();
  const userId = route.params.data;

  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <NavigationContainer> */}
        <RefreshContext.Provider value={refreshKey}>
          <Tab.Navigator
            tabBarOptions={{
              activeTintColor: 'white',
              inactiveTintColor: 'black',
              labelStyle: {
                fontSize: 10,
                fontWeight: 'bold',
              },
              style: {
                backgroundColor: 'gray',
              },
              indicatorStyle: {
                backgroundColor: 'white',
              },
            }}
          >
            <Tab.Screen name="Upcoming" initialParams={{data: userId}} component={Upcoming} />
            <Tab.Screen name="Current" initialParams={{data: userId}} component={Reservations} />
            {/* <Tab.Screen name="Past" component={Past} /> */}
            {/* <Tab.Screen name="Cancelled" component={Cancelled} /> */}
          </Tab.Navigator>
        </RefreshContext.Provider>
      {/* </NavigationContainer> */}
    </SafeAreaView>
  );
};

export default ResTabs;
// pass qrcode to reservations differently
// or maybe just read transactions/userid to get all transactions that are upcoming
// for current reservation filter by reservation start date and current date (new Date())