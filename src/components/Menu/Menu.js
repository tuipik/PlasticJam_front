import React from 'react'
import Navbar from 'react-bootstrap/lib/Navbar';
import NavLink from 'react-router-dom/es/NavLink';
import classes from './Menu.css'

const menu = () => (
    <Navbar className={classes.Menu}>
        <Navbar.Header>
            <Navbar.Brand>
                <NavLink to={{pathname: '/users'}}>Users</NavLink>
            </Navbar.Brand>
        </Navbar.Header>
    </Navbar>
);

// render(<Menu />);
export default menu