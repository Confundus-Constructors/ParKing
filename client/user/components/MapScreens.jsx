import { Alert, SafeAreaView, View,Text,Image,TextInput,ScrollView,StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapPlaceholder from './MapPlaceholder';

const Stack = createStackNavigator();

export default MapScreens = () => {

    return (
      <Stack.Navigator screenOptions={{
        headerShown: true
      }}
      >
        <Stack.Screen
          name="Map"
          component={MapPlaceholder}
          options={{
            title: 'ParKing',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold'
            }
          }}
          />
    </Stack.Navigator>
  )
}