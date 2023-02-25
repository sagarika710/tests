import {List} from 'react-native-paper';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import React, {useState, useEffect} from 'react';
import {Colors} from '../Theme/Color';
import Backbtn from '../Components/Backbtn';
import {apicaller} from '../Components/Api';
import {SafeAreaView} from 'react-native-safe-area-context';
const Faqs = () => {
  const [expanded, setExpanded] = React.useState(true);
  const [faqs, setFaqs] = useState([]);
  const handlePress = () => setExpanded(!expanded);
  const [msg, setMsg] = React.useState();
  React.useEffect(() => {
    data();
  }, []);
  function data() {
    apicaller('get-all-faqs', null, 'get', null)
      .then(res => {
        console.log(res.data.faq);
        setMsg(res.data.faq);
      })
      .catch(e => {
        console.log(e.value);
      });
  }

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.header}>
        <Backbtn />
        <Text style={styles.headertxt}>Faqs</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.listcontainer}>
          <List.Section style={styles.listsection}>
            {msg &&
              msg.map(e => {
                return (
                  <>
                    <List.Accordion style={styles.List} title={e.question}>
                      {/* <List.Item title="Lorem ipsum dolor sit amet. In magnam commodi id officia modi est odit reiciendis sed consequatur eligendi. Sit assumenda autem hic labore sapiente in dolorum nulla ut reprehenderit vero. Est quis iure est voluptatem voluptatem et obcaecati expedita ut nihil corrupti nam facere exercitationem eos magnam voluptatem." /> */}
                      <Text style={styles.ans}>{e.answer}</Text>
                    </List.Accordion>
                  </>
                );
              })}
          </List.Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Faqs;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
  },
  List: {
    backgroundColor: Colors.WHITE,
  },
  ans: {
    marginHorizontal: 15,
    color: Colors.DARKGREY,
    textAlign: 'justify',
  },
  faqs: {
    fontSize: 24,
  },
  listcontainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.GREY,

    padding: 3,
    marginTop: 10,
  },
  listsection: {
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  headertxt: {
    marginLeft: 15,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.5,
    color: Colors.Text_Black,
  },
});
