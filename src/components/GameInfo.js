/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import calculateWinner from '../calculateWinner';

const StyledGameInfo = styled.div`
  margin-left: 20px;
`;

function GameInfo(props) {
  const {
    history, stepNumber, xIsNext, jumpTo,
  } = props;
  const [ascOrder, setAscOrder] = useState(true);

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

  function defineLastPosition(current) {
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
  const status = defineStatus(current);
  const lastPosition = defineLastPosition(current);
  const moves = renderMoves(history);

  return (
    <StyledGameInfo>
      <div>{status}</div>
      <div>{lastPosition}</div>
      <label htmlFor="order-checkboox">
      Ordem ascendente
        <input type="checkbox" id="order-checkboox" onChange={(e) => handleChangeCheckbox(e)} checked={ascOrder} />
      </label>
      <ol>{moves}</ol>
    </StyledGameInfo>
  );
}

GameInfo.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({
    squares: PropTypes.arrayOf(PropTypes.string),
    position: PropTypes.arrayOf(PropTypes.number),
    winLine: PropTypes.arrayOf(PropTypes.number),
    draw: PropTypes.bool,
  })).isRequired,
  stepNumber: PropTypes.number.isRequired,
  xIsNext: PropTypes.bool.isRequired,
  jumpTo: PropTypes.func.isRequired,
};

export default GameInfo;
