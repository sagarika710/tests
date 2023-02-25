import * as React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {setLang, setLat, setLocationOf} from '../Redux/slices/userSlice';
const GOOGLE_PLACES_API_KEY = 'AIzaSyCbX0Bznd0JJMjt3aw4yc4wYlx9s-pA13I'; // never save your real api key in a snack!

const LocationSearch = ({props, navigation}) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Search"
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en', // language of the results
        }}
        onPress={(data, details = null) => {
          console.log('loacation of', details.description);
          dispatch(setLocationOf(details.name));
          dispatch(setLat(details.geometry.location.lat));
          dispatch(setLang(details.geometry.location.lng));
          navigation.navigate('Home');
          // console.log('datapo', details.geometry.location.lat);
          // console.log('datapo', data.geometry);
        }}
        onFail={error => console.error(error)}
        requestUrl={{
          url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web',
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
  },
});

export default LocationSearch;
