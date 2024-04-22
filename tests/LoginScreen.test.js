import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import * as AuthAPI from '../services/AuthAPI';

// Setup for the navigation mock
const mockNavigation = {
  navigate: jest.fn(),
};

// Mocking React Native's Alert module to check alert calls
jest.mock('react-native', () => {
  const actualRN = jest.requireActual('react-native');
  return {
    ...actualRN,
    Alert: { alert: jest.fn() },
  };
});

// Mocking the loginUser function to simulate both success and failure cases
jest.mock('../services/AuthAPI', () => ({
  loginUser: jest.fn(),
}));

describe('LoginScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders email and password inputs correctly', () => {
    const { getByTestId } = render(<LoginScreen navigation={mockNavigation} />);
    expect(getByTestId('login-username-input')).toBeTruthy();
    expect(getByTestId('login-password-input')).toBeTruthy();
  });

  test('displays alert when login button is pressed with empty fields', () => {
    const { getByTestId } = render(<LoginScreen navigation={mockNavigation} />);
    fireEvent.press(getByTestId('login-submit-button'));
    expect(Alert.alert).toHaveBeenCalledWith('Missing Fields', 'Please enter both email and password.', expect.anything());
  });

  test('navigates to the Home screen on successful login', async () => {
    AuthAPI.loginUser.mockResolvedValueOnce({ uid: '123' });
    const { getByTestId } = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByTestId('login-username-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('login-password-input'), 'password');
    fireEvent.press(getByTestId('login-submit-button'));

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Home', { userID: '123' });
    });
  });

  test('displays an error alert on login failure', async () => {
    const errorMessage = 'Login failed';
    AuthAPI.loginUser.mockRejectedValueOnce(new Error(errorMessage));
    const { getByTestId } = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByTestId('login-username-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('login-password-input'), 'password');
    fireEvent.press(getByTestId('login-submit-button'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Login Error', errorMessage);
    });
  });
});
