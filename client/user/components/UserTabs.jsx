import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UHP from './UserHomePage.jsx';
import Reservations from './Reservations.jsx';
import Welcome from './Welcome.jsx';
import { FIREBASE_AUTH } from '../../../FirebaseConfig.ts';
import { signOut } from "firebase/auth";


export default UserTabs = () => {
  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent";

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
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
      barStyle={{ backgroundColor: 'black' }}
      activeColor="white"
      inactiveColor="black"
        inactiveTintColor='green'
        activeTintColor= 'red'
      >
      <Tab.Screen
          name="Home"
          component={UHP}
          options={{
            tabBarLabel: 'Home',
            barTintColor: 'white',
            // tabBarIcon: ({ color }) => (
            //   <MaterialCommunityIcons name="home" color={color} size={32} />
            // )
          }}
        />
        <Tab.Screen
          name="Reservations"
          component={Reservations}
          options={{
            tabBarLabel: 'Home',
            barTintColor: 'white',
            // tabBarIcon: ({ color }) => (
            //   <MaterialCommunityIcons name="home" color={color} size={32} />
            // )
          }}
        />
        <Tab.Screen
          name="Map"
          component={UHP}
          options={{
            tabBarLabel: 'Home',
            barTintColor: 'white',
            // tabBarIcon: ({ color }) => (
            //   <MaterialCommunityIcons name="home" color={color} size={32} />
            // )
          }}
        />
        <Tab.Screen
          name="Sign Out"
          component={Welcome}
          options={{
            tabBarLabel: 'Home',
            barTintColor: 'white',
            // tabBarIcon: ({ color }) => (
            //   <MaterialCommunityIcons name="home" color={color} size={32} />
            // )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
};