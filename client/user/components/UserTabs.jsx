import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Reservations from './Reservations.jsx';
import Welcome from './Welcome.jsx';
import { FIREBASE_AUTH } from '../../../FirebaseConfig.ts';
import { signOut } from "firebase/auth";
import MapScreens from './MapScreens';
import HomePageScreens from './HomePageScreens';
import { useRoute } from '@react-navigation/native';
import SignOutScreen from './SignOutScreen';
import {useState, useEffect} from 'react';

export default UserTabs = () => {
  const route = useRoute();
  const theme = useTheme();
  const [userId,setId] = useState(16);
  theme.colors.secondaryContainer = "transparent";

  useEffect(() => {
    if (route.params) {
      console.log('this is the user id', route.params.data)
      setId(route.params.data);
    }
  },[])

  const navTheme = {
    colors: {
      background: "white"
    }
  };

  const Tab = createMaterialBottomTabNavigator();
  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  return (
    // <NavigationContainer theme={navTheme}>
      <Tab.Navigator
      barStyle={{ backgroundColor: 'black' }}
      activeColor="white"
      inactiveColor="grey"
        // inactiveTintColor='grey'
        // activeTintColor= 'red'
      >
      <Tab.Screen
          name="Home"
          initialParams={{id: route.params.data}}
          component={HomePageScreens}
          options={{
            tabBarLabel: 'Home',
            barTintColor: 'white',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={32} />
            )
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreens}
          options={{
            tabBarLabel: 'Map',
            barTintColor: 'white',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="map" color={color} size={32} />
            )
          }}
        />
        <Tab.Screen
          name="Sign Out Screen"
          component={SignOutScreen}
          options={{
            tabBarLabel: 'Sign Out',
            barTintColor: 'white',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="exit-run" color={color} size={32} />
            )
          }}
        />
      </Tab.Navigator>
    // </NavigationContainer>
  )
};