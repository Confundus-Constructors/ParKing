import React, { useState } from 'react';
import { Modal, SafeAreaView, Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';


function TabContentWrapper({ Component, tabName, onRename }) {
  const [showRenameModal, setShowRenameModal] = useState(false);
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

  return (
    <>
      <SafeAreaView style={styles.renameButtonContainer}>
        <Button title="Rename Location" onPress={() => setShowRenameModal(true)} />
      </SafeAreaView>
      <Component />
      {showRenameModal && (
        <BlurView
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
        blurType="light"
        blurAmount={2}
        reducedTransparencyFallbackColor="white"
      />
    )}
    {showRenameModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showRenameModal}
          onRequestClose={() => setShowRenameModal(false)}
        >
          <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.modalContent}>
              <TextInput
                value={newTabName}
                onChangeText={text => {
                  if (text.length <= maxCharacters) {
                    setNewTabName(text);
                  }
                }}
                placeholder="Rename Location"
                maxLength={maxCharacters}
                style={styles.inputField}
              />
              <Text style={{
                color: (maxCharacters - newTabName.length === 0) ? styles.characterCountZero.color : styles.characterCount.color
              }}>
                {maxCharacters - newTabName.length} characters left
              </Text>
              <Button title="Confirm Rename" onPress={handleConfirmRename} />
              <Button title="Cancel" onPress={() => setShowRenameModal(false)} />
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  renameButtonContainer: {
    alignSelf: 'center',
    marginTop: 10,
  },
  modalContent: {
    width: '70%',
    padding: 20,
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    alignItems: 'center',
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
  }
});

export default TabContentWrapper;
