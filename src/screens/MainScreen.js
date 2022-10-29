/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {
 Dimensions,
 StyleSheet,
 Text,
 TouchableOpacity,
 View,
 VirtualizedList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons/faChevronDown';
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons/faCalendarDays';
 
import locationContext from '../../LocationContext';
import WeatherIcon from '../components/wetherIcon';
import {CHANGE_CITY} from './ScreenNames';
import { APP_CONSTANTS } from '../../constants';
 
const DAY_ENUM = {
 1: 'MON',
 2: 'TUE',
 3: 'WED',
 4: 'THU',
 5: 'FRI',
 6: 'SAT',
 7: 'SUN',
};
 
const width = Dimensions.get('window').width;
 
function MainScreen({navigation}) {
 const {location, setLocation} = useContext(locationContext);
 const [city, setCity] = useState('');
 const [weather, setWeather] = useState([]);
 const [dateTime, setDateTime] = useState({
   date: new Date().getDate(),
   day: DAY_ENUM[new Date().getDay()],
   year: new Date().getFullYear(),
   time: new Date().getHours(),
 });
 
 useEffect(() => {
   if (location.lat !== '') {
     fetch(
       `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.long}&units=metric&appid=${APP_CONSTANTS.APP_ID}&exclude=current,minutely,hourly,alerts`,
     ).then(data => {
       return data.json()
     })
     .then(data => {
       console.log(data);
       let weather = data
 
       if (location.city !== '') {
         console.log(location);
         setCity(location.city);
         console.log('cccccccccciiiii', city);
       } else {
         setCity(weather.timezone);
       }
       setWeather(weather.daily);
     })
     .catch(err => {
       console.log(err);
       alert("Some network error occured")
     })
   }
 }, [location, setCity, setWeather, dateTime]);
 return (
   <LinearGradient colors={['#09dcd3', '#0fe6c6']}>
     <View style={styles.container}>
       <View style={[styles.flexColumn, {width: '80%'}]}>
         <View
           style={[
             styles.flexRow,
             {
               justifyContent: 'space-between',
               paddingRight: 10,
               alignItems: 'center',
             },
           ]}>
           <View style={[styles.flexColumn]}>
             <View>
               {console.log('dasdasdasasasas', width)}
               <Text
                 style={[
                   styles.textCommon,
                   {
                     fontSize: width < 400 ? 20 : 25,
                     fontWeight: 'bold',
                     marginTop: 5,
                   },
                 ]}>
                 Current Weather
               </Text>
             </View>
             <View>
               <TouchableOpacity
                 style={[
                   styles.flexRow,
                   {alignItems: 'center', marginVertical: 10},
                 ]}
                 onPress={() => {
                   navigation.navigate(CHANGE_CITY);
                 }}>
                 <Text
                   style={[
                     styles.textCommon,
                     {fontSize: width < 400 ? 15 : 20, marginRight: 5},
                   ]}>
                   {city}
                 </Text>
                 <FontAwesomeIcon icon={faChevronDown} color={'#fff'} />
               </TouchableOpacity>
             </View>
           </View>
           <View style={[styles.flexRow]}>
             <View>
               <Text
                 style={[
                   styles.textCommon,
                   {fontSize: width < 400 ? 25 : 30},
                 ]}>
                 {weather.length > 0
                   ? dateTime.time < 16
                     ? weather[0]?.temp.day
                     : weather[0]?.temp.night
                   : ''}
                 °
               </Text>
             </View>
             <View>
               <WeatherIcon
                 weather={
                   weather.length > 0 ? weather[0]?.weather[0]?.main : 'Clear'
                 }
                 time={dateTime.time > 16 ? 'night' : 'day'}
                 isToday
               />
             </View>
           </View>
         </View>
         <View style={[styles.flexRow, {marginVertical: 15}]}>
           {weather.length > 0 && (
             <>
               <WeatherIcon
                 weather={weather[1]?.weather[0]?.main}
                 time={'day'}
               />
               <WeatherIcon
                 weather={weather[2]?.weather[0]?.main}
                 time={'day'}
               />
               <WeatherIcon
                 weather={weather[3]?.weather[0]?.main}
                 time={'day'}
               />
               <WeatherIcon
                 weather={weather[4]?.weather[0]?.main}
                 time={'day'}
               />
               <WeatherIcon
                 weather={weather[5]?.weather[0]?.main}
                 time={'day'}
               />
             </>
           )}
         </View>
       </View>
       <View
         style={{
           width: '20%',
           alignItems: 'center',
           justifyContent: 'center',
         }}>
         <View style={{padding: 5, backgroundColor: '#fff', borderRadius: 10}}>
           <View style={[styles.flexRow, {justifyContent: 'space-between'}]}>
             <Text style={{fontSize: 20, color: '#23befc'}}>{dateTime.date}</Text>
             <View style={{padding: 3, borderRadius: 100, height: 30, width: 30, backgroundColor: '#23befc60', justifyContent: 'center', alignItems: 'center'}}>
               <FontAwesomeIcon icon={faCalendarDays} color={'#23befc'} />
             </View>
           </View>
           <Text style={{textTransform: 'capitalize', fontWeight: 'bold', color: '#000'}}>
             {dateTime.day}, {dateTime.year}
           </Text>
         </View>
       </View>
     </View>
   </LinearGradient>
 );
}
 
const styles = StyleSheet.create({
 container: {
   flexDirection: 'row',
   paddingHorizontal: 10,
   paddingVertical: 5,
 },
 flexColumn: {
   flexDirection: 'column',
 },
 flexRow: {
   flexDirection: 'row',
 },
 textCommon: {
   color: '#fff',
 },
});
 
export default MainScreen;
 

