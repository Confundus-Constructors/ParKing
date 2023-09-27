import { Alert, SafeAreaView, View,Text,Image,TextInput,ScrollView,StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UHP from './UserHomePage.jsx';
import Reserve from "../components/UserReserve";
import Select from "../components/UserCarSelect";
import Checkout from "../components/Checkout";
import { useRoute } from '@react-navigation/native'

const Stack = createStackNavigator();

export default HomePageScreens = () => {
  const route = useRoute();
  const [userId,setUID] = useState(route.params.id);
  useEffect(() => {
    if (route.params) {
      setUID(route.params.id);
      console.log('in homepagescreens userid: ', route.params.id);
    }
  })
    return (
      <Stack.Navigator screenOptions={{
        headerShown: true
      }}
      >
        <Stack.Screen
          name="UHP"
          initialParams= {{data: userId}}
          component={UHP}
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
          name="Reserve"
          component={Reserve}
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
          name="Select"
          component={Select}
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
          name="Checkout"
          component={Checkout}
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