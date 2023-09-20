
import {View } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import {useState} from 'react';

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
  )
}