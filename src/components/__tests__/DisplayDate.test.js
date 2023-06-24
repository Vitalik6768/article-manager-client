import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DisplayDate from '../DisplayDate';
import DashBordNew from '../DashBordNew';
import { BrowserRouter } from 'react-router-dom';


import NavBarNew from '../NavBarNew';

test('renders DisplayDate component', () => {
    //const dateDisplay = {month:""}
    render(<DisplayDate />);
    const displayDate = screen.getByTestId('todo-1');
    expect(displayDate).toBeInTheDocument();
});

test('renders Navebar component', () => {
    //const dateDisplay = {month:""}
    render(

        <BrowserRouter>
            <NavBarNew />
        </BrowserRouter>
    );
    const navbar = screen.getByTestId('NavBarNew');
    expect(navbar).toBeInTheDocument();
});

test('renders DashBordNew component', () => {
    render(<DashBordNew />);

    const item1 = screen.getByTestId('item1');
    const item2 = screen.getByTestId('item2');
    const item3 = screen.getByTestId('item3');
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();

  
 
  });