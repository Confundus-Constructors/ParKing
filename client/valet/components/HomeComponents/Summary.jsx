import React from 'react';
import {Text, View} from 'react-native';

const Summary = () => {
  return (
    <View style={{flexDirection: 'column', width: 280}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between',}} >
        <View>
          <Text>
            Total Earnings:
          </Text>
          <Text>
            Service Locations:
          </Text>
          <Text>
            Garages Registered:
          </Text>
          <Text>
            Upcoming Reservations:
          </Text>
          <Text>
            Currently Parked Cars:
          </Text>
        </View>

        <View>
          <Text>
            0
          </Text>
          <Text>
            0
          </Text>
          <Text>
            0
          </Text>
          <Text>
            0
          </Text>
          <Text>
            0
          </Text>
        </View>
        </View>
    </View>

  )
}

export default Summary;