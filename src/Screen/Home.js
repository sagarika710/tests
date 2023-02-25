import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import {Colors} from '../Theme/Color';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {apicaller} from '../Components/Api';
import {useSelector, useDispatch} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import {setLang, setLat} from '../Redux/slices/userSlice';

import {
  getCart,
  getFcmToken,
  getId,
  getLang,
  getLat,
  getLoactonof,
  getPathology_id,
  removedata,
  setCart,
  setLocationOf,
  setPathology_id,
  setLoc,
  getToken,
  gettoken,
} from '../Redux/slices/userSlice';
import Geocoder from 'react-native-geocoding';
import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

function Home({navigation}) {
  const dispatch = useDispatch();
  const Id = useSelector(getId);
  const [top, setTop] = React.useState('');
  const [data, setData] = React.useState([]);
  const [lab, setLab] = React.useState([]);
  const cartdata = useSelector(getCart);
  let lat = useSelector(getLat);
  let lang = useSelector(getLang);
  const [location, setLocation] = useState();
  const Token = useSelector(gettoken);
  React.useEffect(() => {
    banner();
    Toplab();
    Lab();
  }, [lat, lang]);
  function banner() {
    apicaller('get-advertisement', null, 'get', null).then(res => {
      console.log(res.data.Advertisement);
      setData(res.data.Advertisement);
    });
  }
  function Toplab() {
    apicaller(
      //  'top-rated-pathology?longitude=85.8437679&latitude=20.2668516',
      `top-rated-pathology?longitude=${lang}&latitude=${lat}`,
      null,
      'get',
      null,
    ).then(res => {
      console.log(res.data.pathology);
      setTop(res.data.pathology);
    });
  }
  function Lab() {
    apicaller(
      // `near-by-pathology?longitude=73.856743&latitude=18.520430`,
      `near-by-pathology?longitude=${lang}&latitude=${lat}`,
      null,
      'get',
      null,
    ).then(res => {
      console.log(res.data.pathology);
      setLab(res.data.pathology);
    });
  }
  Geocoder.init('AIzaSyAYc0uNa8aaNiX_aL6GZaAzX-S1SiUK6ZY');
  Geocoder.from({
    latitude: lat,
    longitude: lang,
  })
    .then(json => {
      var addressComponent = json.results[2].formatted_address;
      console.log(addressComponent);

      dispatch(setLocationOf(addressComponent, 1));
    })
    .catch(error => console.warn(error));
  let names = useSelector(getLoactonof);

  const fcmToken = useSelector(getFcmToken);
  const sendNotification = () => {
    var axios = require('axios');
    var data = JSON.stringify({
      fcmTokenId: fcmToken,
      // 'c-391N6ATcGTcrqlrh4wxd:APA91bHYaXbFqlIiivildIALweDW7USffTp7IXvB4uNWRDZ_9VRycTqO-AlH3E81lMaGQN2dnbtyrZksYsoUYirSv1xobTWrY1C_8EW2-6e_Nub8KkvKJLei5qrXS4wQe_njPM_WDBRy',
      imageUrl:
        'https://images.pexels.com/photos/13095218/pexels-photo-13095218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    });

    var config = {
      method: 'post',
      url: 'https://api.novaprolabs.com/api/ordernotification',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   requestLoc();
  // }, []);
  // const requestLoc = async () => {
  //   console.log('requestLoc');
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Letz Play',
  //         message: 'Letz play is asking for your permission to access location',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('Location granted');
  //       //  alert('Location granted');
  //       getlocdata();
  //     } else {
  //       console.log('location failed');
  //       //  alert('Location permission not granted');
  //     }
  //   } catch (e) {
  //     console.error('location error', e);
  //   }
  // };
  useEffect(() => {
    if (!names) {
      navigation.navigate('NovaLocationScreen');
    }
  }, []);
  // function getlocdata() {
  //   console.log('position', Geolocation.getCurrentPosition);
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       console.log(position);

  //       setLocation({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //       dispatch(setLat(position.coords.latitude));
  //       dispatch(setLang(position.coords.longitude));
  //       // dispatch(
  //       //   setLoc({
  //       //     latitude: position.coords.latitude,
  //       //     longitude: position.coords.longitude,
  //       //   }),
  //       // );
  //     },
  //     error => {
  //       console.log(error.code, error.message);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 15000,
  //       maximumAge: 10000,
  //     },
  //   );
  // }

  function home() {
    var data = JSON.stringify({
      current_longitude: location.latitude,
      current_latitiude: location.longitude,
      _id: Id,
    });
    apicaller('location', data, 'put', `Bearer ${Token}`)
      .then(res => {
        props.navigation.navigate('Tab');
      })
      .catch(e => {
        console.log(e.value);
      });
  }

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

  return (
    <SafeAreaView style={styles.Mainbox}>
      <View style={{padding: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LocationSearch')}
            style={styles.locationsearch}>
            <View style={styles.Button}>
              <Feather name="navigation" color={Colors.GREEN} size={20} />
            </View>
            {names && (
              <Text style={styles.locationname}>
                {names.length < 24
                  ? `${names}`
                  : `${names.substring(0, 24)}...`}
              </Text>
            )}
            <Feather name="chevron-down" color={Colors.GREEN} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart', {from: 'lab'})}
            style={{justifyContent: 'flex-end', marginBottom: 10}}>
            <Feather name="shopping-bag" color={Colors.GREEN} size={25} />
            <View
              style={{
                backgroundColor: Colors.Faded_Green,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
                height: 20,
                width: 20,
                position: 'absolute',
                bottom: -13,
                left: 3,
              }}>
              {cartdata != null ? (
                <Text style={{fontWeight: 'bold'}}>{cartdata.length}</Text>
              ) : (
                <Text style={{fontWeight: 'bold'}}>0</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.searchpatholabs}
          onPress={() => navigation.navigate('NovaSearchPatholab')}>
          <Feather name="search" color={Colors.GREEN} size={25} />
          <Text style={styles.search}>Search Patholabs & Tests....</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{marginLeft: 10, marginVertical: 5}}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {data &&
              data.map(e => {
                return (
                  <View style={styles.imageview}>
                    <Image style={styles.image} source={{uri: e.image}} />
                  </View>
                );
              })}
          </ScrollView>
        </View>
        <View style={{marginLeft: 10}}>
          <Text style={[styles.heading, {marginLeft: 10}]}>Top Rated Labs</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {top &&
              top.map(e => {
                console.log('lab_namelab_name', e.lab_name);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('PatholabDetails', {id: e._id});
                      dispatch(setPathology_id(e._id));
                    }}
                    style={styles.patholabimageview}>
                    {e.lab_img[0] && (
                      <Image
                        style={styles.patholabimage}
                        source={{uri: e.lab_img[0].img}}
                      />
                    )}
                    <Text
                      style={{
                        color: Colors.GREEN,
                        marginTop: 10,
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}>
                      {e?.lab_name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
        {/* <View style={{ marginHorizontal: 20 }}> */}
        <Text style={[styles.heading]}>Nearest Labs</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginHorizontal: 20}}>
          {lab &&
            lab.map(e => {
              return <Listed data={e} />;
            })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
    // </View>
  );
}
const styles = StyleSheet.create({
  Mainbox: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  locationsearch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  locationname: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: Colors.GREEN,
    marginLeft: 10,
  },
  Button: {
    width: 40,
    height: 40,
    backgroundColor: Colors.Faded_Green,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchpatholabs: {
    height: 55,
    borderColor: Colors.DustyGrey,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 20,
  },
  search: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.BLACK,
  },
  imageview: {
    height: 130,
    width: 300,
    marginLeft: 10,
    borderRadius: 15,
  },
  image: {
    width: 300,
    height: 130,
    borderRadius: 15,
  },
  heading: {
    marginVertical: 15,
    marginHorizontal: 20,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.3,
    color: Colors.Text_Black,
  },
  patholabimageview: {
    width: 150,
    marginLeft: 10,
    borderRadius: 15,
    justifyContent: 'flex-end',
  },
  patholabimage: {
    width: 150,
    height: 120,
    borderRadius: 15,
  },
  pathalablist: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.GREY,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    padding: 10,
    marginBottom: 10,
  },
  img: {
    borderRadius: 20,
    width: 130,
    height: 100,
  },
  name: {
    color: Colors.GREEN,
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginBottom: 5,
  },
  add: {
    color: Colors.BLACK,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginVertical: 2,
  },
  star: {
    margin: 4,
  },
});

export default Home;
const Listed = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log(props);

  const [addofset, setAddofset] = useState('');

  if (props.data.location.coordinates) {
    Geocoder.from({
      latitude: props.data.location.coordinates[1],
      longitude: props.data.location.coordinates[0],
    }).then(json => {
      var addressComponent = json.results[1].formatted_address;
      console.log(addressComponent);
      setAddofset(addressComponent);
    });
  }
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PatholabDetails', {id: props.data._id});
        dispatch(setPathology_id(props.data._id));
      }}
      style={styles.pathalablist}>
      {props.data.lab_img[0] && (
        <Image style={styles.img} source={{uri: props.data.lab_img[0].img}} />
      )}
      <View style={{marginLeft: 10}}>
        <Text style={styles.name}>{props.data.lab_name}</Text>
        <Text style={[styles.add, {paddingRight: 20}]}>
          {props.data.address.substring(0, 30)}...
        </Text>
        <Text style={styles.add}>
          Timings : {props.data.time_start} - {props.data.time_end}
        </Text>
        {props.data.rating_avg && (
          <View style={{flexDirection: 'row'}}>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={14}
              onFinishRating={this.ratingCompleted}
              startingValue={props.data.rating_avg}
              readonly={true}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
