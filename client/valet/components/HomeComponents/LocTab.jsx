import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import { MyContext } from './DynamicTabs';


function LocTab() {
 const {defaultCityState} = React.useContext(MyContext)
 const navigation = useNavigation();

 const checkTokenExpirationAndRefresh = () => <Text>Hi</Text>

 const handleLocations = () => {
  navigation.navigate('MyMap', {defaultCityState: defaultCityState})
 }

  return (
    <View style={styles.container}>

       <TouchableOpacity style={styles.button}
       onPress={handleLocations}>
        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <FontAwesomeIcon icon={faMapPin} size={25} color="#49111c" />
          <Text style={styles.inputText}>
          Enter service location here</Text>
        </View>
      </TouchableOpacity>

    </View>  )
}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ECECEC',
    width: '85%',
    height: 50,
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'flex-start'
  },
  inputText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#5A5A5A',
    fontFamily: 'System',
    marginLeft: 15,
  }
})

export default LocTab;