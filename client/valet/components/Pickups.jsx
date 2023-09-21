import React, {useState, useEffect, useContext} from 'react';
import { View } from 'react-native';
import axios from 'axios';
import CarCard from './CarCard.jsx';
import { RefreshContext } from './CarManage.jsx';
import {Text, StyleSheet} from 'react-native';

const Pickups = ({garage = 1, navigation}) => {
  const refreshKey = useContext(RefreshContext);
  const [resInfo, setResInfo] = useState([])

  useEffect (() => {
    axios.get(`http://localhost:3000/reservations/${garage}`, {
      params: {
        filter: 'picking-up'
      }
    })
    .then(res => {
      // console.log('res log', res.data)
      setResInfo(res.data)
    })
    .catch(err => console.log('Error fetching reserved', err))
  }, [refreshKey])

  return (
    <View>
      {resInfo.length === 0 ?
       <View style={styles.container}>
         <Text style={styles.nores}>No Pickups Scheduled</Text>
       </View>
         :
        <View>
         {resInfo.map(res => <CarCard key={res.confirmation_id} navigation={navigation} info={res}/>)}
        </View>
     }

    </View>

  )
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nores: {
      color: '#49111c',
      fontWeight: 'bold',
      fontSize: 20,
    }})

export default Pickups;

