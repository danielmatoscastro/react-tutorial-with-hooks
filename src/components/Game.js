/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Board from './Board';

function Game() {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
    position: [null, null],
    winLine: null,
    draw: false,
  }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [ascOrder, setAscOrder] = useState(true);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  }

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

  function handleChangeCheckbox(e) {
    setAscOrder(e.target.checked);
  }

  function defineStatus(current) {
    const result = calculateWinner(current.squares);
    let status;
    if (result) {
      status = `Winner: ${result.winner}`;
    } else if (current.draw) {
      status = 'Tie in the game!';
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return status;
  }

  function defineLastPosition() {
    const current = history[stepNumber];

    return current.position.every((p) => p == null)
      ? ''
      : `Last position clicked: (${current.position[0]}, ${current.position[1]})`;
  }

  function renderMoves() {
    let moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        <li key={move}>
          <button type="button" onClick={() => jumpTo(move)}>
            {move === stepNumber ? <b>{desc}</b> : desc}
          </button>
        </li>
      );
    });

    if (!ascOrder) {
      moves = moves.reverse();
    }
    return moves;
  }

  const current = history[stepNumber];
  const lastPosition = defineLastPosition();
  const moves = renderMoves(history);
  const status = defineStatus(current);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          winLine={current.winLine}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>{lastPosition}</div>
        <label htmlFor="order-checkboox">
          Ordem ascendente
          <input type="checkbox" id="order-checkboox" onChange={(e) => handleChangeCheckbox(e)} checked={ascOrder} />
        </label>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
