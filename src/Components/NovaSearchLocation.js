import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
const NovaSearchLocation = ({onChangeValue, onValueSubmitted, data}) => {
  return (
    <View style={styles.SearchBarView}>
      <Feather name="search" style={styles.iconStyle} />
      <TextInput
        style={styles.textInputStyle}
        placeholder="Search Location"
        placeholderTextColor="black"
        onChangeText={newChange => onChangeValue(newChange)}
        onSubmitEditing={subValue => onValueSubmitted(subValue)}
      />
    </View>
  );
};

export default NovaSearchLocation;

const styles = StyleSheet.create({
  SearchBarView: {
    backgroundColor: 'skyblue',
    flexDirection: 'row',
    marginTop: 10,
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
  },
  textInputStyle: {
    fontSize: 18,
    //backgroundColor: 'red',
    flex: 1,
  },
  iconStyle: {
    alignSelf: 'center',
    fontSize: 35,
    marginHorizontal: 15,
  },
});
