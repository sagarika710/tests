import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../Theme/Color';
import Backbtn from '../Components/Backbtn';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const NovaSearchPatholabs = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.novaprolabs.com/api/near-by-pathology?longitude=73.856743&latitude=18.520430',
    )
      .then(response => response.json())

      .then(responseJson => {
        console.log(responseJson.pathology);
        setFilteredDataSource(responseJson.pathology);
        setMasterDataSource(responseJson.pathology);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.lab_name
          ? item.lab_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.lab_name.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          // width: '50%',
          backgroundColor: Colors.GREY,
          marginHorizontal: 25,
        }}
      />
    );
  };

  const getItem = item => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.lab_name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.BackbtnView}>
          <Backbtn />
        </View>

        <View style={styles.searchWrapperStyle}>
          <Feather name="search" size={18} style={styles.iconStyle} />
          <TextInput
            style={styles.searchInputStyle}
            placeholder="Search Patholabs"
            placeholderTextColor="#000"
            onChangeText={text => searchFilterFunction(text)}
            onClear={text => searchFilterFunction('')}
          />
        </View>
        {search.length > 1 && (
          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    marginVertical: 5,
                    marginHorizontal: 15,
                  }}
                  onPress={() => {
                    // console.log(item);
                    navigation.navigate('PatholabDetails', {id: item._id});
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      //justifyContent: 'center',
                      marginBottom: 10,
                      marginTop: 20,
                      paddingHorizontal: 5,
                    }}>
                    <Feather
                      name="search"
                      size={18}
                      style={styles.serachIcon}
                    />
                    <Text style={styles.locationTitle}>{item.lab_name}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
  },
  itemStyle: {
    padding: 10,
  },
  SafeAreaViewContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  BackbtnView: {
    marginVertical: 30,
    marginHorizontal: 10,
  },
  searchWrapperStyle: {
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 15,
    padding: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  searchInputStyle: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: 0,
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
  iconStyle: {
    marginTop: 12,
    marginHorizontal: 8,
    color: Colors.GREEN,
  },
  serachIcon: {
    marginRight: 10,
    color: Colors.GREEN,
  },
  locationTitle: {
    color: Colors.GREEN,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
});

export default NovaSearchPatholabs;
