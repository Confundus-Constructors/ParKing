import {View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default Home = () => {
  return (
    <View style={{margin: 50}}>
      <QRCode
      value='test3'
      size={300}>
      </QRCode>
    </View>
  )
}