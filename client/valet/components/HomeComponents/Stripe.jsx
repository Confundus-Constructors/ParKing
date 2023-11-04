import { initStripe, useStripe } from '@stripe/stripe-react-native';
import React, { useState, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, StyleSheet, View, Button } from 'react-native';
import { CardField } from '@stripe/stripe-react-native';


const Stripe = ({blur}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { createPaymentMethod } = useStripe();


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    blur();
  };

  useEffect(() => {
    async function initializeStripe() {
      await initStripe({
        publishableKey: 'pk_test_51KmkwmD8fOfZHqZlVkg6wpMbUVM0V6sn1k1nV9lWiELW5nuLQQRHj7YR3tzZp2gyvxEQbjXUNbSCTvGQnFshyVCA00pnPNa8HV',      });
    }

    initializeStripe();
  }, []);

  const handleSave = async () => {
    if (createPaymentMethod) {
      const { error, paymentMethod } = await createPaymentMethod({
        type: 'Card',
      });

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Success", "Card details saved!");
        toggleModal();
      }
    }
  };

  return (
    <View>
       <TouchableOpacity style={styles.box}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ marginLeft: 10 }}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18 }}>
            Valid  Driver's License
          </Text>
        </View>
      </View>
    </TouchableOpacity>

      <Modal
  animationType="slide"
  transparent={true}
  visible={isModalVisible}
  onRequestClose={toggleModal} // for Android back button handling
>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: '90%', height: 220, backgroundColor: '#F7F7F7', borderRadius: 15, padding: 20 }}>
      <CardField
        postalCodeEnabled={true}
        placeholder={{ number: "0000 0000 0000 0000" }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
      />
      <Button title='Save' onPress={handleSave}/>
      <Button title='Close' onPress={toggleModal}/>
    </View>
  </View>
</Modal>

    </View>
  );

}
const styles = StyleSheet.create({
homeButton: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#A9927D',
  height: 28,
  width: 200,
  marginRight: 5,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.7,
  shadowRadius: 2,
  marginTop: 30,
},
homeText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 16
},
box: {
  width: 300,
  height: 40,
  justifyContent: 'center',
  alignItems: 'flex-start',
  backgroundColor: '#a9927d',
  borderRadius: 20,
  marginRight: 5,
  borderWidth: 1,
  padding: 10,
  borderColor: 'lightgray',
  shadowColor: '#000',
  shadowOffset: {width: 2, height: 2 },
  shadowOpacity: 0.6,
  shadowRadius: 2,
}
})

export default Stripe;