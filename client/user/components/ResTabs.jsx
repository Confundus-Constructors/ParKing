import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function Upcoming() {
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
            <Tab.Screen name="Upcoming" component={Upcoming} />
            <Tab.Screen name="Current" component={Current} />
            <Tab.Screen name="Past" component={Past} />
            <Tab.Screen name="Cancelled" component={Cancelled} />
          </Tab.Navigator>
        </RefreshContext.Provider>
      {/* </NavigationContainer> */}
    </SafeAreaView>
  );
};

export default ResTabs;
