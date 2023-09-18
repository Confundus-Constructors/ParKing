import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Button } from "@rneui/themed";

const Spot = () => {
  return (
    <SafeAreaView>
      <View style={styles.Tile}>
        <Text style={styles.Text}>Airport Center Parking </Text>
        <Button title="Book Now" color="black" style={styles.Button} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Tile: {
    // flex: 1,
    width: "100%",
    height: 200,
    backgroundColor: "#F2F4F3",
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  Button: {
    justifyContent: "bottom",
    width: 350,
    borderRadius: 15,
    overflow: "hidden",
  },
  Text: {
    fontSize: 20,
    color: "#49111C",
  },
});
export default Spot;
