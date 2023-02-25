import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from '../Theme/Color';
import Icons from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'react-native-geolocation-service';
import {
  getLang,
  getLat,
  getLoactonof,
  setLang,
  setLat,
} from '../Redux/slices/userSlice';
import {SafeAreaView} from 'react-native-safe-area-context';

const NovaLocationScreen = () => {
  const navigation = useNavigation();
  let lat = useSelector(getLat);
  let lang = useSelector(getLang);
  const dispatch = useDispatch();
  const [location, setLocation] = useState();
  // useEffect(() => {
  //   requestLoc();
  // }, []);
  const requestLoc = async () => {
    console.log('requestLoc');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Nova',
          message: 'Nova is asking for your permission to access location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location granted');
        //  alert('Location granted');
        getlocdata();
      } else {
        console.log('location failed');
        //  alert('Location permission not granted');
      }
    } catch (e) {
      console.error('location error', e);
    }
  };
  let names = useSelector(getLoactonof);
  useEffect(() => {
    if (names) {
      navigation.navigate('Home');
    }
  }, [names]);
  useEffect(() => {
    getlocdata();
  }, []);
  function getlocdata() {
    console.log('position', Geolocation.getCurrentPosition);
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);

        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        dispatch(setLat(position.coords.latitude));
        dispatch(setLang(position.coords.longitude));
        // dispatch(
        //   setLoc({
        //     latitude: position.coords.latitude,
        //     longitude: position.coords.longitude,
        //   }),
        // );
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }
  //   useEffect(async () => {
  //     let hasLoc = await requestLoc();
  //   }, []);

  function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {lat: 40.72, lng: -73.96},
    });
    const geocoder = new google.maps.Geocoder();
    const infowindow = new google.maps.InfoWindow();

    document.getElementById('submit').addEventListener('click', () => {
      geocodePlaceId(geocoder, map, infowindow);
    });
  }

  // This function is called when the user clicks the UI button requesting
  // a geocode of a place ID.
  function geocodePlaceId(geocoder, map, infowindow) {
    const placeId = document.getElementById('place-id').value;

    geocoder
      .geocode({placeId: placeId})
      .then(({results}) => {
        if (results[0]) {
          map.setZoom(11);
          map.setCenter(results[0].geometry.location);

          const marker = new google.maps.Marker({
            map,
            position: results[0].geometry.location,
          });
          console.log('marker', results);
          infowindow.setContent(results[0].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      })
      .catch(e => window.alert('Geocoder failed due to: ' + e));
  }

  window.initMap = initMap;
  console.log(location);

  return (
    <SafeAreaView style={styles.Container}>
      <View>
        <View style={{height: Dimensions.get('screen').height * 0.1}}></View>

        <View style={styles.Imagecontainer}>
          <Image
            source={require('../Assets/Images/Directions.gif')}
            style={styles.Directimage}
          />
        </View>
        <View style={{height: Dimensions.get('screen').height * 0.08}}></View>
        <View>
          <TouchableOpacity
            style={styles.locationContainer}
            onPress={() => {
              navigation.navigate('Tab');
              requestLoc();
            }}>
            <Icons name="location-arrow" size={18} style={styles.icons}></Icons>
            <Text style={styles.locationText}>Detect My Current Location</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btnMainDiv}
          onPress={() => {
            navigation.navigate('LocationSearch');
          }}>
          <View style={styles.btnDiv}>
            <Text style={styles.btnTxt}>Select Location Manually</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NovaLocationScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 25,
  },
  Imagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Directimage: {
    width: 350,
    height: 350,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  icons: {
    color: Colors.GREEN,
    marginRight: 5,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    lineHeight: 16,
    color: Colors.GREEN,
    letterSpacing: 0.2,
  },
  btnMainDiv: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDiv: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.GREEN,
  },
  btnTxt: {
    color: Colors.WHITE,
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    letterSpacing: 1,
  },
});
