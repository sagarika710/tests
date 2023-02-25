import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Colors} from '../Theme/Color';

const Smallbtn = props => {
  return (
    <View style={styles.Mainbox}>
      <View style={[styles.Button]}>
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
    height: 70,
  },

  Button: {
    height: 45,
    width: 200,
    backgroundColor: Colors.GREEN,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Btntext: {
    color: Colors.WHITE,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    letterSpacing: 1,
  },
});

export default Smallbtn;
