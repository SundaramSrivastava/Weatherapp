/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCloud} from '@fortawesome/free-solid-svg-icons/faCloud';
import {faSun} from '@fortawesome/free-solid-svg-icons/faSun';
import {faMoon} from '@fortawesome/free-solid-svg-icons/faMoon';
import {faCloudRain} from '@fortawesome/free-solid-svg-icons/faCloudRain';

const ICONS = {
  Clear: {
    day: faSun,
    night: faMoon,
  },
  Clouds: {
    day: faCloud,
    night: faCloud,
  },
  Rain: {
    day: faCloudRain,
    night: faCloudRain,
  },
};

const width = Dimensions.get('window').width;

function WeatherIcon({weather, time, isToday}) {
  let icon = ICONS[weather] ? ICONS[weather][time] : ICONS.Clear.night;

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: isToday ? 0  : 10,
      }}>
      <FontAwesomeIcon
        icon={icon}
        color={'#fff'}
        size={width < 400 ? 20 : 25}
      />
      <Text style={{color: '#fff', fontSize: width < 400 ? 15 : 20}}>
        {weather}
      </Text>
    </View>
  );
}

export default WeatherIcon;
