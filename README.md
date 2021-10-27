![logo](https://raw.githubusercontent.com/hortsatta/mobile-employee-masterlist/master/android/app/src/main/res/mipmap-mdpi/ic_launcher.png)\
mobile-employee-masterlist
======================
A mobile Android app for the [employee-masterlist](https://github.com/hortsatta/employee-masterlist#readme).

Initialized in [Expo](https://github.com/expo/expo#readme) 43 and was ejected to further enable and implement additional features.

## Getting Started
Ensure that your machine is set up and ready for [React Native](https://reactnative.dev/docs/environment-setup) development. Using your favourite terminal:

1. Clone the repository
```bash
> git clone git@github.com:hortsatta/mobile-employee-masterlist.git
```
2. Navigate to project folder
```bash
> cd mobile-employee-masterlist
```
3. Install project dependencies
```bash
> npm install
```
4. Register and create a Firebase project. On your Firebase project, navigate to `Project Overview > Project settings`. Add a web app, copy the config and paste it in your project's `.env` file.
```bash
# Create an .env file on your root project folder, if it does not exist.
REACT_APP_FIREBASE_API_KEY=#apiKey
REACT_APP_FIREBASE_API_AUTH_DOMAIN=#authDomain
REACT_APP_FIREBASE_API_DATABASE_URL=#databaseURL
REACT_APP_FIREBASE_API_PROJECT_ID=#projectId
REACT_APP_FIREBASE_API_STORAGE_BUCKET=#storageBucket
REACT_APP_FIREBASE_API_MESSAGING_SENDER_ID=#messagingSenderId
REACT_APP_FIREBASE_API_APP_ID=#appId
REACT_APP_FIREBASE_API_MEASUREMENT_ID=#measurementId
```
5. Run project on your device or emulator
```bash
> npx react-native run-android

# OR generate an apk file

> cd ./android
> ./gradlew assembleDebug
```

## Compiled App
You can also download and try an unsigned apk file for Android located at the releases section.
