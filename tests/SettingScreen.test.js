import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SettingsScreen from '../screens/SettingsScreen';

// Mock Firebase and navigation
jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(() => ({
      currentUser: { uid: '123' },
      signOut: jest.fn().mockResolvedValue(),
    })),
  };
});

jest.mock('firebase/firestore', () => {
  return {
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
  };
});

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
      const { getByText, getByTestId } = render(<SettingsScreen />);
      fireEvent.press(getByTestId('tab-account'));
      expect(getByText('Account')).toBeTruthy();
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
      const updateUserProfile = require('../services/AuthAPI').updateUserProfile;
      const { getByTestId, getByPlaceholderText } = render(<SettingsScreen />);
      fireEvent.changeText(getByPlaceholderText('John'), 'Jane');
      fireEvent.press(getByTestId('save-button'));
  
      await waitFor(() => {
        expect(updateUserProfile).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
          firstName: 'Jane'
        }));
      });
    });
  
    it('logs out the user when the Sign Out button is pressed', () => {
      const { getByText } = render(<SettingsScreen />);
      fireEvent.press(getByText('Sign Out'));
      expect(getAuth().signOut).toHaveBeenCalled();
    });
  });
  