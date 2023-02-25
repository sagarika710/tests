import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  Alert,
  Image,
} from 'react-native';
import {Colors} from '../Theme/Color';
import Backbtn from '../Components/Backbtn';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {apicaller} from '../Components/Api';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import {useSelector} from 'react-redux';
import {getId} from '../Redux/slices/userSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
function OrderList({navigation}) {
  const [box, setBox] = useState('');
  const [orderhistory, setOrderhistory] = useState([]);
  const [test, setTest] = useState(1);
  const [testname, setTestname] = useState(1);
  const [status, setStatus] = useState(1);
  const user = useSelector(getId);
  const [pdfdata, setPdfdata] = useState();
  console.log(user);
  useEffect(() => {
    order();
  }, []);

  function order() {
    apicaller(`order-history/${user}`, null, 'get', null).then(res => {
      // apicaller(`order-history/6341628926941877dd9f5651`, null, 'get', null).then(
      //   res => {
      console.log('orderhistory', res.data);
      setOrderhistory(res.data);
    });
  }
  function incre(val) {
    for (let i = 1; i <= val; i++) {
      setTimeout(function timer() {
        setTest(i);
        console.log(i);
      }, i * 300);
    }
  }

  const htmlContent = `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Laboratory Report PDF</title>
        <!-- CSS only -->
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
          crossorigin="anonymous"
        />
        <!-- JavaScript Bundle with Popper -->
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
          crossorigin="anonymous"
        ></script>
    
        <style>
        #pdf1{
          display: flex;
          flex-direction: row;
          font-size: 0.8rem;
      }
      #pdf2{
          margin-left: 1rem;
      }
      #pdf3{
          display: flex;
          flex-direction: row;
          margin-top: 1.5rem;
          padding-left: 0.5rem;
          overflow: auto;
      
      }
      #pdf5{
          font-size: 0.85rem;
          font-weight: 700;
          border-bottom: 1px solid black;
          padding-bottom: 0.5rem;
          padding-left: 0.8rem;
          width: 10rem;
      }
      #pdf6{
          font-size: 1rem;
          font-weight: 700;
          padding-bottom: 0.5rem;
          border-bottom: 0.5px solid black;
          margin-top: 1.5rem;
          padding-left: 1rem;
          margin-bottom: 0.5rem;
      }
      #pdf7{
          font-size: 2rem;
          font-weight: 700;
          color: #1fbba1;
          border-bottom: 4px solid #1fbba1;
          padding-left: 1rem;
      }
      #pdf8{
          font-size: 0.8rem;
      }
      #pdf9{
          padding-left: 1rem;
          padding-top: 0.4rem;
      }
      #printpagebutton{
          margin-left: 1rem;
      }
      #pdf10{
          font-size: 0.75rem;
          font-weight: 700;
          padding-bottom: 0.5rem;
          padding-left: 0.8rem;
          width: 10rem;
      }
        </style>
      </head>
      <body>
      <div style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
      <div id="report">
        <div id="pdf7">LABORATORY &nbsp; REPORT</div>

        <div id="pdf6">Patient Information</div>
        <div id="pdf9">
          <Row id="rg5">
            <Col>
              <div id="rg7">
                <span id="rg6">Patient Name :</span>
                ${
                  pdfdata?.booking_for_other
                    ? pdfdata?.booking_for_other?.employe_user_name
                    : pdfdata?.user?.first_name + pdfdata?.user?.last_name
                }
              </div>
              <div id="rg7">
                <span id="rg6">Age/sex :</span>
                ${
                  pdfdata?.booking_for_other
                    ? new Date().getFullYear() -
                      new Date(
                        pdfdata?.booking_for_other?.employe_user_dob,
                      ).getFullYear()
                    : new Date().getFullYear() -
                      new Date(pdfdata?.user?.dob).getFullYear()
                }
                <span>
                  ${
                    pdfdata?.booking_for_other
                      ? pdfdata?.booking_for_other?.employe_user_gender
                      : pdfdata?.user?.gender
                  }
                </span>
              </div>
              <div id="rg7">
                <span id="rg6">Email :</span>
                ${
                  pdfdata?.booking_for_other
                    ? pdfdata?.booking_for_other?.employe_user_email
                    : pdfdata?.user?.email
                }
              </div>

              <div id="rg7">
                <span id="rg6">Organization : </span>
                ${
                  pdfdata?.user?.organization_name
                    ? pdfdata?.user?.organization_name
                    : 'N/A'
                }
              </div>
            </Col>
            <Col>
            
              <div id="rg7">
                <span id="rg6">Case No : </span>
                ${pdfdata?.case_number}
              </div>
              <div id="rg7">
                <span id="rg6">Booked on :</span>
                ${new Date(pdfdata?.createdAt)?.toLocaleString()}
              </div>
              <div id="rg7">
                <span id="rg6">Contact Number :</span>
                ${
                  pdfdata?.booking_for_other
                    ? pdfdata?.booking_for_other?.employe_user_phone
                    : pdfdata?.user?.phone_number
                }
              </div>
            </Col>
            <Col></Col>
          </Row>
        </div>

        <div>
          <div id="pdf6">Test (s) requested</div>
          <div id="pdf9">
            <div id="pdf8">${testname} </div>
          </div>
        </div>
        <div id="pdf6">Test Result : </div>
        <div id="pdf3">
          <div id="pdf5">Sl. No.</div>
          <div id="pdf5">Name</div>
          <div id="pdf5">Value</div>
        </div>
        <div>
            <div id="pdf3" key={i}>
              <div id="pdf10">     ${pdfdata?.gross_examination?.map(
                (item, i) => i + 1,
              )}</div>
              <div id="pdf10">  ${pdfdata?.gross_examination?.map(
                (item, i) => item.reportName,
              )}  </div>
              <div id="pdf10"> ${pdfdata?.gross_examination?.map(
                (item, i) => item.reportValue,
              )}</div>
            </div>
        </div>
      </div>
    </div>
      </body>
    </html>
    `;

  const askPermission = () => {
    async function requestExternalWritePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Pdf creator needs External Storage Write Permission',
            message: 'Pdf creator needs access to Storage data in your SD Card',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          createPDF();
        } else {
          alert('WRITE_EXTERNAL_STORAGE permission denied');
        }
      } catch (err) {
        alert('Write permission err', err);
        console.warn(err);
      }
    }
    if (Platform.OS === 'android') {
      requestExternalWritePermission();
    } else {
      createPDF();
    }
  };
  const createPDF = async () => {
    let options = {
      //Content to print
      html: htmlContent,
      //File Name
      fileName: 'my-test',
      //File directory
      directory: 'Download',

      base64: true,
    };

    let file = await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    Alert.alert(
      'Test Report',
      'Do you want to download report?',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () => openFile(file.filePath)},
      ],
      {cancelable: true},
    );
  };

  const openFile = filepath => {
    const path = filepath; // absolute-path-to-my-local-file.
    FileViewer.open(path)
      .then(() => {
        // success
        console.log('hgfd');
      })
      .catch(error => {
        // error
      });
  };
  console.log('pdfdata', testname);
  return (
    <SafeAreaView style={styles.Mainbox}>
      <View style={styles.header}>
        <Backbtn />
        <Text style={styles.headertxt}>My Orders</Text>
      </View>
      {console.log('orderhistory', orderhistory)}
      {orderhistory[0] == undefined && (
        <Text
          style={{
            textAlign: 'center',
            fontSize: 28,
            marginTop: 250,
            fontFamily: 'Poppins-Bold',
          }}>
          Order Not found
        </Text>
      )}
      <ScrollView>
        {orderhistory &&
          orderhistory.map(item => {
            function stat() {
              console.log(item.status);
              if (item.status == 'order confirmed') {
                setStatus(1);
                incre(1);
              }
              if (item.status == 'sample collected') {
                setStatus(5);
                incre(5);
              }
              if (item.status == 'test completed') {
                setStatus(10);
                incre(10);
              }
            }

            const getpdfdata = id => {
              apicaller(`report/${id}`, null, 'get', null)
                .then(res => {
                  setPdfdata(res.data);
                  console.log('response is ', res.data);
                })
                .catch(e => {
                  console.log(e);
                });
            };

            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setBox(item._id);
                    console.log(box);
                    getpdfdata(item._id);
                    setTestname(item?.lab_test_id?.test_name);
                    stat();
                  }}>
                  <View
                    style={[
                      styles.box,
                      {display: box == item._id ? 'none' : 'flex'},
                    ]}>
                    {item.pathology_id && (
                      <Text style={styles.pathoname}>
                        {item.pathology_id.lab_name}
                      </Text>
                    )}
                    <View style={styles.icons}>
                      <View style={styles.row}>
                        <EvilIcons name="clock" size={20} />
                        {item.order_id.booking_time && (
                          <Text style={styles.stxt}>
                            {item.order_id.booking_time}
                          </Text>
                        )}
                      </View>
                      <View style={styles.row}>
                        <EvilIcons name="calendar" size={20} />

                        <Text style={styles.stxt}>{item?.slot?.slot_date}</Text>
                      </View>
                    </View>

                    <View style={styles.line} />

                    {/* {item.lab_test_id?.map(data => {
                      return ( */}
                    <View style={[styles.test, {alignItems: 'flex-start'}]}>
                      <View style={[styles.row, {marginVertical: 5}]}>
                        <View style={styles.dot} />
                        <Text>{item?.lab_test_id?.test_name}</Text>
                      </View>
                    </View>
                    {/* );
                    })} */}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setBox('false');
                  }}>
                  <View
                    style={[
                      {display: box == item._id ? 'flex' : 'none'},
                      styles.box,
                    ]}>
                    {item.pathology_id && (
                      <Text style={styles.pathoname}>
                        {item.pathology_id.lab_name}
                      </Text>
                    )}
                    <View style={styles.icons}>
                      <View style={styles.row}>
                        <EvilIcons name="clock" size={20} />
                        {item.order_id.booking_time && (
                          <Text style={styles.stxt}>
                            {item.order_id.booking_time}
                          </Text>
                        )}
                      </View>
                      <View style={styles.row}>
                        <EvilIcons name="calendar" size={20} />

                        <Text style={styles.stxt}>{item?.slot?.slot_date}</Text>
                      </View>
                    </View>

                    <View style={styles.line} />

                    <View style={[styles.row, styles.test, {flexWrap: 'wrap'}]}>
                      {/* {item.lab_test_id?.map(data => {
                        return ( */}
                      <View style={styles.row}>
                        <View style={[styles.dot, {marginVertical: 10}]} />
                        <Text style={styles.testNames}>
                          {item?.lab_test_id?.test_name}
                        </Text>
                      </View>
                      {/* );
                      })} */}
                    </View>

                    <View style={styles.line} />
                    <View style={styles.order}>
                      <View
                        style={{
                          backgroundColor: Colors.DARKGREY,
                          width: 4,
                          height: 83,
                          position: 'absolute',
                          left: 3,
                          top: 5,
                        }}>
                        <View
                          style={{
                            backgroundColor: Colors.GREEN,
                            width: 4,
                            height: test * 10,
                          }}
                        />
                      </View>
                      <View style={styles.row}>
                        <View style={test >= 1 ? styles.dot : styles.dotgr} />
                        <Text
                          style={
                            test >= 1
                              ? styles.orderConfirmedTxt
                              : styles.orderTxt
                          }>
                          Order Confirmed
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <View style={test >= 5 ? styles.dot : styles.dotgr} />
                        <Text
                          style={
                            test >= 5
                              ? styles.orderConfirmedTxt
                              : styles.orderTxt
                          }>
                          Sample Collect
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <View style={test >= 9 ? styles.dot : styles.dotgr} />
                        <Text
                          style={
                            test >= 9
                              ? styles.orderConfirmedTxt
                              : styles.orderTxt
                          }>
                          Test Completed
                        </Text>
                      </View>
                    </View>
                    <View style={styles.line} />
                    <View>
                      <Text
                        style={[styles.text, {fontSize: 18, marginTop: 20}]}>
                        Payment Details
                      </Text>

                      {/* {item.lab_test_id.map(data => {
                        return ( */}
                      <View style={[styles.row, styles.type]}>
                        <Text style={styles.text}>
                          {item?.lab_test_id?.test_name}
                        </Text>
                        <Text style={styles.text}>
                          ${item?.lab_test_id?.discount_price}
                        </Text>
                      </View>
                      {/* );
                      })} */}

                      <View style={styles.line} />

                      <View style={[styles.row, styles.type]}>
                        <Text style={styles.text}>Total</Text>
                        <Text style={styles.text}>
                          ${item.order_id.final_price}
                        </Text>
                      </View>
                      <View style={[styles.row, styles.type]}>
                        <Text style={styles.text}>Taxes</Text>
                        <Text style={styles.text}>${item.order_id.gst}</Text>
                      </View>
                      <View style={styles.line} />
                      <View style={[styles.row, styles.type]}>
                        <Text style={styles.text}>Grand total</Text>
                        <Text style={styles.text}>
                          ${item.order_id.total_amount}
                        </Text>
                      </View>
                      {test >= 9 && (
                        <>
                          <View style={styles.line} />
                          <TouchableOpacity
                            style={styles.downloadbtn}
                            onPress={askPermission}>
                            <Feather
                              name="download"
                              size={20}
                              color={Colors.GREEN}
                            />
                            <Text style={styles.downloadbtntxt}>
                              Download Report
                            </Text>
                          </TouchableOpacity>
                          <View>
                            <Text style={[styles.text, {marginVertical: 10}]}>
                              Rate us
                            </Text>
                          </View>
                          <View style={styles.box}>
                            <CustomRatingBar
                              id={item._id}
                              rat={item.pathology_id.rating_avg}
                            />
                          </View>
                        </>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Mainbox: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  headertxt: {
    marginLeft: 15,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.5,
    color: Colors.Text_Black,
  },
  box: {
    borderWidth: 1,
    borderColor: Colors.GREY,
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
  },
  pathoname: {
    color: Colors.GREEN,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    letterSpacing: 1,
    marginBottom: 10,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  line: {
    borderColor: Colors.GREY,
    borderTopWidth: 1,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stxt: {
    marginLeft: 5,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: Colors.GREEN,
    borderRadius: 50,
    marginRight: 8,
  },
  dotgr: {
    height: 10,
    width: 10,
    backgroundColor: Colors.DARKGREY,
    borderRadius: 50,
    marginRight: 8,
  },
  testNames: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#717171',
  },

  orderTxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,

    color: Colors.DARKGREY,
  },
  orderConfirmedTxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.GREEN,
  },
  test: {
    justifyContent: 'space-between',
    marginVertical: 10,
    marginTop: 10,
  },
  order: {
    height: 100,
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'flex-start',
  },
  type: {
    justifyContent: 'space-between',
    marginVertical: 5,
    marginTop: 15,
  },
  text: {
    color: Colors.BLACK,
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  downloadbtn: {
    borderColor: Colors.GREY,
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  downloadbtntxt: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: Colors.GREEN,
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    color: '#000',
    fontFamily: 'Poppins-Regular',
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginTop: 15,
  },
  buttonStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
});
export default OrderList;
const CustomRatingBar = props => {
  // To set the default Star Selected
  const [defaultRating, setDefaultRating] = useState(props.rat);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const user = useSelector(getId);
  useEffect(() => {
    var axios = require('axios');
    var data = JSON.stringify({
      pathology_id: props.id,
      rating: defaultRating,
      review: 'test review',
      from_user: user,
    });

    var config = {
      method: 'post',
      url: 'https://api.novaprolabs.com/api/rating',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log(config);
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [defaultRating]);
  return (
    <SafeAreaView style={styles.customRatingBarStyle}>
      {maxRating.map((item, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            style={{marginHorizontal: 5}}
            onPress={() => setDefaultRating(item)}>
            {item <= defaultRating ? (
              <AntDesign name="star" size={20} color={Colors.GOLD} />
            ) : (
              <AntDesign name="staro" size={20} color={Colors.GOLD} />
            )}
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};
