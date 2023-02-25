import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Colors} from '../Theme/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Backbtn from '../Components/Backbtn';
import {useSelector, useDispatch} from 'react-redux';
import {
  cleardata,
  getCompany,
  getDob,
  getEmail,
  getFirst_name,
  getLast_name,
  getPhone_number,
  setSignup,
} from '../Redux/slices/userSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
function Profile({navigation}) {
  const name = useSelector(getFirst_name);
  const last = useSelector(getLast_name);
  const phone = useSelector(getPhone_number);
  const emailid = useSelector(getEmail);
  const organization = useSelector(getCompany);
  const dob = useSelector(getDob);
  const dispatch = useDispatch();
  function log() {
    dispatch(cleardata('res.data.user.phone_number'));
    navigation.navigate('Home');
  }
  console.log(name);
  return (
    <SafeAreaView style={styles.Mainbox}>
      <Backbtn />
      {name ? (
        <View style={styles.box1}>
          <View style={styles.row}>
            <View style={styles.profile}>
              <Feather name="user" color={Colors.WHITE} size={35} />
            </View>
            <View>
              {organization ? (
                <View style={styles.row}>
                  <Text style={styles.name}>{organization}</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Profile_Edit')}>
                    <Feather name="edit-3" color={Colors.BLACK} size={15} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.row}>
                  <Text style={styles.name}>
                    {name} {last}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Profile_Edit')}>
                    <Feather name="edit-3" color={Colors.BLACK} size={15} />
                  </TouchableOpacity>
                </View>
              )}

              <Text style={styles.number}>{phone}</Text>
            </View>
          </View>
          <View style={styles.box2}>
            <View style={[styles.row, styles.mailsec]}>
              <Feather name="mail" color="#9c9c9c" size={20} />
              <Text style={styles.mail}>{emailid}</Text>
            </View>

            {dob && (
              <View style={[styles.row, styles.mailsec]}>
                <Feather name="calendar" color="#9c9c9c" size={20} />
                <Text style={styles.mail}>{dob.slice(0, 10)}</Text>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.box1}>
          <View style={styles.row}>
            <View style={styles.profile}>
              <Feather name="user" color={Colors.WHITE} size={35} />
            </View>
            <View>
              <View style={styles.row}>
                <Text style={styles.name}>Hi Guest ! </Text>
              </View>
            </View>
          </View>
          <View style={styles.box2}>
            <TouchableOpacity
              style={[styles.row, styles.mailsec]}
              onPress={() => {
                navigation.navigate('Login');
                dispatch(setSignup('login'));
              }}>
              <Text
                style={[
                  styles.mail,
                  {
                    fontFamily: 'Poppins-Bold',
                    color: '#000',
                    fontSize: 16,
                    marginLeft: 0,
                  },
                ]}>
                Sign in To continue
              </Text>
              <Feather name="chevron-right" color="#000" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('OrderList');
          }}
          style={[styles.row, styles.box3]}>
          <View style={styles.row}>
            <View style={styles.icon_view}>
              <Feather name="file-text" color={Colors.WHITE} size={25} />
            </View>
            <View>
              <Text style={styles.menu}>My Orders</Text>
            </View>
          </View>
          <Feather name="chevron-right" color={Colors.GREEN} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TermsAndCondition');
          }}
          style={[styles.row, styles.box3]}>
          <View style={styles.row}>
            <View style={styles.icon_view}>
              <Feather name="file" color={Colors.WHITE} size={25} />
            </View>
            <View>
              <Text style={styles.menu}>Terms & Condition</Text>
            </View>
          </View>
          <Feather name="chevron-right" color={Colors.GREEN} size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PrivacyPolicy');
          }}
          style={[styles.row, styles.box3]}>
          <View style={styles.row}>
            <View style={styles.icon_view}>
              <MaterialCommunityIcons
                name="shield-alert-outline"
                color={Colors.WHITE}
                size={25}
              />
            </View>
            <View>
              <Text style={styles.menu}>Privacy Policy</Text>
            </View>
          </View>
          <Feather name="chevron-right" color={Colors.GREEN} size={20} />
        </TouchableOpacity>

        <View style={[styles.row, styles.box3]}>
          <TouchableOpacity onPress={() => navigation.navigate('Faqs')}>
            <View style={styles.row}>
              <View style={styles.icon_view}>
                <AntDesign
                  name="questioncircleo"
                  color={Colors.WHITE}
                  size={25}
                />
              </View>
              <View>
                <Text style={styles.menu}>FAQs</Text>
              </View>
            </View>
          </TouchableOpacity>
          <Feather name="chevron-right" color={Colors.GREEN} size={20} />
        </View>

        <View style={[styles.row, styles.box3]}>
          <View style={styles.row}>
            <View style={styles.icon_view}>
              <Feather name="star" color={Colors.WHITE} size={25} />
            </View>
            <View>
              <Text style={styles.menu}>Rate Us</Text>
            </View>
          </View>
          <Feather name="chevron-right" color={Colors.GREEN} size={20} />
        </View>

        {name && (
          <View style={[styles.row, styles.box3, {marginBottom: 30}]}>
            <TouchableOpacity style={styles.row} onPress={() => log()}>
              <View style={styles.icon_view}>
                <AntDesign name="logout" color={Colors.WHITE} size={25} />
              </View>
              <View>
                <Text style={styles.menu}>Logout</Text>
              </View>
            </TouchableOpacity>
            <Feather name="chevron-right" color={Colors.GREEN} size={20} />
          </View>
        )}
        <View style={{height: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Mainbox: {
    flex: 1,
    padding: 20,

    backgroundColor: Colors.WHITE,
  },
  box1: {
    backgroundColor: Colors.Faded_Green,
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.GREY,
    marginVertical: 20,
    paddingTop: 30,
    marginBottom: 20,
  },
  box2: {
    margin: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    height: 70,
    width: 70,
    backgroundColor: Colors.GREEN,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    color: Colors.BLACK,
  },
  number: {
    color: Colors.BLACK,
    fontFamily: 'Poppins-Medium',
  },
  mail: {
    marginLeft: 10,
    color: '#9c9c9c',
  },
  mailsec: {
    marginVertical: 10,
  },
  icon_view: {
    height: 50,
    width: 50,
    backgroundColor: Colors.GREEN,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  menu: {
    color: Colors.GREEN,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  box3: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default Profile;
