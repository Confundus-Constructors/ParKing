import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import ValetHomeScreen from './ValetHomeScreen'
import Icon from 'react-native-ico-material-design';
import { Ionicons } from "@expo/vector-icons";
import CameraScreen from './CameraScreen';
import CarsScreen from './CarsScreen';
import { StatusBar } from 'react-native';
import Calendar from './Calendar';

export default ValetTabs = () => {
  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent";

  const navTheme = {
    colors: {
      background: "white"
    }
  };

  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar  barStyle="light-content" translucent={true} />
      <Tab.Navigator
      barStyle={{ backgroundColor: 'black' }}
      activeColor="white"
      inactiveColor="gray"
      >
      <Tab.Screen
          name="Home"
          component={ValetHomeScreen}
          options={{
            tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="md-home"
                  size={24}
                  color={tabInfo.focused ? "white" : "gray"}
                />
              );
            }
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={Calendar}
          options={{
            tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="calendar"
                  size={24}
                  color={tabInfo.focused ? "white" : "gray"}
                />
              );
            }
          }}
        />
        <Tab.Screen
          name="Cars"
          component={CarsScreen}
          options={{
            tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="car"
                  size={24}
                  color={tabInfo.focused ? "white" : "gray"}
                />
              );
            }
          }}
        />
        <Tab.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="camera"
                  size={24}
                  color={tabInfo.focused ? "white" : "gray"}
                />
              );
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
};