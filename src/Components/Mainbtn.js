import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Colors} from '../Theme/Color';

const Mainbtn = props => {
  return (
    <View style={styles.Mainbox}>
      <View
        style={[
          styles.Button,
          {backgroundColor: props.disable ? Colors.GREY : Colors.GREEN},
        ]}>
        <Text style={styles.Btntext}>{props.titel}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Mainbox: {
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },

  Button: {
    width: '100%',
    height: 48,

    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Btntext: {
    color: Colors.WHITE,
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: 'Poppins-Bold',
  },
});

export default Mainbtn;
