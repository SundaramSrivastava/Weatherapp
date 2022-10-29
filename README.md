
# Weather App

Weather app brings the weather information about user's current location and also have capabilities to check weather information about any other location.


## Run Locally

Clone the project

```bash
  git clone https://github.com/SundaramSrivastava/Weatherapp.git
```

Go to the project directory

```bash
  cd Weatherapp
```

Install dependencies

```bash
  npm install && cd ios && pod install && cd ../
```

Create constant.js file in root directory and copy the below and add APP_ID

```bash
  export const APP_CONSTANTS = {
    APP_ID: 'xxxxxxxxx',
  };
```

Run it Locally on Android

```bash
  react-native run-android
```

