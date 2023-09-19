import React from 'react';
import CarCard from './CarCard.jsx'
import {ScrollView} from 'react-native';

const CarManage = ({navigation}) => {

  return (
    <ScrollView>
      <CarCard navigation={navigation}/>
      <CarCard navigation={navigation}/>
      <CarCard navigation={navigation}/>
    </ScrollView>
  )
}

export default CarManage;