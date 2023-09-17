import { Alert, SafeAreaView, View,Text,Image,TextInput,ScrollView,StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CameraMain from './CameraMain';
import QRScanner from './QRScanner';
import InfoConfirmation from './InfoConfirmation';

export default CameraScreen = ({navigation}) => {

  const Stack = createStackNavigator();

    return (
      <Stack.Navigator screenOptions={{
        headerShown: true
      }}
      >
         <Stack.Screen
          name="QRScanner"
          component={QRScanner}
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
          <Stack.Screen
          name="InfoConfirmation"
          component={InfoConfirmation}
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
        <Stack.Screen
          name="CameraMain"
          component={CameraMain}
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