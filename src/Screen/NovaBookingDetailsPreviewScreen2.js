import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../Theme/Color';
import Backbtn from '../Components/Backbtn';
import Mainbtn from '../Components/Mainbtn';

const NovaBookingDetailsPreviewScreen2 = ({route}) => {
  const navigation = useNavigation();
  const {response} = route.params;
  const [alldata, setAlldata] = useState(response.data.orderData);
  console.log('alldata', response.data);
  const api = [
    {
      name: 'Long Life Pathology',
      address: 'Patia,Bhubaneswar-751024',
      date: '01-Sep-2022',
      time: '02.30a.m',
    },
  ];

  return (
    <SafeAreaView style={styles.Container}>
      {alldata && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar hidden={true} />
          <View style={styles.BackIconView}></View>

          <View style={styles.secondrow}>
            <View style={styles.secondrowDiv}>
              <View style={styles.orderDetailsMainDivText}>
                <Text style={styles.orderDetailsDivText}>
                  ORDER ID : {alldata.order_id}
                </Text>
                <Text style={styles.orderDetailsDivText1}>
                  Your booking has been confirmed.
                </Text>
              </View>

              <View>
                <Text style={styles.orderDetailsTxt}>Booking Details</Text>
              </View>
              {api.map(e => {
                return (
                  <View style={styles.orderDetailsMainDiv}>
                    <View style={styles.orderDetailsDiv}>
                      <Text style={styles.orderDetailsDivTxt}>
                        Pathology Name :{' '}
                      </Text>
                      <Text style={styles.apiNameTxt}>
                        {alldata.pathology_id.lab_name}
                      </Text>
                    </View>

                    <View style={styles.orderDetailsDiv}>
                      <Text style={styles.orderDetailsDivTxt}>
                        Slot Time :{' '}
                      </Text>
                      <Text style={styles.apiNameTxt}>
                        {alldata.pathology_id.time_start}
                      </Text>
                    </View>
                  </View>
                );
              })}

              <View style={styles.paymentSummaryWholeDiv}>
                <View>
                  <Text style={styles.orderDetailsTxt}>Payment Details</Text>
                </View>
                <View style={styles.testsMainDiv}>
                  <View style={styles.testsDiv}>
                    <Text style={styles.orderDetailsDivTxt2}>
                      {alldata?.lab_test_id?.test_name}
                    </Text>
                    <Text style={styles.orderDetailsDivTxt2}>
                      $ {alldata?.actual_price - alldata?.discount_price}
                    </Text>
                  </View>
                </View>
                <View style={styles.testsMainDiv}>
                  <View style={styles.testsDiv}>
                    <Text style={styles.orderDetailsDivTxt3}>Total</Text>
                    <Text style={styles.orderDetailsDivTxt3}>
                      $ {alldata.final_price}
                    </Text>
                  </View>

                  <View style={styles.testsDiv}>
                    <Text style={styles.orderDetailsDivTxt3}>Taxes</Text>
                    <Text style={styles.orderDetailsDivTxt3}>
                      $ {alldata.gst}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.useCouponsDiv}>
                <View>
                  <Text style={styles.orderDetailsDivTxt4}>Grand Total</Text>
                </View>
                <View>
                  <Text style={styles.orderDetailsDivTxt4}>
                    $ {alldata.total_amount}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{marginHorizontal: 20}}
            onPress={() => navigation.navigate('Tab')}>
            <Text
              style={{color: Colors.GREEN, fontSize: 15, fontWeight: '900'}}>
              Go Back to Home
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default NovaBookingDetailsPreviewScreen2;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  BackIconView: {
    marginVertical: 30,
    marginHorizontal: 15,
  },
  secondrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondrowDiv: {
    width: Dimensions.get('window').width * 0.92,
    backgroundColor: '#FEFEFE',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    paddingVertical: 20,
    paddingLeft: 15,
    paddingRight: 20,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 20,
  },
  orderDetailsTxt: {
    color: Colors.BLACK,
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.3,
  },
  apiNameTxt: {
    color: Colors.Text_Black,
    fontSize: 12,

    letterSpacing: 0.3,
    fontFamily: 'Poppins-Regular',
  },
  orderDetailsMainDiv: {
    marginVertical: 10,
  },
  orderDetailsDiv: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medicineNamesDiv: {
    justifyContent: 'flex-start',
    marginRight: 15,
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

  testsMainDiv: {
    marginVertical: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GREY,
  },
  testsDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  orderDetailsDivTxt1: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.BLACK,
    marginBottom: 5,
    lineHeight: 22,
    letterSpacing: 0.2,
  },

  paymentSummaryTxt: {
    color: Colors.BLACK,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.3,
    lineHeight: 22,
    marginBottom: 20,
  },
  paymentSummaryDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    marginBottom: 10,
  },
  orderDetailsDivTxt2: {
    color: Colors.BLACK,
    fontSize: 12,
    letterSpacing: 0.3,
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
    marginBottom: 7,
  },
  orderDetailsDivTxt3: {
    color: Colors.BLACK,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.3,
    lineHeight: 22,
    marginBottom: 5,
  },
  useCouponsDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDetailsDivTxt4: {
    color: Colors.BLACK,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.3,
    lineHeight: 21,
    marginBottom: 5,
  },
  btn: {
    marginBottom: 10,
  },
  orderDetailsMainDivText: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  orderDetailsDivText: {
    color: Colors.GREEN,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.5,
    lineHeight: 24,
    marginBottom: 5,
  },
  orderDetailsDivText1: {
    color: Colors.BLACK,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.3,
    lineHeight: 18,
    marginBottom: 5,
  },
});
