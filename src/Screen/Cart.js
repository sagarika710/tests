import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  BackHandler,
  Image,
} from 'react-native';
import {Colors} from '../Theme/Color';
import Backbtn from '../Components/Backbtn';
import Mainbtn from '../Components/Mainbtn';
import {useSelector, useDispatch} from 'react-redux';
import {
  getCart,
  getPathology_name,
  gettoken,
  removecartid,
  removedata,
} from '../Redux/slices/userSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
function Cart({navigation, route}) {
  const dispatch = useDispatch();
  const cartdata = useSelector(getCart);
  console.log('cartdata', cartdata);
  const Token = useSelector(gettoken);
  const pname = useSelector(getPathology_name);
  const {from} = route.params;
  function handleBackButtonClick() {
    if (from == 'login') {
      navigation.navigate('Home');
    } else {
      navigation.goBack();
    }
    return true;
  }

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  return (
    <SafeAreaView style={styles.Mainbox}>
      <View>
        <View style={styles.header}>
          <Backbtn />
          <Text style={styles.headertxt}>My Cart</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {cartdata != null && cartdata.length != 0 ? (
            <View style={styles.box}>
              <Text style={styles.pathoname}>{pname}</Text>
              {cartdata.map(e => {
                return (
                  <View style={styles.cartitem}>
                    <View style={styles.row}>
                      <Text style={styles.stxt}>{e.test}</Text>
                      <Text style={styles.stxt}>{e.price}</Text>
                    </View>
                    <View style={styles.btnview}>
                      <TouchableOpacity
                        style={styles.dltbtn}
                        onPress={() => {
                          dispatch(removedata(e.lab_test_id));

                          dispatch(removecartid(e.lab_test_id));
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'Poppins-Bold',
                            color: Colors.GREEN,
                          }}>
                          Delete This Item
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{height: 400, width: 400}}
                source={require('../Assets/Images/EmptyCart.gif')}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Poppins-Bold',
                  textAlign: 'center',
                }}>
                Your cart is empty.{'\n'} Please add test for booking.
              </Text>
            </View>
          )}
        </ScrollView>
        {cartdata != null && cartdata.length != 0 && (
          <TouchableOpacity
            onPress={() =>
              Token ? navigation.navigate('Slot') : navigation.navigate('Login')
            }
            style={styles.bookASlotBtnDiv}>
            <Mainbtn titel="Book a Slot" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Mainbox: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    paddingHorizontal: 20,
  },
  // btn
  bookASlotBtnDiv: {
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  headertxt: {
    marginLeft: 15,
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.5,
    color: Colors.Text_Black,
  },
  box: {
    borderWidth: 1,
    borderColor: Colors.GREY,
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
  },
  pathoname: {
    color: Colors.GREEN,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    letterSpacing: 1,
    marginBottom: 10,
  },
  cartitem: {
    marginTop: 15,
    borderColor: Colors.GREY,
    borderWidth: 1,
    borderRadius: 5,
  },
  stxt: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  btnview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  // btn: {
  //   backgroundColor: Colors.GREEN,
  //   height: 40,
  //   borderRadius: 5,
  //   width: '49%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  dltbtn: {
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    borderColor: Colors.GREEN,
    borderWidth: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
});
export default Cart;
