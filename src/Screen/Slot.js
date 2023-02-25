import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../Theme/Color';
import Backbtn from '../Components/Backbtn';
import Mainbtn from '../Components/Mainbtn';
import {apicaller} from '../Components/Api';
import {useDispatch, useSelector} from 'react-redux';
import {getType} from '@reduxjs/toolkit';
import {
  getCartlab,
  getId,
  getPathology_id,
  getSlottime,
  gettoken,
  getUser_type,
  setSelectemp,
  setSelectempid,
  setSlotDate,
  setSlotDateid,
  setSlotTime,
  setSlotTimeid,
} from '../Redux/slices/userSlice';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SlotScreen({navigation}) {
  const [selected, setSelected] = useState('');
  const [cond1, setCond1] = useState(false);
  const [cond2, setCond2] = useState(false);
  const [slots, setSlots] = useState([]);
  const [employeelist, setEmployeelist] = useState([]);
  const [timeslot, setTimeslot] = useState([]);
  const [pressed, setIsPressed] = useState('');
  const [selectEmployee, setSelectEmployee] = useState(false);
  const [employeeType, setEmployeeType] = useState('Select Employee Name');
  const Token = useSelector(gettoken);
  const pathoid = useSelector(getCartlab);
  const usertypes = useSelector(getUser_type);
  const dispatch = useDispatch();
  useEffect(() => {
    patho();
  }, []);
  function patho() {
    apicaller(`slot-by-pathology/${pathoid}`, null, 'get', Token).then(res => {
      console.log('mkkkk', res.data);
      setSlots(res.data);
    });
  }
  const id = useSelector(getId);
  function time(dates) {
    dispatch(setSlotDate(dates));
    slots.map(item => {
      if (item.slot_date == dates) {
        setTimeslot(item.slots);
      }
    });
  }

  useEffect(() => {
    apicaller(`employe-organization/${id}`, null, 'get', null).then(res => {
      console.log('employeelist', res.data);
      setEmployeelist(res.data);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Backbtn />
      <View>
        <Text style={styles.heading}>Select Your Date</Text>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {slots.map(item => (
            // <DateSlot date={item.slot_date.slice(5, 7)} day={item.day} />
            <TouchableOpacity
              onPress={() => {
                setCond1(true);
                setSelected(item._id);
                time(item.slot_date);
                dispatch(setSlotDateid(item._id));
              }}
              style={[
                styles.date_box,
                {
                  borderColor: selected == item._id ? '#5AA644' : '#9C9C9C',
                  backgroundColor: selected == item._id ? '#5AA644' : 'white',
                },
              ]}>
              <Text
                style={[
                  styles.date_txt,
                  {color: selected == item._id ? 'white' : 'black'},
                ]}>
                {item.slot_date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={{}}>
        <Text style={styles.heading}>Select Appointment Time</Text>
        {timeslot && (
          <View style={styles.time_box}>
            {timeslot.map(item => {
              console.log('item', item);
              return item.slot_capacity != 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    setCond2(true);
                    setIsPressed(item._id);
                    dispatch(setSlotTime(item.slot_time));
                    dispatch(setSlotTimeid(item._id));
                  }}
                  style={[
                    styles.time,
                    {
                      borderColor: pressed == item._id ? '#5AA644' : '#9C9C9C',
                      backgroundColor:
                        pressed == item._id ? '#5AA644' : 'white',
                    },
                  ]}>
                  <View>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={[
                        styles.time_txt,
                        {color: pressed == item._id ? 'white' : 'black'},
                      ]}>
                      Time:{item.slot_time}
                    </Text>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={[
                        styles.time_txt,
                        {color: pressed == item._id ? 'white' : 'black'},
                      ]}>
                      Slot: {item.slot_capacity}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null;
            })}
          </View>
        )}
        {usertypes && usertypes == 'organization' && (
          <View>
            <Text style={styles.heading}>Select Employee</Text>
            <TouchableOpacity
              onPress={() => setSelectEmployee(!selectEmployee)}>
              <TextInput
                placeholder="Select employee"
                style={{
                  borderWidth: 1,
                  borderColor: '#eee',
                  borderRadius: 5,
                  fontSize: 16,
                  paddingLeft: 15,
                }}
                editable={false}
                value={employeeType}
              />
            </TouchableOpacity>
            <View
              style={{
                display: selectEmployee ? 'flex' : 'none',
                borderWidth: 1,
                borderColor: '#eee',
                marginTop: 5,
                borderRadius: 10,
                padding: 15,
              }}>
              {employeelist.map(e => {
                console.log('deppali', e);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectEmployee(false);
                      setEmployeeType(e.employe_user_name);
                      dispatch(setSelectemp(e.employe_user_name));
                      dispatch(setSelectempid(e._id));
                    }}
                    style={{
                      borderBottomColor: '#eee',
                      borderBottomWidth: 1,
                      height: 45,
                      justifyContent: 'center',
                    }}>
                    <Text>{e.employe_user_name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      {usertypes && usertypes == 'organization' ? (
        <TouchableOpacity
          disabled={
            selected && pressed && employeeType != 'Select Employee Name'
              ? false
              : true
          }
          onPress={() => {
            Token
              ? navigation.navigate('NovaBookingDetailsPreviewScreen1')
              : navigation.navigate('Login');
          }}>
          <Mainbtn
            disable={
              selected && pressed && employeeType != 'Select Employee Name'
                ? false
                : true
            }
            titel={'Book Now '}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={!cond1 || !cond2}
          onPress={() => {
            Token
              ? navigation.navigate('NovaBookingDetailsPreviewScreen1')
              : navigation.navigate('Login');
          }}>
          <Mainbtn disable={!cond1 || !cond2} titel={'Book Now'} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', padding: 20},
  heading: {
    color: Colors.BLACK,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.5,
    fontSize: 16,
    marginTop: 30,
    marginBottom: 20,
  },
  date_box: {
    marginTop: 15,
    borderWidth: 1,
    padding: 5,
    borderRadius: 30,
    marginRight: 10,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  date_txt: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
    fontSize: 12,
  },
  day: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
    fontSize: 10,
    fontWeight: 'bold',
  },
  time_box: {
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  time: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 3,
    width: 100,
    height: 50,
  },
  time_txt: {
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: 'center',
  },

  Button: {
    width: '100%',
    height: 48,
    backgroundColor: Colors.GREEN,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Btntext: {
    color: Colors.WHITE,
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: 'Poppins-Bold',
  },
});
