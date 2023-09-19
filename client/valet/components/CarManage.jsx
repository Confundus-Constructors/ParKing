import React from 'react';
import CarCard from './CarCard.jsx'
import {ScrollView} from 'react-native';

const CarManage = () => {

  return (
    <ScrollView>
      <CarCard />
      <CarCard />
      <CarCard />
    </ScrollView>
  )
}

export default CarManage;