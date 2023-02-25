import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {Colors} from '../Theme/Color';
import Smallbtn from '../Components/Smallbtn';
import {apicaller} from '../Components/Api';
import {useSelector, useDispatch} from 'react-redux';
import {
  setPhone_number,
  setEmail,
  setToken,
  setDob,
  setFirst_name,
  setLast_name,
  setGender,
  setUser_type,
  setId,
  setCompany,
} from '../Redux/slices/userSlice';
import {CountryPicker} from 'react-native-country-codes-picker';
import Down from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';
function Login({navigation}) {
  const [type, setType] = React.useState('');
  const [err, setErr] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [countryCode, setCountryCode] = React.useState('+1');
  const [countryflag, setCountryflag] = React.useState('🇨🇦');
  const dispatch = useDispatch();
  function phonenumber() {
    var data = JSON.stringify({
      phone_number: countryCode.slice(1) + type,
    });

    apicaller('login', data, 'post', null)
      .then(res => {
        //  navigation.navigate('Otp');
        // console.log('fcgghghhg', res.data.user.first_name);
        if (res.data.user) {
          dispatch(setPhone_number(res.data.user.phone_number));
          dispatch(setUser_type(res.data.user.user_type));
          dispatch(setEmail(res.data.user.email));
          dispatch(setDob(res.data.user.dob));
          dispatch(setFirst_name(res.data.user.first_name));
          dispatch(setLast_name(res.data.user.last_name));
          dispatch(setGender(res.data.user.gender));
          dispatch(setCompany(res.data.user.organization_name));
          dispatch(setId(res.data.user._id));
        } else {
          dispatch(setId(res.data._id));
        }
        setErr(false);
        navigation.navigate('Otp');
      })
      .catch(e => {
        console.log('err', e);
        setErr(true);
      });
  }
  console.log(countryCode.slice(1));
  return (
    <SafeAreaView style={styles.Mainbox}>
      <View style={styles.Box1}>
        <Image
          style={styles.Logo}
          source={require('../Assets/Images/Login.gif')}
        />
      </View>
      <View styles={styles.Box2}>
        <CountryPicker
          show={show}
          initialState={'+91'}
          // when picker button press you will get the country object with dial code
          pickerButtonOnPress={item => {
            console.log(item);
            setCountryCode(item.dial_code);
            setCountryflag(item.flag);
            setShow(false);
          }}
        />
        <Text
          style={{
            color: 'black',
            fontFamily: 'Poppins-Bold',
            marginBottom: 10,
          }}>
          Enter Phone Number
        </Text>
        <View style={styles.input}>
          <TouchableOpacity
            onPress={() => setShow(true)}
            style={{
              marginVertical: 5,
              paddingVertical: 10,
              borderRightColor: Colors.GREEN,
              borderRightWidth: 3,

              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.GREEN,
                fontFamily: 'Poppins-Bold',
                fontSize: 18,
              }}>
              <Text style={{letterSpacing: 30}}>{countryflag}</Text>
              <Text>{countryCode}</Text>
            </Text>
            <View style={{marginHorizontal: 10}}>
              <Down name="down" width={10} color="#5AA644" />
            </View>
          </TouchableOpacity>
          <TextInput
            onChangeText={setType}
            underlineColorAndroid="transparent"
            placeholder="9876543219"
            multiline={true}
            keyboardType="phone-pad"
            style={{margin: 12}}
          />
        </View>
        {err && (
          <Text style={{color: 'red', marginLeft: 10}}>
            Enter a valid number
          </Text>
        )}
      </View>
      <TouchableOpacity
        // onPress={() => navigation.navigate('Otp')}
        onPress={() => phonenumber()}>
        <Smallbtn titel={'Sign in'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Mainbox: {
    flex: 1,
    padding: 20,
    paddingBottom: 50,
    backgroundColor: Colors.WHITE,
  },
  Logo: {
    marginVertical: 30,
    height: 300,
    width: 300,
  },
  Box1: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Box2: {},
  input: {
    borderColor: '#5AA644',
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 15,
    flexDirection: 'row',
  },
  social: {
    height: 36,
    width: 30,
  },
  social1: {
    height: 36,
    width: 36,
  },
  socialView: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  links: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default Login;
