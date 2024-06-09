import React from 'react';
import { Routes, Route } from "react-router-dom";
import Menu from './components/Menu';
import Calculator from './components/Calculator';
import TicTacToe from './components/TicTacToe';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />}>
        {/* <Route index element={<Menu />} /> */}
        <Route path="calculator" element={<Calculator />} />
        <Route path="tic-tac-toe" element={<TicTacToe />} />
        <Route path="*" element={<Menu />} />
      </Route>
    </Routes>
  );
}

export default App;
