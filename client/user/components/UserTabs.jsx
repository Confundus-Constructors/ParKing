import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {NavigationContainer,useNavigation,useRoute} from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UHP from './UserHomePage.jsx';
import ResTabs from './ResTabs.jsx';

import Welcome from './Welcome.jsx';
import { FIREBASE_AUTH } from '../../../FirebaseConfig.ts';
import { signOut } from "firebase/auth";


export default UserTabs = () => {
  const theme = useTheme();
  const route = useRoute();
  const id = route.params.data || 1;
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
      <Tab.Navigator
      barStyle={{ backgroundColor: 'black' }}
      activeColor="white"
      inactiveColor="black"
        inactiveTintColor='green'
        activeTintColor= 'red'
      >
      <Tab.Screen
          name="Home"
          initialParams={{ id: id }}
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
          component={ResTabs}
          initialParams={{ id: id }}
          options={{
            tabBarLabel: 'Home',
            barTintColor: 'white',
            // tabBarIcon: ({ color }) => (
            //   <MaterialCommunityIcons name="home" color={color} size={32} />
            // )
          }}
        />
        {/* <Tab.Screen
          name="Map"
          component={UHP}
          options={{
            tabBarLabel: 'Home',
            barTintColor: 'white',
            // tabBarIcon: ({ color }) => (
            //   <MaterialCommunityIcons name="home" color={color} size={32} />
            // )
          }}
        /> */}
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

  )
};