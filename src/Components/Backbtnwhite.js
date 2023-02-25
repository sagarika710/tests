import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Colors} from '../Theme/Color';
import Feather from 'react-native-vector-icons/Feather';

const Backbtnwhite = props => {
  return (
    <View style={styles.Mainbox}>
      <TouchableOpacity style={styles.Button}>
        <Feather name="chevron-left" color={Colors.GREEN} size={25} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  Mainbox: {
    backgroundColor: Colors.WHITE,
  },

  Button: {
    width: 40,
    height: 40,
    backgroundColor: Colors.WHITE,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Backbtnwhite;
