import React, {useState, useEffect} from 'react';
import { View, ScrollView } from 'react-native';
import axios from 'axios';
import CarCard from './CarCard.jsx';


const Parked = ({garage = 1, navigation}) => {
  const [resInfo, setResInfo] = useState([])

  useEffect (() => {
    axios.get(`http://localhost:3000/reservations/${garage}`, {
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
  }, [garage])

  return (
    <ScrollView>
      {resInfo.map(res => <CarCard key={res.confirmation_id} info={res} navigation={navigation}/>)}
    </ScrollView>
  )

}

export default Parked;