import { screen, render } from '@testing-library/react';
import App from './App';

describe('App tests', () => {
  it('should render the button', () => {
    render(<App />);

    expect(screen.getByRole('button')).toBeDefined();
  });
});
