import React, {useState, useEffect, useContext} from 'react';
import { View } from 'react-native';
import axios from 'axios';
import CarCard from './CarCard.jsx';


const Parked = ({garage = 1, navigation}) => {
  const refreshKey = useContext(RefreshContext);
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
    .catch(err => console.log('Error fetching reserved', err))
  }, [refreshKey])

  return (
    <View>
      {resInfo.map(res => <CarCard key={res.confirmation_id} info={res} navigation={navigation}/>)}
    </View>
  )

}

export default Parked;