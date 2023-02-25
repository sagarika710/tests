import * as React from 'react';
import {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Mainbtn from '../Components/Mainbtn';
import Backbtn from '../Components/Backbtn';
import {apicaller} from '../Components/Api';
import {useSelector, useDispatch} from 'react-redux';
import {getId, getSignup, gettoken, setToken} from '../Redux/slices/userSlice';
import {SafeAreaView} from 'react-native-safe-area-context';

function Otp({navigation}) {
  const signfrom = useSelector(getSignup);
  const pin1Ref = useRef();
  const pin2Ref = useRef();
  const pin3Ref = useRef();
  const pin4Ref = useRef();
  const pin5Ref = useRef();
  const pin6Ref = useRef();
  const pin7Ref = useRef();
  const pin8Ref = useRef();
  const [otp, setOtp] = useState({
    a: '',
    b: '',
    c: '',
    d: '',
    5: '',
    6: '',
    7: '',
    8: '',
  });
  var x = otp.a + otp.b + otp.c + otp.d;
  const [err, setErr] = React.useState(false);
  const Dispatch = useDispatch();
  const idrd = useSelector(getId);
  console.log('idrd', idrd);

  function otpverification() {
    var data = JSON.stringify({
      _id: idrd,
      otp: x,
    });
    apicaller('otp', data, 'post', null)
      .then(res => {
        Dispatch(setToken(res.data.token));
        console.log('otp', res.data);
        if (res.data.user) {
          signfrom == 'booking'
            ? navigation.navigate('Cart', {from: 'login'})
            : navigation.navigate('Tab');
        } else {
          navigation.navigate('Signup');
        }
      })
      .catch(e => {
        console.log(e);
        setErr(true);
      });
  }
  return (
    <SafeAreaView style={styles.container}>
      <Backbtn />

      <View style={{height: Dimensions.get('screen').height * 0.06}}></View>

      <View style={styles.Otptxt}>
        <Text style={styles.pleaseVerificationTxt}>OTP Verification!</Text>
      </View>

      <View style={styles.insertOtpTxtRow}>
        <Text style={styles.insertOtpTxt}>Enter your OTP to continue</Text>
      </View>

      <View style={{height: Dimensions.get('screen').height * 0.07}}></View>

      <View>
        <View style={styles.otpCircleMainDiv}>
          <TextInput
            ref={pin1Ref}
            maxLength={1}
            keyboardType="numeric"
            secureTextEntry={true}
            style={styles.inputfield}
            onChangeText={text => {
              setOtp({...otp, a: text});
              text && pin2Ref.current.focus();
            }}
          />

          <TextInput
            ref={pin2Ref}
            maxLength={1}
            keyboardType="numeric"
            secureTextEntry={true}
            style={styles.inputfield}
            onChangeText={text => {
              setOtp({...otp, b: text});
              text ? pin3Ref.current.focus() : pin1Ref.current.focus();
            }}
          />

          <TextInput
            ref={pin3Ref}
            maxLength={1}
            keyboardType="numeric"
            secureTextEntry={true}
            style={styles.inputfield}
            onChangeText={text => {
              setOtp({...otp, c: text});
              text ? pin4Ref.current.focus() : pin2Ref.current.focus();
            }}
          />

          <TextInput
            ref={pin4Ref}
            maxLength={1}
            keyboardType="numeric"
            secureTextEntry={true}
            style={styles.inputfield}
            onChangeText={text => {
              setOtp({...otp, d: text});
              !text && pin3Ref.current.focus();
            }}
          />
        </View>
        <View style={styles.didntReceiveResendCodeTxtDiv}>
          <View>
            <Text style={styles.didntReceiveCodeTxt}>
              Didn't receive the code
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.resendCodeTxt}>Resend Code</Text>
          </TouchableOpacity>
        </View>
        {err && <Text style={{color: 'red'}}>INVALID OTP</Text>}
      </View>
      <TouchableOpacity
        style={{marginTop: 30}}
        // onPress={() => navigation.navigate('Signup')}
        onPress={() => otpverification()}>
        <Mainbtn titel={'Continue'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
  Otptxt: {
    marginBottom: 5,
  },
  pleaseVerificationTxt: {
    color: '#222222',
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
  insertOtpTxt: {
    color: '#9093A3',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },

  otpCircleMainDiv: {
    paddingTop: 30,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  didntReceiveResendCodeTxtDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  didntReceiveCodeTxt: {
    color: '#9093A3',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  resendCodeTxt: {
    color: '#1D6AFF',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },

  btnMainDiv: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },

  inputfield: {
    borderBottomWidth: 1,
    borderBottomColor: '#DEE1E6',
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
});

export default Otp;
