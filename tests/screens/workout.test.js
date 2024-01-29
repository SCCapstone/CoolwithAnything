import React from 'react';
import { render, screen } from '@testing-library/react';

import WorkoutScreen from '../../screens/WorkoutScreen';

describe('<WorkoutScreen />', () => {
  it('renders correctly', () => {
    render(<WorkoutScreen />);
    // Use queries from @testing-library/react to assert on the rendered component
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
});