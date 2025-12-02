import React from 'react';
import { render, screen } from '@testing-library/react';
import { VisualGlobe } from '../VisualGlobe';

// Mock Globe to avoid rendering actual 3D canvas
jest.mock('react-globe.gl', () => () => <div data-testid="globe-mock" />);

import '@testing-library/jest-dom';

describe('VisualGlobe', () => {
  it('renders the container div with correct class', () => {
    const { container } = render(<VisualGlobe />);
    const containerDiv = container.getElementsByClassName('max-w-full')[0];
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toContainElement(screen.getByTestId('globe-mock'));
  });

  it('renders the Globe component', () => {
    render(<VisualGlobe />);
    expect(screen.getByTestId('globe-mock')).toBeInTheDocument();
  });
});
