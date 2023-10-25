# CoolwithAnything

# Fitness and Nutrition App

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

# Install Expo CLI

npm install -g expo-cli
\```

## Setup

1. Clone the repository.
2. Install the required npm packages:

\```bash
npm install
\```

3. Make sure you set up Firebase and add your Firebase config in the appropriate file.

## Running

To run the app in a local development environment:

\```bash
expo start
\```

This will open a QR code that you can scan using the Expo Go app on your Android device, or it will give you an option to run it on an Android emulator.

## Deployment

The app will be released for testing via a downloadable APK. To generate the APK:

\```bash
expo build:android -t apk
\```

Follow the on-screen instructions to download the APK once it's generated.

## Testing

### Testing Technology

We will be using Jest for automated testing.

### Running Tests

To run the unit tests, execute:

\```bash
npm test
\```

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
- Vu Nguyen - vu.nguyen@email.com
- Kayly Tran - kayly.tran@email.com
- Deep Patel - deep.patel@email.com
