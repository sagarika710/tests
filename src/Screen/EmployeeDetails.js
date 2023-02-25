import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Colors} from '../Theme/Color';
import Mainbtn from '../Components/Mainbtn';
import Backbtn from '../Components/Backbtn';
import {apicaller} from '../Components/Api';

const EmployeeDetails = ({navigation, route}) => {
  const {id} = route.params;
  console.log(id);
  const [modalVisible, setModalVisible] = useState(false);
  const [employeedetails, setEmployeedetails] = useState([]);

  useEffect(() => {
    apicaller(`employe-organization-by-id/${id}`, null, 'get', null).then(
      res => {
        console.log('employeedetails', res.data);
        setEmployeedetails(res.data);
      },
    );
  }, []);

  function deleteEmployee() {
    var axios = require('axios');
    var config = {
      method: 'delete',
      url: `https://api.novaprolabs.com/api/employe-organization/${id}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      {employeedetails && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* backicon div */}
          <View style={styles.backIconDiv}>
            <Backbtn />
          </View>

          {/* about profile div */}

          <View>
            {/* profile name icon div */}
            <View style={styles.profileNameAndIconDiv}>
              <View style={styles.iconDiv}>
                <IonIcons name="md-person-outline" size={30} color="#fff" />
              </View>
              <Text style={styles.nameTxt}>
                {employeedetails.employe_user_name}
              </Text>
            </View>
            <View style={styles.employIdMailPhnDobMainDiv}>
              <View style={styles.employIdWithDeleteIconRow}>
                <Text style={styles.employIdTxt}>
                  Employee Id : {employeedetails._id}
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <MaterialCommunityIcons
                    name="delete-outline"
                    size={20}
                    color="#B00909"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.emailPhnDobDiv}>
                <Text style={styles.emailIdTxt}>
                  Email Id : {employeedetails.employe_user_email}
                </Text>
                <Text style={styles.emailIdTxt}>
                  Phone Number : {employeedetails.employe_user_phone}
                </Text>

                {employeedetails.employe_user_dob && (
                  <Text style={styles.emailIdTxt}>
                    Date of Birth :{' '}
                    {employeedetails.employe_user_dob.slice(0, 10)}
                  </Text>
                )}
              </View>
              {/* <TouchableOpacity style={styles.downloadReceiptBtnDiv}>
                <Feather name="download" size={20} color="#5AA644" />
                <Text style={styles.downloadReceiptTxt}>Download Receipt</Text>
              </TouchableOpacity> */}
            </View>
          </View>

          {/* modal */}
          <View style={styles.modalMainDiv}>
            <Modal
              transparent={true}
              visible={modalVisible}
              animationType="slide">
              <View style={styles.modalMainDiv}>
                <View style={styles.modalDiv}>
                  <TouchableOpacity
                    style={styles.closeIconDiv}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Fontisto name="close-a" size={15} color="#000" />
                  </TouchableOpacity>
                  <Text style={styles.areYouSureToDeleteTxt}>
                    Are you sure you want to delete
                  </Text>

                  <Text style={styles.areYouSureToDeleteTxt}>
                    {employeedetails.employe_user_name}?
                  </Text>
                  <View style={styles.yesBtnDiv}>
                    <TouchableOpacity
                      style={styles.yesBtn}
                      onPress={() => {
                        deleteEmployee(), setModalVisible(!modalVisible);
                      }}>
                      <Text style={styles.yesBtnTxt}>Yes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 25,
  },

  // backicon div
  backIconDiv: {
    marginVertical: 50,
  },

  // profile name icon div
  profileNameAndIconDiv: {
    alignItems: 'center',
  },
  iconDiv: {
    width: 60,
    height: 60,
    backgroundColor: Colors.GREEN,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameTxt: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: Colors.BLACK,
    marginTop: 20,
    marginBottom: 30,
  },

  employIdMailPhnDobMainDiv: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GREY,
    padding: 15,
    marginBottom: 20,
  },
  employIdWithDeleteIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  employIdTxt: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.DARKGREY,
    marginBottom: 10,
  },
  emailPhnDobDiv: {
    marginBottom: 15,
  },
  emailIdTxt: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.DARKGREY,
    marginBottom: 10,
  },
  downloadReceiptBtnDiv: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GREEN,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadReceiptTxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.GREEN,
    marginLeft: 10,
  },

  // btn
  bookATestBtn: {
    marginVertical: 20,
  },

  // Modal
  modalMainDiv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.FadedBlack_Modal,
  },
  modalDiv: {
    width: Dimensions.get('screen').width * 0.85,
    margin: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    padding: 25,
    // alignItems: "center",
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeIconDiv: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  areYouSureToDeleteTxt: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: Colors.BLACK,
  },
  yesBtnDiv: {
    alignItems: 'center',
  },
  yesBtn: {
    width: 109,
    height: 36,
    backgroundColor: Colors.GREEN,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  yesBtnTxt: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: Colors.WHITE,
  },
});

export default EmployeeDetails;
