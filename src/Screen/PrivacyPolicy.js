import * as React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {apicaller} from '../Components/Api';
import Backbtn from '../Components/Backbtn';
import {Colors} from '../Theme/Color';

const PrivacyPolicy = ({navigation}) => {
  const [msg, setMsg] = React.useState();
  React.useEffect(() => {
    data();
  }, []);
  function data() {
    apicaller('get-terms', null, 'get', null)
      .then(res => {
        console.log(res.data.terms[0].description);
        setMsg(res.data.terms[0].description);
      })
      .catch(e => {
        console.log(e.value);
      });
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.backIconWithTxtMainDiv}>
          <Backbtn />
          <Text
            style={styles.privacyPolicyTxt}
            onPress={() => navigation.navigate('TermsAndCondition')}>
            Privacy Policy
          </Text>
        </View>
        <View>
          <Text style={styles.firstParaTxt}>{msg} </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 20,
  },
  backIconWithTxtMainDiv: {
    marginVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  privacyPolicyTxt: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: Colors.Text_Black,
    marginLeft: 15,
  },
  firstParaTxt: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.DARKGREY,
    marginBottom: 25,
    textAlign: 'justify',
  },
  secondParaTxt: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.DARKGREY,
    textAlign: 'justify',
  },
});

export default PrivacyPolicy;
