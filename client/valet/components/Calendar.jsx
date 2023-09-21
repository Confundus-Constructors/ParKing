
import {View, Text, SafeAreaView} from 'react-native';
// import DateTimePicker from "@react-native-community/datetimepicker";
import {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';

export default ValetCalendar = () => {

  // const [sDate, setSDate] = useState(new Date());
  // const [eDate, setEDate] = useState(new Date());
  // const [sTime, setSTime] = useState(new Date());
  // const [eTime, setETime] = useState(new Date());

  return (
    <Calendar
      style={{
        borderWidth: 1,
        borderColor: 'gray',
        height: 350,
      }}
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e'
      }}
      />
  )
}