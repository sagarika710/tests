import {React, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Theme/Color';
import {useSelector, useDispatch} from 'react-redux';
import {
  emptycart,
  getCart,
  getCartlab,
  getId,
  getPathology_id,
  getPathology_name,
  getTest,
  removecartid,
  removedata,
  setCart,
  setCartlab,
  setPathology_name,
  setTestcart,
} from '../Redux/slices/userSlice';
import {apicaller} from './Api';
import {getPathFromState, useIsFocused} from '@react-navigation/native';

const List = props => {
  const [clickedFirstDiv, setClickedFirstDiv] = useState(false);
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const cardlist = useSelector(getCart);
  const pid = useSelector(getCartlab);
  pname = useSelector(getPathology_name);
  const testid = useSelector(getTest);
  console.log(testid, props.data._id);
  useEffect(() => {
    if (testid) {
      if (testid.includes(props.data._id)) {
        setClickedFirstDiv(true);
      } else {
        setClickedFirstDiv(false);
      }
    }
  }, [isFocused]);
  function check() {
    console.log('plab', props.plab, pid);

    if (cardlist != null) {
      if (cardlist.length != 0 && pid != props.plab) {
        alertmsg();
      } else {
        senddata();
      }
    } else {
      senddata();
    }
  }
  function alertmsg() {
    Alert.alert(
      'Alert',
      `${pname} Lab's test already added in you cart.Do you want to remove those data from cart `,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Remove', onPress: () => dispatch(emptycart())},
      ],
    );
  }
  function senddata() {
    if (clickedFirstDiv) {
      remove();
    } else {
      add();
    }
  }
  function remove() {
    dispatch(removedata(props.data._id));
    dispatch(removecartid(props.data._id));
    setClickedFirstDiv(false);
  }
  function add() {
    let list = {
      id: props.data._id,
      test: props.data.test_name,
      discount_price: props.data.discount_price,
      category: props.category_id,
      actual_price: props.data.actual_price,
    };
    console.log('add function', props.plabname);
    dispatch(setCart(list));
    dispatch(setTestcart(props.data._id));
    dispatch(setCartlab(props.plab));
    dispatch(setPathology_name(props.plabname));
    setClickedFirstDiv(true);
  }
  return (
    <View>
      <TouchableOpacity
        style={styles.allTestsOneRow}
        onPress={() => {
          check();
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* <IonIcons name="md-eyedrop-sharp" size={20} color="#5AA644" /> */}
          <Text style={styles.testNameTxt}>{props.data.test_name}</Text>
          <View style={styles.priceAndDiscountRow}>
            <Text style={styles.priceTxt}>Price: </Text>
            <Text style={styles.originalPriceTxt}>
              {' '}
              {props.data.actual_price}{' '}
            </Text>
            <Text style={styles.priceTxt}>
              {' '}
              {props.data.actual_price - props.data.discount_price}{' '}
            </Text>
            <Text style={styles.discountTxt}> {props.data.discount}%Off </Text>
          </View>

          <View style={styles.emptyDiv}>
            <View style={clickedFirstDiv ? styles.greenDiv : ' '}></View>
          </View>
        </View>
        <Text style={{marginTop: 12}}>
          ** Note : {props.data.preparation_details}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // all tests
  allTestsContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  allTestsOneRow: {
    borderWidth: 1,
    borderColor: Colors.GREEN,
    borderRadius: 10,

    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  mainTestNameTxt: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '800',
    color: Colors.GREEN,
  },
  testNameTxt: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '900',
    color: Colors.Text_Black,
  },
  priceAndDiscountRow: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  priceTxt: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: Colors.Text_Black,
  },
  originalPriceTxt: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: Colors.Text_Black,
    textDecorationLine: 'line-through',
  },
  discountTxt: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: Colors.GREEN,
  },
  emptyDiv: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: Colors.GREY,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenDiv: {
    width: 14,
    height: 14,
    borderRadius: 3,
    backgroundColor: Colors.GREEN,
  },
});

export default List;
