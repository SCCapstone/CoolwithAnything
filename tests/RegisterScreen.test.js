import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterScreen from '../screens/RegisterScreen';
import { Alert } from 'react-native';
import * as AuthAPI from '../services/AuthAPI'; // Import the module

jest.mock('react-native', () => {
  const actualRN = jest.requireActual('react-native');
  return {
    ...actualRN,
    Alert: { alert: jest.fn() },
  };
});

jest.mock('../services/AuthAPI', () => ({
  registerUser: jest.fn(),
}));

describe('RegisterScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  // Mock data for successful registration
  const mockUserData = {
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '1234567890',
    dateOfBirth: '01-01-1990',
    password: 'password123',
    confirmPassword: 'password123'
  };

  // Helper function to fill in form fields
  const fillForm = (getByPlaceholderText) => {
    fireEvent.changeText(getByPlaceholderText('Email'), mockUserData.email);
    fireEvent.changeText(getByPlaceholderText('First Name'), mockUserData.firstName);
    fireEvent.changeText(getByPlaceholderText('Last Name'), mockUserData.lastName);
    fireEvent.changeText(getByPlaceholderText('Phone'), mockUserData.phone);
    fireEvent.changeText(getByPlaceholderText('Date of Birth'), mockUserData.dateOfBirth);
    fireEvent.changeText(getByPlaceholderText('Password'), mockUserData.password);
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), mockUserData.confirmPassword);
  };

  it('renders all input fields and the register button', () => {
    const { getByPlaceholderText, getByText } = render(<RegisterScreen navigation={mockNavigation} />);
    
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('First Name')).toBeTruthy();
    expect(getByPlaceholderText('Last Name')).toBeTruthy();
    expect(getByPlaceholderText('Phone')).toBeTruthy();
    expect(getByPlaceholderText('Date of Birth (MM-DD-YYYY)')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('shows alert on empty fields', () => {
    const { getByText } = render(<RegisterScreen navigation={mockNavigation} />);
    fireEvent.press(getByText('Register'));
    expect(Alert.alert).toHaveBeenCalledWith('Missing Fields', expect.anything(), expect.anything());
  });

  // ... Other tests for password mismatch, successful registration, and registration failure
});
