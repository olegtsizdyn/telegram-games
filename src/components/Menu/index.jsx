import React from 'react';
import { Link, Outlet } from "react-router-dom";
import './styles.css';

const Menu = () => {
  return (
    <>
      <nav>
        <ul className='ul'>
          <li className='li'>
            <Link to="/calculator">Calculator</Link>
          </li>
          <li className='li'>
            <Link to="/tic-tac-toe">Tic-Tac-Toe</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Menu;