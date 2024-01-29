import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import * as AuthAPI from '../services/AuthAPI';
import { waitFor } from '@testing-library/react-native';

// Mock the navigation prop
const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock('react-native', () => {
  const actualRN = jest.requireActual('react-native');
  return {
    ...actualRN,
    Alert: { alert: jest.fn() },
  };
});

// Mock loginUser Function for Success and Failure Cases
jest.mock('../services/AuthAPI', () => ({
  loginUser: jest.fn(),
}));

// Test rendering of the LoginScreen component
test('renders correctly', () => {
  const { getByPlaceholderText } = render(<LoginScreen navigation={mockNavigation} />);
  expect(getByPlaceholderText('Email')).toBeTruthy();
  expect(getByPlaceholderText('Password')).toBeTruthy();
});

// Test that the login button shows an alert when pressed with empty fields
test('shows alert on empty fields', () => {
  const { getByText } = render(<LoginScreen navigation={mockNavigation} />);
  fireEvent.press(getByText('Login'));
  expect(Alert.alert).toHaveBeenCalledWith('Missing Fields', expect.anything(), expect.anything());
});

// Test successful login
test('navigates on successful login', async () => {
  AuthAPI.loginUser.mockResolvedValueOnce({ uid: '123' });
  
  const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={mockNavigation} />);
  
  fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
  fireEvent.changeText(getByPlaceholderText('Password'), 'password');
  fireEvent.press(getByText('Login'));

  await waitFor(() => {
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Home', { userID: '123' });
  });
});


// Test failed login
test('shows error on login failure', async () => {
  const errorMessage = 'Login failed';
  AuthAPI.loginUser.mockRejectedValueOnce(new Error(errorMessage));

  const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={mockNavigation} />);

  fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
  fireEvent.changeText(getByPlaceholderText('Password'), 'password');
  fireEvent.press(getByText('Login'));

  await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Login Error', errorMessage);
  });
});


