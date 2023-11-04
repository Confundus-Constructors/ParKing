import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Modal, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {host, port} from "../../../../env.js";
import { useRoute } from "@react-navigation/native";
import {Button} from 'react-native-elements';



const ValetInfo = ({company, navigation, blur, setDefaultCityState}) => {

  const [seeModal, setSeeModal] = useState(false);
  const [operatorName, setOperatorName] = useState("Operator's Name");
  const [address, setAddress] = useState("Operator Address");
  const [city, setCity] = useState('City and State')
  const [email, setEmail] = useState("Operator's Email");
  const [phone, setPhone] = useState("Operator's Phone");
  const route = useRoute();
  const [operator, setOperator] = useState({
    name: "Operator's Name",
    phone: "Operator's Phone",
    email: "Operator's Email",
    address: "Operator's Address",
    city: 'City and State',
  });

  const handleEdit = () => {
    setSeeModal(true);
    blur();
  }

  const handleSubmit = () => {
    setSeeModal(false);
    blur();
  }

  useEffect(() => {
    setDefaultCityState (city)
  }, [city])

  const clearField = (fieldSetter) => {
    fieldSetter('');
  }

  const handleUpdate = () => {
    setOperator({
      name: operatorName,
      phone: phone,
      email: email,
      address: address,
      city: city,
    });

    handleSubmit();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleEdit}>
      {company && <Text style={styles.infoText}>{company}</Text>}
      <Text style={styles.infoText}>{operator.name ? operator.name : "Operator's Name"} </Text>
      <Text style={styles.infoText}>{operator.phone ? operator.phone : "Operator's Phone"} </Text>
      <Text style={[styles.infoText, {width: '100%'}]}>{operator.email ? operator.email : "Operator's Email"} </Text>
      <Text style={[styles.infoText, {width: '100%'}]}>{operator.address ? (operator.address + ', ' + operator.city) : "Operator's Address, City and State"} </Text>
      <Text style={styles.editText}>Tap to Edit</Text>
      </TouchableOpacity>
      <View>

     <Modal
       animationType='slide'
       transparent={true}
       visible={seeModal}
       onRequestClose={() => {
        setSeeModal(!seeModal);
       }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: '30%'}}>
          <View style={{ width: 300, height: 288, backgroundColor: '#F5F5F5', padding: 10, borderRadius: 10}}>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#3d3d3d', fontStyle: 'italic'}}>Add your info to get started</Text>
          </View>

            <TextInput style={[styles.input, {marginTop: 15}]}
            value={operatorName}
            onChangeText={setOperatorName}
            placeholder="Operator's Name"
            onFocus={() => clearField(setOperatorName)}
            />
            <TextInput style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone Number"
            onFocus={() => clearField(setPhone)}
            />
             <TextInput style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email Address"
            onFocus={() => clearField(setEmail)}
            />
             <TextInput style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Home Street Address"
            onFocus={() => clearField(setAddress)}
            />
             <TextInput style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="Home City, State"
            onFocus={() => clearField(setCity)}
            />



          <View style={{flexDirection: 'row', marginTop: 2, justifyContent: 'center'}}>
            <Button title="Cancel" onPress={handleSubmit}
              buttonStyle={{ backgroundColor: 'transparent', width: 120}}
              titleStyle={[styles.buttonText, {color: '#49111c', fontWeight: '500'}]}
            />

            <Button title="Save" onPress={handleUpdate}
              buttonStyle={{ backgroundColor: 'transparent', width: 120}}
              titleStyle={[styles.buttonText, {color: '#49111c'}]}
            />
          </View>

        </View>
        </View>
      </Modal>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  infoText: {
    flexShrink: 1,
    width: '80%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 15,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  homeButton: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A9927D',
    height: 25,
    width: 80,
    marginRight: 5,
  },
  homeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
  },
  editText: {
    marginTop: 3,
    fontWeight: 'light',
    fontStyle: 'italic',
    color: '#A9927D',
    fontSize: 12,
    marginLeft: 30,
  },
  input: {
   marginBottom: 10,
   height: 30,
   fontSize: 17,
   color: '#333',
   backgroundColor: '#FAFAFA',
   borderRadius: 5,
   paddingHorizontal: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
  },
})


export default ValetInfo