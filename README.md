# CoolwithAnything

# Scheduler X App

This is an Android application aimed at helping users manage their fitness and nutrition goals. It's written in JavaScript using the React Native framework. The app allows users to manage workouts, meals, and track progress. It uses Firebase for cloud storage and user authentication.

## External Requirements

To get the app running on your local machine, you will need to install the following:

- [Node.js](https://nodejs.org/en/)
- [Android Studio](https://developer.android.com/studio)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

Here are the commands you can use for installation on a Unix-like system:

\```bash

# Install Node.js

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Android Studio from its official website and set it up

https://developer.android.com/studio

# Install Expo CLI

npm install -g expo-cli
\```

## Setup

1. Clone the repository.
2. Install the required npm packages:

```
npm install
```


## Running

To run the app in a local development environment:

```
expo start
```

This will open a QR code that you can scan using the Expo Go app on your Android device, or it will give you an option to run it on an Android emulator.

## Deployment

The app will be released for testing via a downloadable aab. To generate the aab:

```
eas build -p android
```

convert aab file to apks
```
bundletool build-apks --bundle=~/path/<name>.aab --output=~/path/<name>.apks \ --mode=universal \
```

build apk
```
unzip -p ~/path/<name>.apks universal.apk > ~/path/<name>.apk    
```

Follow the on-screen instructions to download the APK once it's generated.

## Code Style Guide

We follow the styling conventions enforced by [Prettier](https://prettier.io/). For more details on the specific rules, see the [Prettier Documentation](https://prettier.io/docs/en/index.html).


## Testing

### Testing Technology

We will be using Jest and Detox for automated testing.

### Running Behavioral Tests

To run the behavioral tests using Detox:

First run:

```
npx detox build -c android.debug
```

Start the emulator via the terminal

```
npx expo start
```

Open another terminal and run:

```
npx detox test -c android.debug
```

### Running Unit Tests
Unit test files located in the `./tests` directory

To run the unit tests, execute:

```
npm test
```

## Database Schema

Here is a simple schema for user information:

- `user_id` (string): Unique identifier for the user.
- `username` (string): User's username.
- `email` (string): User's email address.
- ...

## Workload Distribution

- Frontend: Ali Omer, Nick Rubino, Vu Nguyen
- Backend: Kayly Tran, Deep Patel

## Authors

- Ali Omer - omerar@email.sc.edu.com
- Nick Rubino - nrubino@email.sc.edu
- Vu Nguyen - nguyenviethoangvu95@gmail.com
- Kayly Tran - ktran7895@gmail.com
- Deep Patel - deepkalpana1@aol.com
