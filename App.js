/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CHANGE_CITY, MAIN_SCREEN} from './src/screens/ScreenNames';
import MainScreen from './src/screens/MainScreen';
import locationContext from './LocationContext';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import ChangeCity from './src/screens/ChangeCity';

const Stack = createNativeStackNavigator();

function requestPermission() {
  return new Promise((resolve, reject) => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Weather App',
        'message': 'Weather App wants access to your location '
      }
    )
    .then(data => {
      console.log("permission granted", data === PermissionsAndroid.RESULTS.GRANTED);
      if (data === PermissionsAndroid.RESULTS.GRANTED) {
        resolve(true)
      } else {
        reject(false)
      }
    })
  }) 
}

const App = () => {
  const [location, setLocation] = useState({lat: '', long: ''});
  useEffect(() => {
    requestPermission()
    .then(() => {
      Geolocation.getCurrentPosition(
        position => {
          setLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
            city: ''
          })
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    })
    .catch(err => alert('Please grant location access to get current weather details'))
  }, []);
  return (
    <locationContext.Provider value={{location, setLocation}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={MAIN_SCREEN} component={MainScreen} />
          <Stack.Screen name={CHANGE_CITY} component={ChangeCity} />
        </Stack.Navigator>
      </NavigationContainer>
    </locationContext.Provider>
  );
};

export default App;
