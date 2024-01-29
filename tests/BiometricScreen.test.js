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
  it('renders all components', () => {
    const { getByPlaceholderText, getByText } = render(<BiometricScreen navigation={mockNavigation} route={mockRoute} />);

    expect(getByPlaceholderText('Height (ft)')).toBeTruthy();
    expect(getByPlaceholderText('Weight (lbs)')).toBeTruthy();
    expect(getByText('Fitness Level')).toBeTruthy();
    expect(getByText('Fitness Goal')).toBeTruthy();
    expect(getByText('Add Bio')).toBeTruthy(); // Corrected button text
  });

  it('handles inputs and submits data', async () => {
    const { getByPlaceholderText, getByText } = render(<BiometricScreen navigation={mockNavigation} route={mockRoute} />);

    fireEvent.changeText(getByPlaceholderText('Height (ft)'), '6');
    fireEvent.changeText(getByPlaceholderText('Weight (lbs)'), '180');
    fireEvent.press(getByText('Beginner'));
    fireEvent.press(getByText('Lose Weight'));
    fireEvent.press(getByText('Add Bio')); // Corrected button text

    expect(AuthAPI.updateBiometrics).toHaveBeenCalledWith(
      '123', '6', '180', 'Beginner', 'Lose Weight'
    );
  });

  it('navigates on successful update', async () => {
    AuthAPI.updateBiometrics.mockResolvedValueOnce({ status: 'success' });

    const { getByText } = render(<BiometricScreen navigation={mockNavigation} route={mockRoute} />);
    fireEvent.press(getByText('Add Bio')); // Corrected button text

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Confirmation');
    });
  });

  it('shows alert on update failure', async () => {
    AuthAPI.updateBiometrics.mockRejectedValueOnce(new Error('Update failed'));

    const { getByText } = render(<BiometricScreen navigation={mockNavigation} route={mockRoute} />);
    fireEvent.press(getByText('Add Bio')); // Corrected button text

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Update Failed', 
        'Update failed'
      );
    });
  });
});
