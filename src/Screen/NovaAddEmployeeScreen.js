import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../Theme/Color';
import Backbtn from '../Components/Backbtn';
import Mainbtn from '../Components/Mainbtn';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import IconS from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {getId} from '../Redux/slices/userSlice';
import {apicaller} from '../Components/Api';
import {set} from 'immer/dist/internal';
const NovaAddEmployeeScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date());
  const [phone, setPhone] = useState('');
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState('');
  const [err, setErr] = useState('');
  const [open, setOpen] = useState(false);
  const [dob, setDob] = useState('');
  const id = useSelector(getId);
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  function Addemp() {
    var data = JSON.stringify({
      organization_id: id,
      employe_user_name: name,
      employe_user_email: email,
      employe_user_phone: phone,
      employe_user_dob: show,
      gender: gender,
      age: '0',
    });
    apicaller('employe-organization', data, 'post', null)
      .then(res => {
        console.log(res.data);
        navigation.navigate('NovaEmployeeEditScreen');
      })
      .catch(e => {
        console.log(e.response.data.message);
        alert(e.response.data.message);
      });
  }
  return (
    <SafeAreaView style={styles.MainsafeareaView}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <View style={styles.BackiconView}>
          <Backbtn />
        </View>
        <View style={{height: Dimensions.get('screen').height * 0.02}}></View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.ProfileView}>
            <Icon name="user-o" size={20} style={styles.userPlusIcon} />
          </View>
        </View>
        <View style={{height: Dimensions.get('screen').height * 0.06}}></View>
        <View style={styles.inputContainer}>
          <Icon name="user-o" size={18} style={styles.IconView} />
          <TextInput
            onChangeText={setName}
            style={{flex: 1}}
            placeholder="Enter Full Name"
          />
        </View>
        <Text
          style={{
            alignSelf: 'flex-end',
            marginRight: 30,
            color: 'red',
            fontFamily: 'Poppins-Bold',
            fontSize: 16,
            display: err == 'name' ? 'flex' : 'none',
          }}>
          **Require
        </Text>
        <View style={styles.inputContainer}>
          <Icons name="email-outline" style={styles.IconView} />
          <TextInput
            onChangeText={setEmail}
            autoCorrect={false}
            style={{flex: 1}}
            placeholder="Enter Email Id"
          />
        </View>
        <Text
          style={{
            alignSelf: 'flex-end',
            marginRight: 30,
            color: 'red',
            fontFamily: 'Poppins-Bold',
            fontSize: 16,
            display: err == 'email' ? 'flex' : 'none',
          }}>
          **Require
        </Text>
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}
          style={styles.inputContainer}>
          <IconS name="calendar" style={styles.IconView} />
          <TextInput
            editable={false}
            // onChangeText={setDob}
            value={show}
            autoCorrect={false}
            style={{flex: 1, color: 'black'}}
            placeholder="Enter DOB"
          />
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: 'flex-end',
            marginRight: 30,
            color: 'red',
            fontFamily: 'Poppins-Bold',
            fontSize: 16,
            display: err == 'dob' ? 'flex' : 'none',
          }}>
          **Require
        </Text>
        <View style={styles.inputContainer}>
          <Feather name="phone" style={styles.IconView} />
          <TextInput
            onChangeText={setPhone}
            autoCorrect={false}
            style={{flex: 1}}
            placeholder="Enter Phone Number"
          />
        </View>
        <Text
          style={{
            alignSelf: 'flex-end',
            marginRight: 30,
            color: 'red',
            fontFamily: 'Poppins-Bold',
            fontSize: 16,
            display: err == 'phone' ? 'flex' : 'none',
          }}>
          **Require
        </Text>
        <View style={styles.inputContainer}>
          <Icons name="gender-male-female" size={28} style={styles.IconView} />
          <TextInput
            onChangeText={setGender}
            autoCorrect={false}
            style={{flex: 1}}
            placeholder="Enter Gender"
          />
        </View>
        <Text
          style={{
            alignSelf: 'flex-end',
            marginRight: 30,
            color: 'red',
            fontFamily: 'Poppins-Bold',
            fontSize: 16,
            display: err == 'gender' ? 'flex' : 'none',
          }}>
          **Require
        </Text>
        {/* <View style={styles.inputContainer}>
          <Icons name="email-outline" style={styles.IconView} />
          <TextInput
            autoCorrect={false}
            style={{flex: 1}}
            placeholder="Enter Employee Id"
          />
        </View> */}
        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => {
            if (name) {
              if (emailRegex.test(email)) {
                if (show) {
                  if (phone) {
                    if (gender) {
                      Addemp();
                    } else {
                      setErr('gender');
                    }
                  } else {
                    setErr('phone');
                  }
                } else {
                  setErr('dob');
                }
              } else {
                setErr('email');
              }
            } else {
              setErr('name');
            }

            // navigation.navigate('NovaSearchBar');
          }}>
          <Mainbtn titel="save" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NovaAddEmployeeScreen;

const styles = StyleSheet.create({
  MainsafeareaView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  BackiconView: {
    marginVertical: 30,
    marginHorizontal: 20,
  },
  ProfileView: {
    //marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 35,
    width: 70,
    height: 70,
    backgroundColor: Colors.GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userPlusIcon: {
    color: Colors.WHITE,
  },
  inputContainer: {
    height: 50,
    backgroundColor: Colors.WHITE,
    borderColor: '#e1e1e1',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  IconView: {fontSize: 22, marginRight: 10, color: '#9C9C9C'},
});
