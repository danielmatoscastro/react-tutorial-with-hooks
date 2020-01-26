import React, { useState } from 'react';
import styled from 'styled-components';
import calculateWinner from '../calculateWinner';
import Board from './Board';
import GameInfo from './GameInfo';

const StyledGame = styled.div`
  display: flex;
  flex-direction: row;
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
        squares={current.squares}
        onClick={(i) => handleClick(i)}
        winLine={current.winLine}
      />
      <GameInfo
        history={history}
        stepNumber={stepNumber}
        xIsNext={xIsNext}
        jumpTo={jumpTo}
      />

    </StyledGame>
  );
}

export default Game;
