import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SettingsScreen from '../screens/SettingsScreen';
import { Alert } from "react-native";
import { updateUserProfile } from '../services/AuthAPI';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn().mockReturnValue({
    currentUser: { uid: '123' },
    signOut: jest.fn().mockResolvedValue(),
  })
}));

jest.mock("react-native/Libraries/Alert/Alert", () => ({
  alert: jest.fn(),
}));

jest.mock('react-native', () => {
  const actualRN = jest.requireActual('react-native');
  return {
    ...actualRN,
    Alert: {
      ...actualRN.Alert,
      alert: jest.fn(),
    },
  };
});

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(() => ({
    get: jest.fn(() => Promise.resolve({
      data: () => ({ firstName: 'John', lastName: 'Doe', phone_number: '1234567890' }),
    })),
  })),
  getDoc: jest.fn(() => Promise.resolve({
    exists: () => true,
    data: () => ({ firstName: 'John', lastName: 'Doe' })
  })),
}));

jest.mock('../services/AuthAPI', () => ({
  updateUserProfile: jest.fn(),
}));


jest.mock('@react-navigation/core', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

jest.mock('../services/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: jest.fn(),
  }),
}));

describe('SettingsScreen', () => {
  it('renders the initial active tab as Profile', () => {
    const { getByText } = render(<SettingsScreen />);
    expect(getByText('Profile')).toBeTruthy();
  });

  it('switches to Account tab when pressed', () => {
    const { getByTestId } = render(<SettingsScreen />);
    fireEvent.press(getByTestId('tab-account'));
    // Ensure you are asserting something meaningful in the 'Account' tab context
  });

  it('opens modal when Edit button is pressed in Profile tab', () => {
    const { getByTestId, getByText } = render(<SettingsScreen />);
    fireEvent.press(getByTestId('edit-button'));
    expect(getByText('Edit Profile Information')).toBeTruthy();
  });

  it('closes modal when Cancel button is pressed', () => {
    const { getByTestId, queryByText } = render(<SettingsScreen />);
    fireEvent.press(getByTestId('edit-button')); // Open modal
    fireEvent.press(getByTestId('cancel-button')); // Close modal
    expect(queryByText('Edit Profile Information')).toBeNull();
  });

  it('calls updateProfile when Save is pressed and fields are edited', async () => {
    const { getByTestId } = render(<SettingsScreen />);
    fireEvent.press(getByTestId('edit-button')); // Open modal
    fireEvent.changeText(getByTestId('first-name-input'), 'Jane');
    fireEvent.changeText(getByTestId('last-name-input'), 'Doe');
    fireEvent.press(getByTestId('save-button'));

    await waitFor(() => {
      expect(updateUserProfile).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        firstName: 'Jane'
      }));
    });
  });

  it("logs out the user when the Sign Out button is pressed and confirmed", async () => {
    const { getByText, getByTestId } = render(<SettingsScreen />);
    const getAuth = require("firebase/auth").getAuth;
  
    // Navigate to Account tab
    fireEvent.press(getByTestId("tab-account"));
    await waitFor(() => expect(getByText("Payment Methods")).toBeTruthy());
  
    // Press Sign Out button
    fireEvent.press(getByTestId("sign-out-button"));
  
    // Check if Alert.alert was called with the correct arguments
    expect(Alert.alert).toHaveBeenCalledWith(
      "Sign Out", // Title
      "Are you sure you would like to sign out?", // Message
      [
        {
          text: "Cancel",
          onPress: expect.any(Function),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: expect.any(Function)
        }
      ],
      { cancelable: false }
    );
  });
  
});
