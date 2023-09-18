import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const Car = ({ data }) => {
  return (
    <View style={styles.tile}>
      <Text>{data}</Text>
    </View>
  );
};

export default Car;

const styles = StyleSheet.create({
  tile: {
    width: "100%",
    height: 200,
    backgroundColor: "rgb(225,225,225)",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 15,
  },
});
