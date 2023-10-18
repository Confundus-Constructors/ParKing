import react from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';


const Spot = ({spots}) => {

  return (
   <View style={{height: 40}}>
    <FlatList
      data={spots}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
      <View style={styles.listItem}>
        <Text>{item.address}</Text>
        <Text>{item.title}</Text>
        <Text>{item.spots}</Text>

      </View>
      )}
    />
   </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    fontSize: 15,
    flexDirection: 'column',

  }
});

export default Spot;