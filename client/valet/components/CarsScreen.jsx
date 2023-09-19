import { View,Text,Image,TextInput,ScrollView,StyleSheet } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CarManage from './CarManage';

const Stack = createStackNavigator();

export default CarsScreen = () => {

  return (
    <Stack.Navigator screenOptions={{
      headerShown: true
    }}
    >
    <Stack.Screen
        name="CarManage"
        component={CarManage}
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