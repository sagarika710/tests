import {React, useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Backbtn from '../Components/Backbtn';
import Mainbtn from '../Components/Mainbtn';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PatholabDetailsComponent from '../Components/PatholabDetailsComp';
import {Colors} from '../Theme/Color';
import {apicaller} from '../Components/Api';
import {useSelector, useDispatch} from 'react-redux';
import {getCart, gettoken, setPathology_id} from '../Redux/slices/userSlice';
import {Rating} from 'react-native-ratings';

const PatholabDetails = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [pathoid, setPathoid] = useState([]);
  const Token = useSelector(gettoken);
  const dispatch = useDispatch();
  const cartdata = useSelector(getCart);
  useEffect(() => {
    Lab();
  }, []);
  function Lab() {
    apicaller(`pathology/${id}`, null, 'get', null).then(res => {
      dispatch(setPathology_id(res.data.pathology._id));
      console.log(res.data.pathology._id);
      setData(res.data.pathology);

      setPathoid(res.data.test_category_id);
    });
  }
  const [modalVisible, setModalVisible] = useState(false);
  const {id} = route.params;
  console.log('sagarika', id);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* upper div */}
        <LinearGradient
          colors={[Colors.LightBlue, Colors.LightGreen]}
          start={{x: 0.5, y: 1}}
          end={{x: 1, y: 0}}
          style={styles.upperDiv}>
          <View style={styles.backIconDiv}>
            <Backbtn />
          </View>
        </LinearGradient>

        {/* image div */}

        <View style={styles.lifeCarePathologyLabImgMainDiv}>
          <View style={styles.lifeCarePathologyLabImgDiv}>
            {data.lab_img != undefined && data.lab_img[0] && (
              <Image
                source={{uri: data.lab_img[0].img}}
                style={styles.lifeCarePathologyLabImg}
              />
            )}
          </View>
        </View>

        {/* Long life pathology div  */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.longLifePathologyDiv}>
            <Text style={styles.longLifePathologyTxt}>{data.lab_name}</Text>
            <Text style={styles.patiaTxt}>{data.address}</Text>
            <Text style={styles.timingsTxt}>
              Timings : {data.time_start} - {data.time_end}
            </Text>
            <View style={styles.starIconDiv}>
              {data.rating_avg && (
                <View style={{flexDirection: 'row'}}>
                  <Rating
                    type="star"
                    ratingCount={5}
                    imageSize={14}
                    onFinishRating={this.ratingCompleted}
                    startingValue={data.rating_avg}
                    readonly={true}
                  />
                </View>
              )}
            </View>
            <Text style={styles.aboutLongLifePathologyTxt}>
              {data.description}
            </Text>
          </View>

          {/* our available test  */}
          {pathoid ? (
            <>
              <View style={styles.ourAvailableTestDiv}>
                <Text style={styles.ourAvailableTestTxt}>
                  Our Available Test
                </Text>
              </View>

              {/* all tests */}
              {console.log(data.test_category_id)}
              {pathoid &&
                pathoid.map(e => {
                  return (
                    <>
                      <Text style={styles.mainTestNameTxt}>
                        {e.category_name}
                      </Text>
                      <PatholabDetailsComponent
                        datas={e}
                        labname={data.lab_name}
                      />
                    </>
                  );
                })}
            </>
          ) : (
            <Text style={[styles.ourAvailableTestTxt, {alignSelf: 'center'}]}>
              No Available Test
            </Text>
          )}
        </ScrollView>
      </ScrollView>
      {/* button */}
      <TouchableOpacity
        disabled={cartdata != null && cartdata.length != 0 ? false : true}
        onPress={() => navigation.navigate('Cart', {from: 'lab'})}
        style={styles.bookASlotBtnDiv}>
        <Mainbtn
          disable={cartdata != null && cartdata.length != 0 ? false : true}
          titel="Add To Cart"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },

  // upper div
  upperDiv: {
    borderBottomRightRadius: 150,
    height: 350,
  },
  backIconDiv: {
    marginVertical: 40,
    marginHorizontal: 25,
  },

  // image div
  lifeCarePathologyLabImgMainDiv: {
    alignItems: 'center',
    marginBottom: 50,
  },
  lifeCarePathologyLabImgDiv: {
    width: '90%',
    height: 270,
    borderRadius: 20,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 6,
    position: 'absolute',
    top: -250,
  },
  lifeCarePathologyLabImg: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },

  // Long life pathology div
  longLifePathologyDiv: {
    paddingHorizontal: 20,
  },
  longLifePathologyTxt: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: Colors.GREEN,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  patiaTxt: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.Text_Black,
  },
  timingsTxt: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.Text_Black,
  },
  starIconDiv: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  startIcon: {
    marginRight: 5,
  },
  aboutLongLifePathologyTxt: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.DustyGrey,
    textAlign: 'left',
  },
  aboutAndSeeMoreTxtRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeMoreTxt: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.GREEN,
    marginLeft: 5,
  },

  // our available test
  ourAvailableTestDiv: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  ourAvailableTestTxt: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.BLACK,
    fontWeight: 'bold',
  },

  // btn
  bookASlotBtnDiv: {
    marginVertical: 10,
    marginHorizontal: 20,
  },

  // Modal
  modalMainDiv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.FadedBlack_Modal,
  },
  modalDiv: {
    width: Dimensions.get('screen').width * 0.85,
    margin: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  informationTxt: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: Colors.BLACK,
    marginVertical: 25,
  },
  bloodTestTxt: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: Colors.GREEN,
    marginVertical: 10,
  },
  noFastingRequiredTxt: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: Colors.BLACK,
    marginBottom: 5,
  },
  okayBtn: {
    width: 140,
    height: 33,
    backgroundColor: Colors.GREEN,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  okayBtnTxt: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: Colors.WHITE,
  },
  mainTestNameTxt: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: Colors.GREEN,
    marginHorizontal: 20,
    marginBottom: 10,
  },
});

export default PatholabDetails;
