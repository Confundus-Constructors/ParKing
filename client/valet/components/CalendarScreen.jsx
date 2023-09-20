import { View,Text,Image,TextInput,ScrollView,StyleSheet } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Calendar from './Calendar';

const Stack = createStackNavigator();

export default CalendarScreen = () => {

  return (
    <Stack.Navigator screenOptions={{
      headerShown: true
    }}
    >
    <Stack.Screen
        name="Calendar"
        component={Calendar}
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