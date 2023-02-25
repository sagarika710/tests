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
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Colors} from '../Theme/Color';
import Backbtn from '../Components/Backbtn';
import Mainbtn from '../Components/Mainbtn';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../Components/Loader/Loader';
import {
  emptycart,
  getCart,
  getId,
  getPathology_id,
  getPathology_name,
  getSelectemp,
  getSelectempid,
  getSlotdate,
  getSlotdateid,
  getSlottime,
  getSlottimeid,
  getUser_type,
} from '../Redux/slices/userSlice';
import {useStripe} from '@stripe/stripe-react-native';
import {apicaller} from '../Components/Api';
const NovaBookingDetailsPreviewScreen1 = ({navigation}) => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('jhhv');
  const [amount, setAmount] = useState('');
  const [orderid, setOrder] = useState('');
  const [orderid2, setOrder2] = useState('');
  const patholab = useSelector(getPathology_name);
  const date = useSelector(getSlotdate);
  const time = useSelector(getSlottime);
  const test = useSelector(getCart);
  const emp = useSelector(getSelectemp);
  const empid = useSelector(getSelectempid);
  const usertypes = useSelector(getUser_type);
  const user = useSelector(getId);
  const pathology_id = useSelector(getPathology_id);
  const timeid = useSelector(getSlottimeid);
  const dateid = useSelector(getSlotdateid);
  const stripe = useStripe();
  const [paymentid, setPaymentid] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    order();
  }, [useIsFocused]);
  let totalPrice = test.reduce(function (accumulator, item) {
    return accumulator + (item.actual_price - item.discount_price);
  }, 0);
  const paidamount = Math.round(totalPrice * 0.18) + totalPrice;
  const subscribe = async () => {
    console.log('subscribe');
    setLoading(true);
    var raw = JSON.stringify({
      user_id: user,
      order_id: [orderid2],
      amount: paidamount * 100,
    });
    console.log(raw);
    try {
      // sending request
      const response = await fetch(
        'https://api.novaprolabs.com/api/create-payment',
        {
          method: 'POST',
          body: raw,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setLoading(false);
      setPaymentid(data.payment_id);
      if (!response.ok) return Alert.alert('failed', data.message);
      const clientSecret = data.paymentIntent;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Example, Inc.',
      });
      if (initSheet.error)
        return Alert.alert('failed', initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });

      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      setLoading(true);
      setTimeout(() => {
        confirmation(data.payment_id);
      }, 3000);
      Alert.alert('Payment complete, thank you!');
    } catch (err) {
      console.error(err);
      setLoading(false);
      Alert.alert('Something went wrong, try again later!');
    }
  };
  const api = [
    {
      name: 'Long Life Pathology',
      address: 'Patia,Bhubaneswar-751024',
      date: '01-Sep-2022',
      time: '02.30a.m',
    },
  ];

  console.log('test', test);

  function order() {
    var axios = require('axios');
    var data = JSON.stringify({
      user: user,
      booking_type: usertypes == 'customer' ? 'user' : 'organization',
      booking_time: time,
      pathology_id: pathology_id,
      slot_date_id: dateid,
      slot_time_id: timeid,
      orders: test,
      booking_for_other: [empid],
    });

    // var config = {
    //   method: 'post',
    //   url: '54.167.118.226:8000/api/order',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   data: data,
    // };

    // axios(config)
    apicaller('order', data, 'post', null)
      .then(function (response) {
        console.log('kjhbgvfdfcgvhb', JSON.stringify(response.data));

        setOrder(response.data[0].order_id);
        setOrder2(response.data[0]._id);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }
  console.log('orderid', orderid);

  function confirmation(pop) {
    var axios = require('axios');
    var data = JSON.stringify({
      payment_status: 'paid',
      order_id: [orderid],
      payment_id: pop,
    });
    console.log('data', data);
    var config = {
      method: 'put',
      url: 'https://api.novaprolabs.com/api/order',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        console.log(JSON.stringify(response.data));
        dispatch(emptycart());
        console.log('sagggg', response);
        navigation.navigate('NovaBookingDetailsPreviewScreen2', {response});
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }
  return (
    <SafeAreaView style={styles.Container}>
      <Loader loading={loading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar hidden={true} />
        <View style={styles.BackIconView}>
          <Backbtn />
        </View>

        <View style={styles.secondrow}>
          <View style={styles.secondrowDiv}>
            {/* order details text */}
            <View>
              <Text style={styles.orderDetailsTxt}>Booking Details</Text>
            </View>
            {/* order deatils div */}
            {api.map(e => {
              return (
                <View style={styles.orderDetailsMainDiv}>
                  <View style={styles.orderDetailsDiv}>
                    <Text style={styles.orderDetailsDivTxt}>
                      Pathology Name :{' '}
                    </Text>
                    <Text style={styles.apiNameTxt}>{patholab}</Text>
                  </View>
                  <View style={styles.orderDetailsDiv}>
                    <Text style={styles.orderDetailsDivTxt}>Slot Date : </Text>
                    <Text style={styles.apiNameTxt}>{date}</Text>
                  </View>
                  <View style={styles.orderDetailsDiv}>
                    <Text style={styles.orderDetailsDivTxt}>Slot Time : </Text>
                    <Text style={styles.apiNameTxt}>{time}</Text>
                  </View>
                  {usertypes && usertypes == 'organization' && (
                    <View style={styles.orderDetailsDiv}>
                      <Text style={styles.orderDetailsDivTxt}>
                        Employee Name :{' '}
                      </Text>
                      <Text style={styles.apiNameTxt}>{emp}</Text>
                    </View>
                  )}
                </View>
              );
            })}

            {/* payment summary div */}
            <View style={styles.paymentSummaryWholeDiv}>
              {/* payment summary txt */}
              <View>
                <Text style={styles.orderDetailsTxt}>Payment Details</Text>
              </View>
              <View style={styles.testsMainDiv}>
                {test.map(data => {
                  return (
                    <View style={styles.testsDiv}>
                      <Text style={styles.orderDetailsDivTxt2}>
                        {data.test}
                      </Text>
                      <Text style={styles.orderDetailsDivTxt2}>
                        $ {data.actual_price - data.discount_price}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.testsMainDiv}>
                <View style={styles.testsDiv}>
                  <Text style={styles.orderDetailsDivTxt3}>Total</Text>
                  <Text style={styles.orderDetailsDivTxt3}>$ {totalPrice}</Text>
                </View>

                <View style={styles.testsDiv}>
                  <Text style={styles.orderDetailsDivTxt3}>Taxes</Text>
                  <Text style={styles.orderDetailsDivTxt3}>
                    $ {Math.round(totalPrice * 0.18)}
                  </Text>
                </View>
              </View>
            </View>
            {/* grand total div */}
            <View style={styles.useCouponsDiv}>
              <View>
                <Text style={styles.orderDetailsDivTxt4}>Grand Total</Text>
              </View>
              <View>
                <Text style={styles.orderDetailsDivTxt4}>
                  $ {Math.round(totalPrice * 0.18) + totalPrice}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{height: Dimensions.get('screen').height * 0.12}}></View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setName(patholab);
            setLoading(true);
            setTimeout(() => {
              subscribe();
            }, 1000);

            //navigation.navigate('NovaBookingDetailsPreviewScreen2');
          }}>
          <Mainbtn titel="Proceed To Pay" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NovaBookingDetailsPreviewScreen1;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 20,
  },
  BackIconView: {
    marginVertical: 30,
    // marginHorizontal: 15,
  },
  secondrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondrowDiv: {
    width: '98%',
    backgroundColor: '#FEFEFE',
    borderRadius: 10,
    paddingVertical: 20,
    paddingLeft: 15,
    paddingRight: 20,
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

  paymentSummaryTxt: {
    color: Colors.BLACK,
    fontSize: 14,
    letterSpacing: 0.3,
    lineHeight: 22,
    fontFamily: 'Poppins-Medium',
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
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.3,
    lineHeight: 22,
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
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.3,
    lineHeight: 21,
    marginBottom: 5,
  },
  btn: {
    marginBottom: 10,
  },
});
