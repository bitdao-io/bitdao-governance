import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders DELEGATE VOTES title', () => {
  render(<App />);
  const linkElement = screen.getByText(/DELEGATE VOTES/i);
  expect(linkElement).toBeInTheDocument();
});
