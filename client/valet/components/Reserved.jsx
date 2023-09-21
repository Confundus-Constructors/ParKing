import React, {useState, useEffect, useContext} from 'react';
import { View } from 'react-native';
import axios from 'axios';
import CarCard from './CarCard.jsx';
import { RefreshContext } from './CarManage.jsx';

const Reserved = ({garage = 1, navigation}) => {
  const refreshKey = useContext(RefreshContext);
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
  }, [refreshKey])

  return (
    <View>
      {resInfo.map(res => <CarCard key={res.confirmation_id} navigation={navigation} info={res} buttonText={buttontext}/>)}
    </View>
  )

}

export default Reserved;