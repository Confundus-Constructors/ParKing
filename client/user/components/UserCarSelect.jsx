import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Car from "./Car.jsx";

const Select = () => {
  const arr = ["Tesla Model 3", "Mercedes E-Class", "Tesla Model 3"];
  return (
    <SafeAreaView>
      {arr.map((carInfo) => {
        return <Car data={carInfo} key={carInfo} />;
      })}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  background: {
    backgroundColor: "#F2F4F3",
  },
});
export default Select;
