import React from 'react';
import { render } from '@testing-library/react';
import UniverseApp from './UniverseApp';

test('renders learn react link', () => {
  const { getByText } = render(<UniverseApp />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
