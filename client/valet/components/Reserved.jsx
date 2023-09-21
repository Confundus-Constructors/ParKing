import React, {useState, useEffect} from 'react';
import { View, ScrollView } from 'react-native';
import axios from 'axios';
import CarCard from './CarCard.jsx';

const Reserved = ({garage = 1, navigation}) => {
  console.log('reserved navigation log', navigation)

  const [resInfo, setResInfo] = useState([])
  const buttontext = 'Check In';

  useEffect (() => {
    axios.get(`http://localhost:3000/reservations/${garage}`, {
      params: {
        filter: 'reserved'
      }
    })
    .then(res => {
      // console.log('res log', res.data)
      setResInfo(res.data)
    })
    .catch(err => console.log('Error fetching reserved', err))
  }, [garage])

  return (
    <ScrollView>
      {resInfo.map(res => <CarCard key={res.confirmation_id} navigation={navigation} info={res} buttonText={buttontext}/>)}
    </ScrollView>
  )

}

export default Reserved;