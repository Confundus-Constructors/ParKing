
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
// import DateTimePicker from "@react-native-community/datetimepicker";
import {useState} from 'react';
import {Calendar, Agenda, Timeline, TimelineList, CalendarUtils, CalendarProvider, ExpandableCalendar} from 'react-native-calendars';
import { OutlinedTextView } from 'react-native-outlined-text';

export default ValetCalendar = () => {

  const [selected, setSelected] = useState(new Date())

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <Agenda
        // The list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key has to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={{
          '2023-09-20': [{name: 'Daniel Park', car: 'Blue Toyota', license: 'DCBA321', start_time:'7:30pm', end_time:'10pm' }],
          '2023-09-21': [{name: 'item 2 - any js object'}],
          '2023-09-22': [],
        }}
        markedDates={{
          '2012-05-16': {selected: true, marked: true},
          '2012-05-17': {marked: true},
          '2012-05-18': {disabled: true}
        }}
        showOnlySelectedDayItems={true}
        theme={{
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue'
        }}
        renderItem={(item, firstItemInDay) => {
          return (
          <View style={styles.itemView}>
            <View>
              <Text style={styles.time}>{item.start_time}-{item.end_time}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.car}>{item.car}</Text>
              <Text style={styles.license}>{item.license}</Text>
            </View>
            <View>
              <View style={styles.circle}>
                {/* <OutlinedTextView outlineColor="#000000" outlineWidth={5}>
                  This text is outlined
                </OutlinedTextView>; */}
              </View>
            </View>
          </View>
          )
        }}
        selected={selected}
        showClosingKnob={true}
        renderEmptyData={() =>
          <View style={styles.noResView}>
            <Text style={styles.noResText}>
              No Reservations Today
            </Text>
          </View>}
        style={{}}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  noResView: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noResText: {
    fontSize: 25
  },
  itemView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 120,
    borderWidth: 1,
    padding: 15,
    borderRadius: 20,
    borderColor: 'gray',
    paddingLeft: 50
  },
  time: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  name: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  car: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  license: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  circle: {
    backgroundColor: '#aedaeb',
    height: 80,
    width: 80,
    borderRadius: 80,
    marginRight: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  initials: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white'
  }
})