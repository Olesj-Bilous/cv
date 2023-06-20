import React from 'react';
import { render, screen } from '@testing-library/react';
import Cv from './Cv';

test('renders test hook', () => {
  render(<Cv />);
  const testHook = screen.getByText(/test hook/i);
  expect(testHook).toBeInTheDocument();
});
