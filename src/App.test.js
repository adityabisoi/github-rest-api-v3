import { render } from '@testing-library/react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

test('renders header', () => {
  render(<Header />);
});

test('renders footer', () => {
  render(<Footer />);
});