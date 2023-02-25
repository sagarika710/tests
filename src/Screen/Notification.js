import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Colors} from '../Theme/Color';
import Backbtn from '../Components/Backbtn';
import {apicaller} from '../Components/Api';
import {useSelector} from 'react-redux';
import {gettoken} from '../Redux/slices/userSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
function Notification({navigation}) {
  const [data, setData] = React.useState('');
  const Token = useSelector(gettoken);
  Data = [
    {
      Notification:
        'Your blood test slot for 07.30-8.30am at patia,nandan vihar is booked.',
      Time: '27 Sep 2022',
    },
    {
      Notification:
        'Your blood test slot for 07.30-8.30am at patia,nandan vihar is booked.',
      Time: '27 Sep 2022',
    },
    {
      Notification:
        'Your blood test slot for 07.30-8.30am at patia,nandan vihar is booked.',
      Time: '27 Sep 2022',
    },
    {
      Notification:
        'Your blood test slot for 07.30-8.30am at patia, nandan vihar is booked.',
      Time: '27 Sep 2022',
    },
    {
      Notification:
        'Your blood test slot for 07.30-8.30am at patia, nandan vihar is booked.',
      Time: '27 Sep 2022',
    },
    {
      Notification:
        'Your blood test slot for 07.30-8.30am at patia, nandan vihar is booked.',
      Time: '27 Sep 2022',
    },
    {
      Notification:
        'Your blood test slot for 07.30-8.30am at patia, nandan vihar is booked.',
      Time: '27 Sep 2022',
    },
    {
      Notification:
        'Your blood test slot for 07.30-8.30am at patia,nandan vihar is booked.',
      Time: '27 Sep 2022',
    },
    {
      Notification:
        'Your blood test slot for 07.30-8.30am at patia,nandan vihar is booked.',
      Time: '27 Sep 2022',
    },
    {
      Notification:
        'Your blood test slot for 07.30-8.30am at patia,nandan vihar is booked.',
      Time: '27 Sep 2022',
    },
  ];

  React.useEffect(() => {
    apicaller('notification', null, 'get', Token).then(res => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
    <SafeAreaView style={styles.Mainbox}>
      <View style={styles.header}>
        <Backbtn />
        <Text style={styles.headertxt}>Notification</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data &&
          data.map((i, index) => {
            return (
              <View style={styles.Box1} key={index}>
                <View style={styles.nofibox}>
                  <View style={styles.activebtn}></View>
                  <Text style={styles.nofitxt}>{i.message}</Text>
                </View>
                <Text style={styles.Time}>{i.createdAt}</Text>
                <View style={styles.line}></View>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Mainbox: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  headertxt: {
    marginLeft: 15,
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.5,
    color: Colors.Text_Black,
  },
  Box1: {
    paddingVertical: 20,
  },
  nofibox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  activebtn: {
    height: 6,
    width: 6,
    backgroundColor: Colors.GREEN,
    borderRadius: 10,
  },
  nofitxt: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: Colors.Text_Black,
    marginLeft: 5,
    marginTop: -5,
  },
  Time: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
    marginTop: 5,
    color: Colors.DARKGREY,
  },
  line: {
    borderColor: Colors.GREY,
    borderTopWidth: 1,
    marginTop: 20,
  },
});
export default Notification;
