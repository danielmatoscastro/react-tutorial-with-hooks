import React, { useState } from 'react';
import styled from 'styled-components';
import calculateWinner from '../calculateWinner';
import Board from './Board';
import GameInfo from './GameInfo';

const StyledGame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 150px auto 0;

  & .game-board {
    width: min(100%, 300px);
    margin: 0 auto;
  }

  & .game-game-info {
    width: min(100%, 300px);
    margin: 35px auto 0;
  }

  @media (min-width: 991.98px) {
    margin-top: 300px;
    flex-direction: row;

    & .game-board{
      margin-right: 0;
    }

    & .game-game-info{
      margin-left: 50px;
    }
  }
`;

function Game() {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
    position: [null, null],
    winLine: null,
    draw: false,
  }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    const positions = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ];

    const historyCopy = history.slice(0, stepNumber + 1);
    const current = historyCopy[historyCopy.length - 1];
    const squares = current.squares.slice();
    let { winLine, draw } = current;

    if (winLine || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    const result = calculateWinner(squares);
    if (result) {
      winLine = result.line;
    } else {
      draw = !squares.includes(null);
    }

    const position = positions[i].slice();
    const newHistory = historyCopy.concat([{
      squares, position, winLine, draw,
    }]);
    setHistory(newHistory);
    setStepNumber(newHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const current = history[stepNumber];

  return (
    <StyledGame>
      <Board
        className="game-board"
        squares={current.squares}
        onClick={(i) => handleClick(i)}
        winLine={current.winLine}
      />
      <GameInfo
        className="game-game-info"
        history={history}
        stepNumber={stepNumber}
        xIsNext={xIsNext}
        jumpTo={jumpTo}
      />

    </StyledGame>
  );
}

export default Game;
