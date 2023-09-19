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
import CustomButton from "./CustomButton";

const Spot = () => {
  return (
    <SafeAreaView>
      <View style={styles.Tile}>
        <View style={styles.line}>
          <Text style={styles.Text}>Airport Center Parking </Text>
          <Text style={styles.Text}>US $20.30</Text>
        </View>
        <View style={styles.line2}>
          <Text style={styles.Text2}>14 Spots Available</Text>
          <Text style={styles.Text2}>Per Hour</Text>
        </View>
        <CustomButton
          style={styles.button}
          textStyle={{ ...styles.commonFont, color: "#D0D3D2" }}
          title="Book Now"
          color="#171412"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Tile: {
    width: "100%",
    height: 200,
    backgroundColor: "rgb(225,225,225)",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 15,
  },
  button: {
    justifyContent: "bottom",
    width: 350,
    borderRadius: 15,
    overflow: "hidden",
  },
  Text: {
    fontSize: 20,
    color: "#49111C",
  },
  Text2: {
    fontSize: 16,
    color: "grey",
  },
  line: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
    paddingBottom: 10,
  },
  line2: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 40,
  },
});
export default Spot;
