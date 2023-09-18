import { SafeAreaView,Text,Image,TextInput,ScrollSafeAreaView,StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
// import UserTabs from './UserTabs.jsx'

const UHP = () => {
  return (
    <SafeAreaView>
      <Text>Reserve Your Spot</Text>
      <SafeAreaView>
        <SafeAreaView>
          <Text>Book Parking Near</Text>
          <TextInput/>
        </SafeAreaView>
        <SafeAreaView>
          <Text>Check In</Text>
          {/* Calendar */}
          {/* Clock */}
        </SafeAreaView>
        <SafeAreaView>
          <Text>Check Out</Text>
          {/* Calendar */}
          {/* Clock */}
        </SafeAreaView>
        <Button
        title="Book Now"/>
      </SafeAreaView>
      {/* <UserTabs/> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Input: {
    border: '1px solid grey'
  },
  Modal: {
    place:'holder'
  }
})
export default UHP;