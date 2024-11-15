/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GoTopButton from '../components/GoToTop';

describe('GoTopButton component', () => {
  test('renders and changes isActive state based on scroll position', () => {
    render(<GoTopButton />);

    const button = screen.getByRole('link');

    // Mock the initial scroll position to be at the top (button should be inactive)
    fireEvent.scroll(window, { target: { scrollY: 0 } });
    expect(button.classList.contains('go-top')).toBe(true);

    // Simulate scrolling down past 500px
    fireEvent.scroll(window, { target: { scrollY: 600 } });
    expect(button).toBeVisible();

    // Scroll back to the top and check again
    fireEvent.scroll(window, { target: { scrollY: 0 } });
    expect(button).toBeVisible();
  });
});
