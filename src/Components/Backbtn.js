import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Colors } from '../Theme/Color';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const Backbtn = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.Mainbox}>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          navigation.goBack();
        }}>
        <Feather name="chevron-left" color={Colors.GREEN} size={25} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  Mainbox: {
    // backgroundColor: Colors.WHITE,
  },

  Button: {
    width: 40,
    height: 40,
    backgroundColor: Colors.Faded_Green,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Backbtn;
