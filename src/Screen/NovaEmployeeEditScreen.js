import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../Theme/Color';
import Backbtn from '../Components/Backbtn';
import Mainbtn from '../Components/Mainbtn';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconedit from 'react-native-vector-icons/Feather';
import {apicaller} from '../Components/Api';
import {useSelector, useDispatch} from 'react-redux';
import {getId} from '../Redux/slices/userSlice';

const NovaEmployeeEditScreen = () => {
  const isFocused = useIsFocused();
  const id = useSelector(getId);
  const navigation = useNavigation();
  const [employe, setEmploye] = React.useState();
  React.useEffect(() => {
    apicaller(`employe-organization/${id}`, null, 'get', null)
      .then(res => {
        console.log(res.data);
        setEmploye(res.data);
      })
      .catch(e => {
        console.log(e.value);
      });
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.MainsafeareaView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar hidden={true} />
        <View style={styles.BackiconView}>
          <Backbtn />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.CardContainer}
            onPress={() => navigation.navigate('NovaAddEmployeeScreen')}>
            <Icons name="user-plus" size={17} style={styles.userPlusIcon} />
            <Text style={styles.CardContainerTxt}>Add Employee</Text>
          </TouchableOpacity>
        </View>
        {employe &&
          employe.map(e => {
            return (
              <View style={{alignItems: 'center'}}>
                <View style={styles.UserDetailsView}>
                  <View style={styles.UserDetailsSecondView}>
                    <View style={styles.userPlusIconDiv}>
                      <Icon
                        name="user-o"
                        size={15}
                        style={styles.userPlusIcon1}
                      />
                    </View>

                    <View style={styles.userPlusTextDiv}>
                      <Text style={styles.userPlustxt}>
                        {e.employe_user_name}
                      </Text>
                    </View>

                    {/* <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('NovaEditEmployeeScreen', {
                          emp: e._id,
                        })
                      }
                      style={styles.edit3IconDiv}>
                      <Iconedit
                        name="edit-3"
                        size={20}
                        style={styles.edit3Icon}
                      />
                    </TouchableOpacity> */}
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('EmployeeDetails', {id: e._id})
                    }
                    style={styles.orderDetailsDiv}>
                    <View style={styles.orderDetailsLeftDiv}>
                      <View style={styles.medicineNamesDiv}>
                        <Text style={styles.orderDetailsDivTxt}>
                          EmployeeId
                        </Text>
                        <Text style={styles.orderDetailsDivTxt}>Email Id</Text>
                        <Text style={styles.orderDetailsDivTxt}>
                          Phone Number{' '}
                        </Text>
                        <Text style={styles.orderDetailsDivTxt}>
                          Date Of Birth
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.orderDetailsDivTxt1}>
                          : {e.organization_id}
                        </Text>
                        <Text style={styles.orderDetailsDivTxt1}>
                          : {e.employe_user_email}
                        </Text>
                        <Text style={styles.orderDetailsDivTxt1}>
                          : {e.employe_user_phone}
                        </Text>
                        <Text style={styles.orderDetailsDivTxt1}>
                          :{e.employe_user_dob}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NovaEmployeeEditScreen;

const styles = StyleSheet.create({
  MainsafeareaView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  BackiconView: {
    marginVertical: 30,
    paddingHorizontal: 15,
  },
  CardContainer: {
    width: Dimensions.get('window').width * 0.9,

    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 10,
  },
  CardContainerTxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.3,
    color: Colors.GREEN,
  },
  userPlusIcon: {
    color: Colors.GREEN,
    marginRight: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  UserDetailsView: {
    width: Dimensions.get('window').width * 0.9,
    // height: Dimensions.get('window').height * 0.8,
    backgroundColor: '#FEFEFE',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 10,
    padding: 10,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 20,
  },
  UserDetailsSecondView: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userPlusIconDiv: {
    backgroundColor: Colors.GREEN,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginRight: 5,
  },
  userPlusIcon1: {
    color: Colors.WHITE,
  },
  userPlusTextDiv: {
    marginHorizontal: 10,
  },
  userPlustxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.3,
    color: Colors.GREEN,
  },
  edit3Icon: {
    color: Colors.BLACK,
  },
  UserDetailsSecondView1: {
    margin: 10,
  },

  orderDetailsTxt: {
    color: Colors.BLACK,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.3,
  },
  orderDetailsDiv: {
    paddingVertical: 20,
    marginVertical: 10,

    borderTopColor: '#e1e1e1',
    borderBottomColor: '#e1e1e1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDetailsLeftDiv: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  medicineNamesDiv: {
    justifyContent: 'flex-start',
  },
  orderDetailsDivTxt: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: Colors.BLACK,
    marginBottom: 5,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  orderDetailsDivTxt1: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.BLACK,
    marginBottom: 5,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
});
