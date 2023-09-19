import { View,Text,Image,TextInput,ScrollView,StyleSheet } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';

const Stack = createStackNavigator();

export default HomeScreen = () => {

  return (
    <Stack.Navigator screenOptions={{
      headerShown: true
    }}
    >
    <Stack.Screen
        name="Home"
        component={Home}
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