import { render, screen } from '@testing-library/react';
import ClassesGramaticais from '../../../Pages/Materias/Portugues/ClassesGramaticais';

test('renders learn react link', () => {
  render(<ClassesGramaticais />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});