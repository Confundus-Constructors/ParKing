import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import { MyContext } from './DynamicTabs';
import Schedule from './Schedule';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


function LocTab() {
 const {defaultCityState} = React.useContext(MyContext)
 const navigation = useNavigation();

 const checkTokenExpirationAndRefresh = () => <Text>Hi</Text>

 const handleLocations = () => {
  navigation.navigate('MyMap', {defaultCityState: defaultCityState})
 }

  return (
    <View style={styles.container}>

       <TouchableOpacity style={styles.toMap}
       onPress={handleLocations}>
        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row'}}>
        <FontAwesomeIcon icon={faMapPin} size={25} color="#49111c" />
          <Text style={styles.inputText}>
          Add service and parking location</Text>
        </View>
      </TouchableOpacity>
      <GestureHandlerRootView>

      <Schedule />
      </GestureHandlerRootView>


    </View>  )
}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
  },
  inputText: {
    fontSize: 20,
    color: '#5A5A5A',
    fontFamily: 'System',
    marginLeft: 6,
  },
  toMap: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    marginTop: 2,
    zIndex: 4,
    backgroundColor: 'white',
    width: 350,
    height: 50,
    padding: 12,
    paddingHorizontal: 12,
    borderRadius: 30,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
})

export default LocTab;