import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Button, Modal, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {host, port} from "../../../../env.js";
import { useRoute } from "@react-navigation/native";



const ValetInfo = ({company, navigation, blur, setDefaultCityState}) => {

  const [seeModal, setSeeModal] = useState(false);
  const [operatorName, setOperatorName] = useState("");
  const [address, setAddress] = useState("70 Pine St");
  const [city, setCity] = useState('New York, NY')
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const route = useRoute();

  // const id = route.params.data;
  // console.log('this is the id', id)


  // useEffect(() => {
  //   axios.get(`http://${host}:${port}/
  //   .then((result) => {
  //     if (result.data.rows[0].photo) {
  //       var base64 = result.data.rows[0].photo;
  //       var base64Pic = 'data:image/png;base64,' + base64;
  //       setImageSource(base64Pic)

  // })

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

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleEdit}>
      {company && <Text style={styles.infoText}>{company}</Text>}
      <Text style={styles.infoText}>{operatorName ? operatorName : <Text>Operator Name</Text>} </Text>
      <Text style={styles.infoText}>{address}, {city}</Text>
      <Text style={styles.infoText}>beck@workemail.com </Text>
      <Text style={styles.infoText}>555-555-5555</Text>
      <Text style={styles.editText}>Tap to Edit</Text></TouchableOpacity>

     <Modal
       animationType='slide'
       transparent={true}
       visible={seeModal}
       onRequestClose={() => {
        setSeeModal(!seeModal);
       }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{ width: 300, height: 270, backgroundColor: '#F5F5F5', padding: 10, borderRadius: 10}}>

            <TextInput style={styles.input}
            value={operatorName}
            onChangeText={setOperatorName}
            placeholder="Enter Operator Name" />
             <TextInput style={styles.input}
            value={operatorName}
            onChangeText={setAddress}
            placeholder="Enter Operator Street Address" />
             <TextInput style={styles.input}
            value={operatorName}
            onChangeText={setAddress}
            placeholder="Enter Operator City, State" />
             <TextInput style={styles.input}
            value={operatorName}
            onChangeText={setEmail}
            placeholder="Enter Operator Email" />
            <TextInput style={styles.input}
            value={operatorName}
            onChangeText={setPhone}
            placeholder="Enter Phone Number" />
            <Button title="Save Changes" onPress={handleSubmit} />
            <Button title="Cancel" onPress={handleSubmit} />

             </View>
             </View>
      </Modal>
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
   height: 25,
   fontSize: 16,
   color: '#333',
   backgroundColor: '#FAFAFA',
  }
})


export default ValetInfo