import { Alert, SafeAreaView, Pressable, TouchableOpacity, View, Text,StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Modal, Portal, PaperProvider } from 'react-native-paper';

export default InfoConfirmation = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Reservation ID: </Text>
        <Text style={styles.text}>Owner:</Text>
        <Text style={styles.text}>Make:</Text>
        <Text style={styles.text}>Color:</Text>
        <Text style={styles.text}>License Plate:</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle} onPress={handleConfirm}>Confirm Details</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} style={styles.modalContainer}>
        <View style={styles.modalView}>
          {!confirmed ? <Text>Confirming</Text> : <Text> Confirmed</Text>}
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A9927D',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    height: 'auto',
    width: '90%',
    borderRadius: 30,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 3,
    justifyContent: 'flex-start',
    padding: 50
  },
  button: {
    backgroundColor: '#49111C',
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonTitle: {
    color: 'white',
    borderRadius: 20,
    fontSize: 25
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  modalContainer: {
    alignItems:'center'
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 50,
    width: 300,
    height: 'auto',
  }

});