import {React, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Theme/Color';
import {useSelector} from 'react-redux';
import {getId, getPathology_id} from '../Redux/slices/userSlice';
import {apicaller} from './Api';
import List from './List';

const PatholabDetailsComponent = props => {
  const [clickedFirstDiv, setClickedFirstDiv] = useState(false);
  const [clickedSecondDiv, setClickedSecondDiv] = useState(false);
  const [test, setTest] = useState([]);
  const patho_id = useSelector(getPathology_id);
  const user_id = useSelector(getId);
  useEffect(() => {
    patho();
  }, []);
  function patho() {
    apicaller(
      `lab-test-by-category?pathology_id=${patho_id}&test_category_id=${props.datas._id}`,
      null,
      'get',
      null,
    ).then(res => {
      console.log(res.data);
      setTest(res.data);
    });
  }
  return (
    <View style={styles.allTestsContainer}>
      {test &&
        test.map(e => {
          return (
            <List
              data={e}
              plab={patho_id}
              plabname={props.labname}
              category_id={props.datas._id}
            />
          );
        })}
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
    fontFamily: 'Poppins-Medium',
    color: Colors.GREEN,
  },
  testNameTxt: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: Colors.Text_Black,
  },
  priceAndDiscountRow: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  priceTxt: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.Text_Black,
  },
  originalPriceTxt: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.Text_Black,
    textDecorationLine: 'line-through',
  },
  discountTxt: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
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

export default PatholabDetailsComponent;
