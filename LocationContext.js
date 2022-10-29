import {createContext} from 'react';

const locationContext = createContext({
  location: {lat: '', long: '', city: ''},
  setLocation: loc => {},
});

export default locationContext;
