import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterScreen from '../screens/RegisterScreen';
import { Alert, BackHandler } from 'react-native';
import * as AuthAPI from '../services/AuthAPI';

jest.mock('react-native', () => {
  const actualRN = jest.requireActual('react-native');
  return {
    ...actualRN,
    Alert: { alert: jest.fn() },
    BackHandler: { addEventListener: jest.fn(), removeEventListener: jest.fn() },
  };
});

jest.mock('../services/AuthAPI', () => ({
  registerUser: jest.fn(),
}));

describe('RegisterScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    reset: jest.fn(),
  };

  const mockUserData = {
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '1234567890',
    dateOfBirth: '01-01-1990',
    password: 'password123',
    confirmPassword: 'password123'
  };

  const fillForm = (queryByPlaceholderText) => {
    fireEvent.changeText(queryByPlaceholderText('Email'), mockUserData.email);
    fireEvent.changeText(queryByPlaceholderText('First Name'), mockUserData.firstName);
    fireEvent.changeText(queryByPlaceholderText('Last Name'), mockUserData.lastName);
    fireEvent.changeText(queryByPlaceholderText('Phone'), mockUserData.phone);
    fireEvent.changeText(queryByPlaceholderText('Date of Birth (MM-DD-YYYY)'), mockUserData.dateOfBirth);
    fireEvent.changeText(queryByPlaceholderText('Password'), mockUserData.password);
    fireEvent.changeText(queryByPlaceholderText('Confirm Password'), mockUserData.confirmPassword);
  };

  it('renders all input fields and the register button', () => {
    const { queryByPlaceholderText, queryByText } = render(<RegisterScreen navigation={mockNavigation} />);
    
    expect(queryByPlaceholderText('Email')).toBeTruthy();
    expect(queryByPlaceholderText('First Name')).toBeTruthy();
    expect(queryByPlaceholderText('Last Name')).toBeTruthy();
    expect(queryByPlaceholderText('Phone')).toBeTruthy();
    expect(queryByPlaceholderText('Date of Birth (MM-DD-YYYY)')).toBeTruthy();
    expect(queryByPlaceholderText('Password')).toBeTruthy();
    expect(queryByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(queryByText('Sign Up')).toBeTruthy();
  });

  it('shows alert on empty fields', () => {
    const { queryByText } = render(<RegisterScreen navigation={mockNavigation} />);
    fireEvent.press(queryByText('Sign Up'));
    expect(Alert.alert).toHaveBeenCalledWith('Missing Fields', expect.anything(), expect.anything());
  });

  it('shows alert on password mismatch', () => {
    const { queryByPlaceholderText, queryByText } = render(<RegisterScreen navigation={mockNavigation} />);
    
    // Fill in all fields first
    fireEvent.changeText(queryByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(queryByPlaceholderText('First Name'), 'John');
    fireEvent.changeText(queryByPlaceholderText('Last Name'), 'Doe');
    fireEvent.changeText(queryByPlaceholderText('Phone'), '1234567890');
    fireEvent.changeText(queryByPlaceholderText('Date of Birth (MM-DD-YYYY)'), '01-01-1990');
    fireEvent.changeText(queryByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(queryByPlaceholderText('Confirm Password'), 'differentPassword');
    
    fireEvent.press(queryByText('Sign Up'));
    
    expect(Alert.alert).toHaveBeenCalledWith('Passwords do not match', expect.anything(), expect.anything());
  });
  

  it('navigates on successful registration', async () => {
    AuthAPI.registerUser.mockResolvedValueOnce({ uid: '123' });
    const { queryByPlaceholderText, queryByText } = render(<RegisterScreen navigation={mockNavigation} />);
    fillForm(queryByPlaceholderText);
    fireEvent.press(queryByText('Sign Up'));
    await waitFor(() => {
      expect(mockNavigation.reset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: 'Biometric', params: { userId: '123' } }],
      });
    });
  });

  it('shows error on registration failure', async () => {
    const errorMessage = 'Registration failed';
    AuthAPI.registerUser.mockRejectedValueOnce(new Error(errorMessage));
    const { queryByPlaceholderText, queryByText } = render(<RegisterScreen navigation={mockNavigation} />);
    fillForm(queryByPlaceholderText);
    fireEvent.press(queryByText('Sign Up'));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Signup Failed', errorMessage);
    });
  });

  it('handles Android back button press', () => {
    render(<RegisterScreen navigation={mockNavigation} />);
    const backHandler = BackHandler.addEventListener.mock.calls.find(call => call[0] === 'hardwareBackPress')[1];
    expect(backHandler()).toBe(true);
  });
});
