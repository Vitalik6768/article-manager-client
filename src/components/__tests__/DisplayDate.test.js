import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DisplayDate from '../DisplayDate';

test('renders DisplayDate component', () => {
    //const dateDisplay = {month:""}
    render(<DisplayDate/>);
    const displayDate = screen.getByTestId('todo-1');
    expect(displayDate).toBeInTheDocument();
});