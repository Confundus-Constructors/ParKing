
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
// import DateTimePicker from "@react-native-community/datetimepicker";
import {useState} from 'react';
import {Calendar, Agenda, Timeline, TimelineList, CalendarUtils, CalendarProvider, ExpandableCalendar} from 'react-native-calendars';

export default ValetCalendar = () => {

  // const [selected, setSelected] = useState(new Date())

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <Agenda
        items={{
          '2023-09-25': [
            {
            name: 'Daniel Park',
            car: 'Blue Toyota',
            license: 'DCBA321',
            start_time:'6:30pm',
            end_time:'8:30pm',
            initials:'DP' },
            {
              name: 'Amelia Li',
              car: 'Black GMC',
              license: '321ABCD',
              start_time:'7:30pm',
              end_time:'10pm',
              initials:'AL' }
            ],
          '2023-09-21': [
            {
              name: 'Kurt Vardeman',
              car: 'Green Honda',
              license: '456XYZ',
              start_time:'9:30pm',
              end_time:'10:30pm',
              initials:'KV' }
            ],
          '2023-09-22': [
            {
              name: 'LeDerius Franklin',
              car: 'Green Honda',
              license: '456XYZ',
              start_time:'9:30pm',
              end_time:'10:30pm',
              initials:'KV'
            },
            {
              name: 'Kurt Vardeman',
              car: 'Green Honda',
              license: '456XYZ',
              start_time:'9:30pm',
              end_time:'10:30pm',
              initials:'KV'
            },
            ],

        }}
        markedDates={{
          '2023-09-20': {marked: true},
          '2023-09-21': {marked: true},
          // '2023-09-22': {disabled: true}
        }}
        showOnlySelectedDayItems={true}
        theme={{
          agendaDayTextColor: 'black',
          agendaDayNumColor: 'black',
          agendaTodayColor: 'black',
          agendaKnobColor: 'black'
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
              <View style={[styles.circle, {backgroundColor: '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}]}>
                <Text style={styles.initials}>{item.initials}</Text>
              </View>
            </View>
          </View>
          )
        }}
        selected={new Date()}
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
    paddingLeft: 50,
    marginTop: 10,
    marginRight: 10,
    backgroundColor: 'white'
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
    // backgroundColor: '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'),
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
    color: 'white',
    textShadowColor: 'black',
    textShadowColor: 'black',
    textShadowRadius: 2,
    textShadowOffset: {
    },
  }
})