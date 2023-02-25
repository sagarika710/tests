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
import IconS from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {getId} from '../Redux/slices/userSlice';
import {apicaller} from '../Components/Api';
const NovaEditEmployeeScreen = ({route}) => {
  const [employeedetails, setEmployeedetails] = useState([]);
  const {emp} = route.params;
  console.log('poi', emp);
  const navigation = useNavigation();

  const [name, setName] = useState();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const id = useSelector(getId);

  useEffect(() => {
    apicaller(`employe-organization-by-id/${emp}`, null, 'put', null).then(
      res => {
        console.log('employeedetails', res.data);
        setEmployeedetails(res.data);
        setName(res.data.employe_user_name);
        setEmail(res.data.employe_user_email);
        setPhone(res.data.employe_user_phone);
        setDob(res.data.employe_user_dob);
      },
    );
  }, []);
  function Editemp() {
    var data = JSON.stringify({
      organization_id: id,
      employe_user_name: name,
      employe_user_email: email,
      employe_user_phone: phone,
      employe_user_dob: dob,
      age: '0',
    });
    apicaller('employe-organization', data, 'put', null)
      .then(res => {
        console.log(res.data);
        navigation.navigate('NovaEmployeeEditScreen');
      })
      .catch(e => {
        console.log(e.value);
      });
  }
  return (
    <SafeAreaView style={styles.MainsafeareaView}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <Icon name="user-o" size={20} style={styles.IconView} />
          <TextInput
            onChangeText={setName}
            value={name}
            style={{flex: 1}}
            placeholder="Enter Full Name"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icons name="email-outline" style={styles.IconView} />
          <TextInput
            onChangeText={setEmail}
            autoCorrect={false}
            value={email}
            style={{flex: 1}}
            placeholder="Enter Email Id"
          />
        </View>
        <View style={styles.inputContainer}>
          <IconS name="calendar" style={styles.IconView} />
          <TextInput
            onChangeText={setDob}
            autoCorrect={false}
            style={{flex: 1}}
            value={dob}
            placeholder="Enter DOB"
          />
        </View>
        <View style={styles.inputContainer}>
          <Feather name="phone" style={styles.IconView} />
          <TextInput
            onChangeText={setPhone}
            autoCorrect={false}
            style={{flex: 1}}
            value={phone}
            placeholder="Enter Phone Number"
          />
        </View>
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
            Editemp();
            // navigation.navigate('NovaSearchBar');
          }}>
          <Mainbtn titel="save" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NovaEditEmployeeScreen;

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
