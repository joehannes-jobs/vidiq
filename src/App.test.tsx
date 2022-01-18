import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello VidIQ!/i);
  expect(linkElement).toBeInTheDocument();
});
