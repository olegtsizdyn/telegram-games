import React, { useState, useRef, useEffect } from 'react';
import './styles.css';

const TicTacToe = () => {
  const [state, setState] = useState({
    isWinner: false,
    userClick: 0,
    computerClick: 0,
    isPlayerTurn: true,
    tieGames: 0,
    computerWin: 0,
    playerWin: 0,
    isClickable: true,
  });

  const refs = useRef([]);

  const handleClick = (index) => {
    if (!state.isClickable) {
      return;
    }

    if (refs.current[index].className.length > 0) {
      return;
    }

    if (state.isWinner) {
      return;
    }

    refs.current[index].className = "x";
    refs.current[index].classList.add('x');
    checkForWinner();
    setState((prevState) => ({
      ...prevState,
      userClick: prevState.userClick + 1,
      isClickable: false,
    }));
    setTimeout(() => {
      computerTurn();
    }, 1000);
  };

  const resetGame = () => {
    for (let i = 1; i <= 9; i++) {
      refs.current[i].classList = "";
    }

    setState((prevState) => ({
      ...prevState,
      userClick: 0,
      computerClick: 0,
      isWinner: false,
      isClickable: true,
    }));
  };

  const computerTurn = () => {
    if (state.isWinner) {
      return;
    }

    let notBlueOrRed = [];
    let isAvailable = false;
    for (let i = 1; i <= 9; i++) {
      if (refs.current[i].className.length === 0) {
        notBlueOrRed.push(i);
        isAvailable = true;
      }
    }

    if (isAvailable) {
      setTimeout(() => {
        const randomItem = notBlueOrRed[Math.floor(Math.random() * notBlueOrRed.length)];
        refs.current[randomItem].className = "o";
        refs.current[randomItem].classList.add('o');
        checkForWinner();
        setState((prevState) => ({
          ...prevState,
          computerClick: prevState.computerClick + 1,
          isClickable: true,
        }));
      }, 1000);
    } else {
      if (!state.isWinner) {
        setState((prevState) => ({
          ...prevState,
          tieGames: prevState.tieGames + 1,
        }));
        setTimeout(() => {
          resetGame();
        }, 2000);
      }
    }
  };

  const checkForWinner = () => {
    const combinationCollection = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    combinationCollection.forEach((data) => {
      if (
        refs.current[data[0]].className &&
        refs.current[data[1]].className &&
        refs.current[data[2]].className &&
        refs.current[data[0]].className.toLowerCase() === refs.current[data[1]].className.toLowerCase() &&
        refs.current[data[1]].className.toLowerCase() === refs.current[data[2]].className.toLowerCase() &&
        refs.current[data[2]].className.toLowerCase() === refs.current[data[0]].className.toLowerCase()
      ) {
        setState((prevState) => ({
          ...prevState,
          isWinner: true,
          isUserWinnder: refs.current[data[0]].className === "x",
          playerWin: refs.current[data[0]].className === "x" ? prevState.playerWin + 1 : prevState.playerWin,
          computerWin: refs.current[data[0]].className === "o" ? prevState.computerWin + 1 : prevState.computerWin,
        }));
        refs.current[data[0]].classList.add('blink');
        refs.current[data[1]].classList.add('blink');
        refs.current[data[2]].classList.add('blink');
        setTimeout(() => {
          resetGame();
        }, 2000);
      }
    });
  };

  return (
    <div className="App">
      <div className="game">
        <div className="board">
          {[...Array(9).keys()].map((i) => (
            <div
              key={i}
              onClick={() => handleClick(i + 1)}
              className={`square ${i < 3 ? 'top' : ''} ${i % 3 === 0 ? 'left' : ''} ${i % 3 === 2 ? 'right' : ''} ${i >= 6 ? 'bottom' : ''}`}
            >
              <div ref={(el) => (refs.current[i + 1] = el)}></div>
            </div>
          ))}
        </div>
      </div>
      <div className="scores p1">
        <p className="player1">
          <span className="p1">Player</span>
          <span className="p2">Player 1</span> (<span className="x"></span>)
          <span className="score">{state.playerWin}</span>
        </p>
        <p className="ties">Tie<span className="score">{state.tieGames}</span></p>
        <p className="player2">
          <span className="p1">Computer</span>
          <span className="p2">Player 2</span> (<span className="o"></span>)
          <span className="score">{state.computerWin}</span>
        </p>
      </div>
    </div>
  );
};

export default TicTacToe;
