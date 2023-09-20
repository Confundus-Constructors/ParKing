import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

export default Calendar = () => {
  const [sDate, setSDate] = useState(new Date());
  const [eDate, setEDate] = useState(new Date());
  const [sTime, setSTime] = useState(new Date());
  const [eTime, setETime] = useState(new Date());

  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={eTime}
      mode="time"
      is24Hour={false}
      // onChange={handleEndTime}
    />
  );
};

const styles = StyleSheet.create({
  noResView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResText: {
    fontSize: 25,
  },
  itemView: {
    justifyContent: "space-between",
    flexDirection: "row",
    height: 120,
    borderWidth: 1,
    padding: 15,
    borderRadius: 20,
    borderColor: "gray",
    paddingLeft: 50,
    marginTop: 10,
    marginRight: 10,
    backgroundColor: "white",
  },
  time: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
  },
  name: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  car: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
  },
  license: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
  },
  circle: {
    // backgroundColor: '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'),
    height: 80,
    width: 80,
    borderRadius: 80,
    marginRight: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "black",
    textShadowColor: "black",
    textShadowRadius: 2,
    textShadowOffset: {},
  },
});
