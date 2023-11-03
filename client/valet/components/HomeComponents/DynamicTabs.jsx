import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import ValetInfo from './ValetInfo';
import SignOut from '../SignOut';
import { BlurView } from '@react-native-community/blur';
import { Button, View, Modal } from 'react-native';
import Why from './Why';
import UploadID from './UploadID';
import Payment from './Payment';
import Summary from './Summary';
import LocTab from './LocTab';
import TabContentWrapper from './TabContentWrapper';

export const MyContext = React.createContext();

const Tab = createMaterialTopTabNavigator();

function HomeContent() {
  const navigation = useNavigation();
  const { setDefaultCityState } = useContext(MyContext);
  const [seeModal, setSeeModal] = useState(false);
  const [showBlur, setShowBlur] = useState(false);

  const handleEdit = () => {
    setSeeModal(!seeModal);
    setShowBlur(!showBlur);
  };

  const blur = () => {
    setShowBlur(!showBlur);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ValetInfo setDefaultCityState={setDefaultCityState} blur={blur} />
        <View style={styles.signout}>
          <SignOut variant={'home'} />
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.title}>Upload documentation to get started - </Text>
        <TouchableOpacity onPress={handleEdit}>
          <Text style={styles.editText}>Why?</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: -10 }}>
        <UploadID />
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Payment />
        <Text style={styles.subtitle}>You currently have:</Text>
        <Summary />
      </View>
      {showBlur && (
        <BlurView
          style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
          blurType="light"
          blurAmount={2}
          reducedTransparencyFallbackColor="white"
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={seeModal}
        onRequestClose={() => {
          setSeeModal(!seeModal);
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 110,
          }}
        >
          <View
            style={{
              width: '95%',
              height: 540,
              backgroundColor: '#F7F7F7',
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Why />
            <Button title="OK" onPress={handleEdit} />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const DynamicTabs = () => {
  const navigation = useNavigation();
  const { defaultCityState } = useContext(MyContext);
  const [userTabs, setUserTabs] = useState([]);

  const addNewTab = () => {
    const newTabIndex = userTabs.length + 1;
    const newTab = {
      name: `Location ${newTabIndex}`,
      component: LocTab,
    };
    setUserTabs([...userTabs, newTab]);
  };

  const deleteTab = (tabName) => {
    const updatedTabs = userTabs.filter((tab) => tab.name !== tabName);
    setUserTabs(updatedTabs);
  };

  useEffect(() => {
    if (userTabs.length > 0) {
      const latestTab = userTabs[userTabs.length - 1];
      navigation.navigate(latestTab.name);
    }
  }, [userTabs, navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: '#49111c',
          labelStyle: { fontSize: 16 },
          style: { backgroundColor: '#a9927d', marginBottom: 3 },
          indicatorStyle: { backgroundColor: 'white' },
          scrollEnabled: true,
        }}
      >
        <Tab.Screen
          name="Account"
          component={HomeContent}
          options={{
            tabBarLabel: ({ focused, color, position }) => (
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: color }}>
                Account
              </Text>
            ),
          }}
        />
        {userTabs.map((tab, index) => (
          <Tab.Screen
            key={index}
            name={tab.name}
            children={(props) => (
              <TabContentWrapper
                defaultCity={defaultCityState}
                Component={LocTab}
                tabName={tab.name}
                onRename={(oldName, newName) => {
                  const updatedTabs = userTabs.map(t =>
                    t.name === oldName ? { ...t, name: newName } : t
                  );
                  setUserTabs(updatedTabs);
                  navigation.navigate(newName);
                }}
                 onDelete={() => deleteTab(tab.name)}
                {...props}
              />
            )}
          />
        ))}
        <Tab.Screen
          name="+ Add Location"
          listeners={{
            tabPress: (e) => {
              addNewTab();
              e.preventDefault();
            },
          }}
        >
          {() => null}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export const AppWrapper = () => {
  const [defaultCityState, setDefaultCityState] = useState('USA');

  return (
    <MyContext.Provider value={{ defaultCityState, setDefaultCityState }}>
      <DynamicTabs />
    </MyContext.Provider>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signout: {
    alignItems: 'flex-start',
  },
  editText: {
    fontWeight: 'bold',
    color: '#a9927d',
    fontSize: 15,
    marginTop: 25,
  },
  title: {
    marginTop: 25,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
  },
  subtitle: {
    marginTop: 25,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
};

export default AppWrapper;
