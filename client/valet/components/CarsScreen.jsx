import { View,Text,Image,TextInput,ScrollView,StyleSheet } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CarManage from './CarManage';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import CameraMain from './CameraMain';
import {useRoute} from '@react-navigation/native';

const Stack = createStackNavigator();


export default CarsScreen = () => {
  const route = useRoute();
  return (
    <Stack.Navigator screenOptions={{
      headerShown: true
    }}
    >
    <Stack.Screen
        name="CarManage"
        component={CarManage}
        initialParams={
          {garage: route.params.garage}
          }
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
          name="CheckIn"
          component={CheckIn}
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
          name="CheckOut"
          component={CheckOut}
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









