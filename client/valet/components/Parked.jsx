import React, {useState, useEffect, useContext} from 'react';
import { View, ScrollView } from 'react-native';
import axios from 'axios';
import CarCard from './CarCard.jsx';
import {host, port} from "../../../env.js";
import { RefreshContext } from './CarManage.jsx';
import {Text, StyleSheet} from 'react-native';


const Parked = ({garage = 1, navigation}) => {
  console.log('garage logpu', garage)

  const refreshKey = useContext(RefreshContext);
  const [resInfo, setResInfo] = useState([])

  useEffect (() => {
    axios.get(`http://${host}:${port}/reservations/${garage}`, {
      params: {
        filter: 'checked-in'
      }
    })
    .then(res => {
      // console.log('res log', res.data)
      setResInfo(res.data)
    })
    .then((result) => {
      console.log(result.data);
    })
    .catch(err => console.log('Error fetching reserved', err))
  }, [refreshKey])

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {resInfo.length === 0 ?
       <View style={styles.container}>
         <Text style={styles.nores}>No Cars Parked</Text>
       </View>
         :
        <View>
         {resInfo.map(res => <CarCard key={res.confirmation_id} navigation={navigation} garage={garage} info={res}/>)}
        </View>
     }

    </ScrollView>

  )
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    nores: {
      color: '#49111c',
      fontWeight: 'bold',
      fontSize: 20,
    }})

export default Parked;