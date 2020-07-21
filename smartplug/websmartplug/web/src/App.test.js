import React from 'react';
import { render } from '@testing-library/react';
import Validation from './Validation';

test('renders learn react link', () => {
  const { getByText } = render(<Validation />);
  const linkElement = getByText("Number Of SmartPlug:");
  expect(linkElement).toBeInTheDocument();
});
