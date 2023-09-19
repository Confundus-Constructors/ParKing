import React, {useState, useEffect} from 'react';
import { View} from 'react-native';
import axios from 'axios';
import CarCard from './CarCard.jsx';


const Parked = ({garage = 1}) => {
  const [resInfo, setResInfo] = useState([])

useEffect (() => {
  axios.get(`http://localhost:3000/reservations/${garage}`, {
    params: {
      filter: 'checked-in'
    }
  })
  .then(res => {
    console.log('res log', res.data)
    setResInfo(res.data)
  })
  .catch(err => console.log('Error fetching reserved', err))
}, [garage])

return (
  <View>
    {resInfo.map(res => <CarCard info={res}/>)}
  </View>
)

}

export default Parked;