import { render, screen } from '@testing-library/react';
import Page404 from '../pages/Page404';

describe('Page404 Component', () => {
  test('renders 404 message', () => {
    render(<Page404 />);
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  test('displays invalid URL message', () => {
    render(<Page404 />);
    expect(screen.getByText(/invalid url/i)).toBeInTheDocument();
  });
});
