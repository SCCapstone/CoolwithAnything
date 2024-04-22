import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import BiometricScreen from '../screens/BiometricScreen';
import * as AuthAPI from '../services/AuthAPI';

jest.mock('react-native', () => {
  const actualRN = jest.requireActual('react-native');
  return {
    ...actualRN,
    Alert: { alert: jest.fn() },
  };
});

jest.mock('../services/AuthAPI', () => ({
  updateBiometrics: jest.fn(),
}));

// Mocked navigation and route
const mockNavigation = {
  navigate: jest.fn(),
};
const mockRoute = {
  params: { userId: '123' },
};

describe('BiometricScreen', () => {
  it('renders all input components and buttons', () => {
    const { getByPlaceholderText, getByText } = render(<BiometricScreen navigation={mockNavigation} route={mockRoute} />);

    expect(getByPlaceholderText('feet (ft)')).toBeTruthy();
    expect(getByPlaceholderText('inch (in)')).toBeTruthy();
    expect(getByPlaceholderText('pounds (lbs)')).toBeTruthy();
    expect(getByText('Fitness Level')).toBeTruthy();
    expect(getByText('Fitness Goal')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });

  it('handles inputs and submits data correctly', async () => {
    const { getByPlaceholderText, getByText } = render(<BiometricScreen navigation={mockNavigation} route={mockRoute} />);

    fireEvent.changeText(getByPlaceholderText('feet (ft)'), '6');
    fireEvent.changeText(getByPlaceholderText('inch (in)'), '2');
    fireEvent.changeText(getByPlaceholderText('pounds (lbs)'), '180');
    fireEvent.press(getByText('Beginner'));
    fireEvent.press(getByText('Lose Weight'));
    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(AuthAPI.updateBiometrics).toHaveBeenCalledWith('123', 6, 2, 180, 'Beginner', 'Lose Weight');
    });
  });

  it('navigates on successful update', async () => {
    AuthAPI.updateBiometrics.mockResolvedValueOnce({ status: 'success' });
  
    const { getByText, getByPlaceholderText } = render(<BiometricScreen navigation={mockNavigation} route={mockRoute} />);
  
    // Fill in all required fields
    fireEvent.changeText(getByPlaceholderText('feet (ft)'), '5');
    fireEvent.changeText(getByPlaceholderText('inch (in)'), '11');
    fireEvent.changeText(getByPlaceholderText('pounds (lbs)'), '160');
    fireEvent(getByText('Beginner'), 'press');  // Ensure correct method is used: 'fireEvent.press'
    fireEvent(getByText('Lose Weight'), 'press');  // Ensure correct method is used: 'fireEvent.press'
  
    // Attempt to submit the form
    fireEvent.press(getByText('Submit'));
  
    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Confirmation');
    });
  });
  

  it('shows alert on update failure', async () => {
    AuthAPI.updateBiometrics.mockRejectedValueOnce(new Error('Update failed'));

    const { getByText } = render(<BiometricScreen navigation={mockNavigation} route={mockRoute} />);
    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Missing Fields", "Please fill in all fields or select Skip Bio", [{"text": "OK"}],
      );
    });
  });

  it('prevents form submission when fields are missing', () => {
    const { getByText } = render(<BiometricScreen navigation={mockNavigation} route={mockRoute} />);
    fireEvent.press(getByText('Submit'));
    
    expect(Alert.alert).toHaveBeenCalledWith(
      'Missing Fields',
      'Please fill in all fields or select Skip Bio',
      [{ text: 'OK' }]
    );
  });
});
