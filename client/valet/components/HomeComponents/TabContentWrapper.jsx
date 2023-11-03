import React, { useState } from 'react';
import { Modal, SafeAreaView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import {Button} from 'react-native-elements';



function TabContentWrapper({ Component, tabName, onRename, onDelete }) {
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newTabName, setNewTabName] = useState('');
  const maxCharacters = 12;

  const handleConfirmRename = () => {
    if (newTabName.trim() === '') {

      alert('Location name cannot be empty!');
      return;
    }

    onRename(tabName, newTabName);
    setShowRenameModal(false);
  };

  const handleConfirmDelete = () => {
    onDelete()
    setShowDeleteModal(false);
  };


  return (
    <>
      <SafeAreaView style={styles.renameButtonContainer}>

        <TouchableOpacity onPress={() => setShowRenameModal(true)}><Text style={styles.renameDelete}>Rename</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowDeleteModal(true)}><Text style={styles.renameDelete}>Delete</Text>
        </TouchableOpacity>

      </SafeAreaView>

      <Component />

      {(showRenameModal || showDeleteModal) && (
        <BlurView
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        blurType="light"
        blurAmount={2}
        reducedTransparencyFallbackColor="white"
      />
    )}

    {showRenameModal && (
      <View>
        <Modal
        style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={showRenameModal}
          onRequestClose={() => setShowRenameModal(false)}
        >
          <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={styles.modal}>
              <TextInput
                value={newTabName}
                onChangeText={text => {
                  if (text.length <= maxCharacters) {
                    setNewTabName(text);
                  }
                }}
                placeholder="Rename Location"
                maxLength={maxCharacters}
                style={styles.modaltext}
              />
              <Text style={{
                color: (maxCharacters - newTabName.length === 0) ? styles.characterCountZero.color : styles.characterCount.color
              }}>
                {maxCharacters - newTabName.length} characters left
              </Text>

                <View style={{flexDirection: 'row', margin: 10, borderTopWidth: 1,  borderColor: '#dcdcdc', width: 290, justifyContent: 'space-around', paddingTop: 5, paddingHorizontal: 25}}>

                <Button
                title="Cancel"
                containerStyle={{backgroundColor: 'transparent'}}
                titleStyle={{color: '#49111c', fontSize: 18}}
                buttonStyle={{ backgroundColor: 'transparent' }}
                onPress={() => setShowRenameModal(false)}
                />

                <View style={styles.separator}></View>

                <Button
                title="Rename"
                containerStyle={{backgroundColor: 'transparent'}}
                titleStyle={{color: '#49111c', fontWeight: 'bold', fontSize: 18}}
                buttonStyle={{ backgroundColor: 'transparent' }}
                onPress={handleConfirmRename}
                />
                </View>
            </View>
          </SafeAreaView>
        </Modal>
        </View>
      )}
       {showDeleteModal && (
      <View>
        <Modal
        style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={showDeleteModal}
          onRequestClose={() => setShowDeleteModal(false)}
        >
          <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={styles.modalDel}>
                <Text style={{fontSize: 18 }}>Delete Location?</Text>

                <View style={{flexDirection: 'row', margin: 10, borderTopWidth: 1,  borderColor: '#dcdcdc', width: 290, justifyContent: 'space-around', paddingTop: 5, paddingHorizontal: 25}}>

                <Button
                title="Cancel"
                containerStyle={{backgroundColor: 'transparent'}}
                titleStyle={{color: '#49111c', fontSize: 20}}
                buttonStyle={{ backgroundColor: 'transparent' }}
                onPress={() => setShowDeleteModal(false)}
                />

                <View style={styles.separator}></View>

                <Button
                title="Delete"
                containerStyle={{backgroundColor: 'transparent'}}
                titleStyle={{color: '#49111c', fontWeight: 'bold', fontSize: 20}}
                buttonStyle={{ backgroundColor: 'transparent' }}
                onPress={handleConfirmDelete}
                />
                </View>
            </View>
          </SafeAreaView>
        </Modal>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  renameButtonContainer: {
    marginTop: -3,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#a9927d',
    backgroundColor: '#FFF',
    padding: 10,
    marginTop: 10,
    width: '60%',
    alignSelf: 'center',
  },
  characterCount: {
    color: 'lightgray'
  },
  characterCountZero: {
    color: '#FF7F7F'
  },
  guide: {
    fontStyle: 'italic',
    color: 'gray'
  },
  modal: {
  width: 290,
  height: 145,
  backgroundColor: '#F5F5F5',
  borderRadius: 15,
  padding: 20,
  alignItems: 'center',
  marginTop: 20
  },
  modalDel: {
    width: 290,
    height: 105,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginTop: 20
    },
  modaltext: {
  fontSize: 17,
  backgroundColor: 'white',
  margin: 3,
  paddingHorizontal: 20,
  width: '80%',
  height: 40,
  padding: 10,
  borderRadius: 10
  },
  separator: {
  width: 1,
  height: 40,
  backgroundColor: '#dcdcdc',
  },
  renameDelete: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#a9927d',
    margin: 5
  }
});

export default TabContentWrapper;