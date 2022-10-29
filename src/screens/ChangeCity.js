/* eslint-disable prettier/prettier */
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View, VirtualizedList} from 'react-native';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { MAIN_SCREEN } from './ScreenNames';
import locationContext from '../../LocationContext';

const height = Dimensions.get('window').height

function ChangeCity({navigation}) {
  const [textValue, setTextValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [cityList, setCityList] = useState([]);
  const {location, setLocation} = useContext(locationContext)

  const fetchCity = () => {
    fetch(
      `http://52.73.146.184:3000/api/app/user/get-city-list?page=${currentPage}&search=${textValue}`,
    ).then(data => {
      let city = JSON.parse(data._bodyText).data.Record;
      setCityList(city);
    })
    .catch(err => {
      alert("Some network error occured")
    })
  };

  useEffect(() => {
    fetchCity();
    if(textValue.length === 0){
        setCurrentPage(1)
    }
  }, [textValue]);
  return (
    <View style={{backgroundColor: '#f8ffff', height: height, paddingHorizontal: 10, }}>
      <View style={{flexDirection: 'row', paddingVertical: 20, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => {
            navigation.navigate(MAIN_SCREEN)
        }} style={{paddingHorizontal: 0}}>
        <FontAwesomeIcon icon={faChevronLeft} size={20} color={'#000'} />
        </TouchableOpacity>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000'}}>Change City</Text>
      </View>
      <View>
        <TextInput
          value={textValue}
          onChangeText={value => {
            setTextValue(value);
          }}
          style={{borderColor: '#65cdff', borderWidth: 1, borderRadius: 10, backgroundColor: '#fff'}}
        />
        <VirtualizedList
        data={cityList}
        contentContainerStyle={{paddingHorizontal: 10,}}
        initialNumToRender={7}
        renderItem={({ item }) => {
            return(
                <TouchableOpacity style={{ borderBottomColor: '#000', borderBottomWidth: 1, paddingBottom: 10, marginTop: 10}} onPress={() => {
                    console.log(item.coord)
                    setTextValue(item.name)
                    setLocation({
                        lat: item.coord.lat,
                        long: item.coord.lon,
                        city: `${item.country}/${item.name}`
                    })
                    navigation.navigate(MAIN_SCREEN)
                }}>
                    <Text style={{fontSize: 23, fontWeight: '700'}}>{item.name}</Text>
                    <Text style={{fontSize: 15}}>{item.country}</Text>
                </TouchableOpacity>
            )
        }}
        onScrollEndDrag={() => {
            console.log("functiononnnnn");
            setCurrentPage(currentPage+1)
            fetchCity()
        }}
        keyExtractor={item => {item.name + item.country}}
        getItemCount={(data) => data.length}
        getItem={(item, index) => {
            return item[index]
        }}
        scrollEnabled={true}
        bounces={true}
        // onEndReached={setCurrentPage(currentPage+1)}
        />
      </View>
      {console.log('cittyyy', cityList)}
    </View>
  );
}

export default ChangeCity;
