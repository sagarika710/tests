import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  Button,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
// import fetch from 'node-fetch';
import {useNavigation} from '@react-navigation/native';
import {color} from 'react-native-reanimated';
import Mainbtn from '../Components/Mainbtn';
import Smallbtn from '../Components/Smallbtn';
import {apicaller} from '../Components/Api';
import {useSelector, useDispatch} from 'react-redux';
import {
  getId,
  gettoken,
  setDob,
  setId,
  setPhone_number,
  setEmail,
  setUser_type,
  setGender,
  setFirst_name,
  setLast_name,
  getSignup,
  getFirst_name,
  getLast_name,
  getEmail,
  getDob,
  getGender,
  getUser_type,
} from '../Redux/slices/userSlice';
import Backbtn from '../Components/Backbtn';
import {SafeAreaView} from 'react-native-safe-area-context';
export default function Signup(props) {
  const fname = useSelector(getFirst_name);
  const lname = useSelector(getLast_name);
  const email = useSelector(getEmail);
  const dobs = useSelector(getDob);
  const gend = useSelector(getGender);
  const usertp = useSelector(getUser_type);
  const [first, setFirst] = React.useState(fname);
  const [last, setLast] = React.useState(lname);
  const [emailid, setEmailid] = React.useState(email);
  const navigation = useNavigation();
  const forwardSlash = /\/.*\//;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [radio, setRadio] = useState('male');
  const [select, setSelect] = useState('customer');
  const [show, setShow] = useState(dobs);
  const [doberr, setDoberr] = useState(false);
  const [errnf, setErrnf] = useState(false);
  const [errnl, setErrnl] = useState(false);
  const [emailerror, setEmailerror] = useState();
  const reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
  const Token = useSelector(gettoken);
  const signfrom = useSelector(getSignup);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  console.log('fn', first, last, emailid, show, radio);
  const dispatch = useDispatch();

  function edit() {
    var data = JSON.stringify({
      first_name: first,
      last_name: last,
      dob: show,
      email: emailid,
      gender: gend,
      user_type: usertp,
    });
    apicaller('profile', data, 'put', Token)
      .then(res => {
        console.log(res.data);
        // dispatch(setPhone_number(res.data.user_data.phone_number));
        // dispatch(setUser_type(res.data.user_data.user_type));
        dispatch(setEmail(res.data.user_data.email));
        dispatch(setDob(res.data.user_data.dob));
        dispatch(setFirst_name(res.data.user_data.first_name));
        dispatch(setLast_name(res.data.user_data.last_name));
        // dispatch(setGender(res.data.user_data.gender));
        // dispatch(setId(res.data.user_data._id));

        navigation.navigate('Profile');
        //   : navigation.navigate('Cart', {from: 'login'});
      })
      .catch(e => {
        console.log(e.value);
        console.log('error from signup');
      });
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{margin: 20}}>
          <Backbtn />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <DatePicker
            mode="date"
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);

              setShow(
                date.getFullYear().toString() +
                  '/' +
                  (date.getMonth() + 1).toString() +
                  '/' +
                  date.getDate().toString(),
              );
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <View style={styles.box1}>
            <View style={styles.textAreaContainer}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Poppins-Medium',
                  marginBottom: 10,
                }}>
                Enter First Name
              </Text>
              <TextInput
                onChangeText={setFirst}
                value={first}
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Full Name"
                placeholderTextColor="#9C9C9C"
                numberOfLines={1}
                ellipsizeMode="tail"
              />
            </View>
            {errnf && (
              <Text
                style={{
                  color: 'red',
                  fontFamily: 'Poppins-Bold',
                  marginTop: 2,
                }}>
                **Required
              </Text>
            )}
            <View style={styles.textAreaContainer}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Poppins-Medium',
                  marginBottom: 10,
                }}>
                Enter Last Name
              </Text>
              <TextInput
                onChangeText={setLast}
                value={last}
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Last Name"
                placeholderTextColor="#9C9C9C"
                numberOfLines={1}
                ellipsizeMode="tail"
              />
            </View>
            {errnl && (
              <Text
                style={{
                  color: 'red',
                  fontFamily: 'Poppins-Bold',
                  marginTop: 2,
                }}>
                **Required
              </Text>
            )}
            <View style={styles.textAreaContainer}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Poppins-Medium',
                  marginBottom: 10,
                }}>
                Enter Email Id
              </Text>
              <TextInput
                onChangeText={setEmailid}
                //  onChangeText={validate}
                value={emailid}
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Email Id"
                placeholderTextColor="#9C9C9C"
              />
            </View>
            {emailerror ? (
              <Text style={{color: 'red', fontFamily: 'Poppins-Bold'}}>
                Invalid email id
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.textAreaContainer}
              onPress={() => {
                setOpen(true);
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Poppins-Medium',
                  marginBottom: 10,
                }}>
                Enter DOB
              </Text>
              <TextInput
                editable={false}
                selectTextOnFocus={false}
                style={[styles.textArea, {color: 'black'}]}
                maxLength={10}
                value={show}
                placeholder="Enter DOB (DD/MM/YYYY)"
                placeholderTextColor="#9C9C9C"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </TouchableOpacity>
            {doberr && (
              <Text style={{color: 'red', fontFamily: 'Poppins-Bold'}}>
                Age should be gratethen 5 year
              </Text>
            )}

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (first.length > 2) {
                  setErrnf(false);
                  if (last.length > 2) {
                    setErrnl(false);
                    if (reg.test(emailid)) {
                      setEmailerror(false);
                      if (date.getFullYear() < 2018 && date != '0') {
                        setDoberr(false);
                        edit();
                        // navigation.navigate('NovaBookingDetailsPreviewScreen2');
                      } else {
                        setDoberr(true);
                      }
                    } else {
                      setEmailerror(true);
                    }
                  } else {
                    setErrnl(true);
                  }
                } else {
                  setErrnf(true);
                }
              }}
              // onPress={() =>
              //   navigation.navigate('NovaBookingDetailsPreviewScreen1')
              // }
            >
              <Smallbtn titel={'Save'} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  textArea: {
    borderColor: '#5AA644',
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    height: 50,
  },
  btn: {
    height: 43,
    // backgroundColor: '#FAC516',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    fontFamily: 'ReadexPro-Bold',
  },
  btntext: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
  box1: {
    width: '88%',
    marginVertical: 30,
  },

  txt: {
    fontSize: 10,
    color: '#717171',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  outer: {
    height: 20,
    width: 20,
    borderColor: '#5AA644',
    borderWidth: 2,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iner: {
    height: 10,
    width: 10,
    backgroundColor: '#5AA644',
    borderRadius: 100,
  },
  type: {
    fontFamily: 'Poppins-Bold',
    color: '#000',
    marginLeft: 10,
  },
  selectout: {
    width: 150,
    height: 35,
    borderColor: '#aaa',
    borderWidth: 2,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
