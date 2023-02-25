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
  SafeAreaView,
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
  setCompany,
} from '../Redux/slices/userSlice';
export default function Signup(props) {
  const [first, setFirst] = React.useState('');
  const [last, setLast] = React.useState('');
  const [org, setOrg] = React.useState('');
  const [emailid, setEmailid] = React.useState();
  const navigation = useNavigation();
  const forwardSlash = /\/.*\//;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [radio, setRadio] = useState('male');
  const [select, setSelect] = useState('customer');
  const [show, setShow] = useState(false);
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
  function signup() {
    var data = JSON.stringify({
      first_name: first,
      last_name: last,
      dob: show,
      email: emailid,
      gender: radio,
      user_type: select,
    });

    var datac = JSON.stringify({
      first_name: first,
      last_name: last,

      organization_name: org,
      email: emailid,

      user_type: select,
    });
    const maindata = select == 'customer' ? data : datac;
    apicaller('signup', maindata, 'put', Token)
      .then(res => {
        console.log(res.data);
        dispatch(setPhone_number(res.data.user_data.phone_number));
        dispatch(setUser_type(res.data.user_data.user_type));
        dispatch(setEmail(res.data.user_data.email));
        dispatch(setDob(res.data.user_data.dob));
        dispatch(setFirst_name(res.data.user_data.first_name));
        dispatch(setLast_name(res.data.user_data.last_name));
        dispatch(setGender(res.data.user_data.gender));
        dispatch(setId(res.data.user_data._id));
        dispatch(setCompany(res.data.user.organization_name));

        signfrom == 'login'
          ? navigation.navigate('Profile')
          : navigation.navigate('Cart', {from: 'login'});
      })
      .catch(e => {
        console.log('error from signup', e.response.data.err);
        alert(e.response.data.err);
      });
  }
  useEffect(() => {
    setDoberr(false);
  }, [show]);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {/* <Image style={styles.logo} source={require('../assets/img/spo.png')} /> */}
          <Image
            style={styles.Logo}
            source={require('../Assets/Images/GDPR.gif')}
          />
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  style={[
                    styles.selectout,
                    {borderColor: select == 'customer' ? '#5AA644' : '#aaa'},
                  ]}
                  onPress={() => setSelect('customer')}>
                  <Text
                    style={[
                      {color: select == 'customer' ? '#5AA644' : '#aaa'},
                    ]}>
                    Individual
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.selectout,
                    {
                      borderColor:
                        select == 'organization' ? '#5AA644' : '#aaa',
                    },
                  ]}
                  onPress={() => setSelect('organization')}>
                  <Text
                    style={[
                      {color: select == 'organization' ? '#5AA644' : '#aaa'},
                    ]}>
                    Company
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {select == 'customer' ? (
              <>
                <Text
                  style={{color: 'black', fontWeight: '600', marginBottom: 10}}>
                  Enter First Name
                </Text>
                <TextInput
                  onChangeText={setFirst}
                  value={first}
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="First Name"
                  placeholderTextColor="#9C9C9C"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                />

                {errnf && (
                  <Text
                    style={{color: 'red', fontWeight: 'bold', marginTop: 2}}>
                    **Required
                  </Text>
                )}
                <View style={styles.textAreaContainer}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '600',
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
                    style={{color: 'red', fontWeight: 'bold', marginTop: 2}}>
                    **Required
                  </Text>
                )}
                <View style={styles.textAreaContainer}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '600',
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
                  <Text style={{color: 'red'}}>Invalid email id</Text>
                ) : null}
                <TouchableOpacity
                  style={styles.textAreaContainer}
                  onPress={() => {
                    setOpen(true);
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '600',
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
                  <Text style={{color: 'red'}}>
                    Age should be gratethen 5 year
                  </Text>
                )}
                <Text
                  style={{color: 'black', fontWeight: '600', marginBottom: 20}}>
                  Select Gender
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    justifyContent: 'space-around',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={styles.outer}
                      onPress={() => setRadio('male')}>
                      <View
                        style={[
                          styles.iner,
                          {display: radio == 'male' ? 'flex' : 'none'},
                        ]}
                      />
                    </TouchableOpacity>
                    <Text style={styles.type}>Male</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={styles.outer}
                      onPress={() => setRadio('female')}>
                      <View
                        style={[
                          styles.iner,
                          {display: radio == 'female' ? 'flex' : 'none'},
                        ]}
                      />
                    </TouchableOpacity>
                    <Text style={styles.type}>Female</Text>
                  </View>
                </View>
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
                            signup();
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
                  <Smallbtn titel={'Signup'} />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text
                  style={{color: 'black', fontWeight: '600', marginBottom: 10}}>
                  Enter First Name
                </Text>
                <TextInput
                  onChangeText={setFirst}
                  value={first}
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="First Name"
                  placeholderTextColor="#9C9C9C"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                />

                {errnf && (
                  <Text
                    style={{color: 'red', fontWeight: 'bold', marginTop: 2}}>
                    **Required
                  </Text>
                )}
                <View style={styles.textAreaContainer}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '600',
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
                    style={{color: 'red', fontWeight: 'bold', marginTop: 2}}>
                    **Required
                  </Text>
                )}
                <Text
                  style={{color: 'black', fontWeight: '600', marginBottom: 10}}>
                  Enter Company Name
                </Text>
                <TextInput
                  onChangeText={setOrg}
                  value={org}
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="Company Name"
                  placeholderTextColor="#9C9C9C"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                />

                {errnf && (
                  <Text
                    style={{color: 'red', fontWeight: 'bold', marginTop: 2}}>
                    **Required
                  </Text>
                )}

                <View style={styles.textAreaContainer}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '600',
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
                  <Text style={{color: 'red'}}>Invalid email id</Text>
                ) : null}

                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    if (first.length > 2) {
                      setErrnf(false);

                      if (reg.test(emailid)) {
                        setEmailerror(false);

                        signup();
                        // navigation.navigate('NovaBookingDetailsPreviewScreen2');
                      } else {
                        setEmailerror(true);
                      }
                    } else {
                      setErrnf(true);
                    }
                  }}>
                  <Smallbtn titel={'Signup'} />
                </TouchableOpacity>
              </>
            )}
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
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
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
  Logo: {
    width: 250,
    height: 250,
  },
  had: {
    color: '#FAC516',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 3,
    marginLeft: -5,
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
