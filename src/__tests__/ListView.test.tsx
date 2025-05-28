import { render, screen } from '@testing-library/react';
import ListView from '../components/ListView';

describe('ListView', () => {
  it('renders all items correctly', () => {
    const items = ['A', 'B', 'C'];
    render(
      <ListView items={items} renderListItem={(item) => <div>{item}</div>} />
    );

    const allItems = screen.getAllByText(/A|B|C/);
    expect(allItems.length).toBe(3);
  });
});
