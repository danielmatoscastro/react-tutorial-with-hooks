/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import calculateWinner from '../calculateWinner';

const StyledGameInfo = styled.div`
    width: min(100%, 300px);
    margin: 35px auto 0;

    & ol{
        list-style-type: none;
        padding: 0;
    }

    & button {
        width: 100%;
        background-color: #61DAFB;
        border: none;
        border-bottom: 1px solid #20232A;
        font-size: 16px;
        display: block;
        margin: auto;

    }

    & input[type=checkbox] {
        background-color: #61DAFB;
        
    }

    & .info{
        margin-bottom: 5px;
        font-size: 16px;
    }

    @media (min-width: 991.98px) {
      margin: 0 0 0 50px;
      & button{
        font-size: 18px;
      }

      & .info{
        font-size: 20px;
      }
    }
`;

function GameInfo(props) {
  const {
    history, stepNumber, xIsNext, jumpTo,
  } = props;
  const [ascOrder, setAscOrder] = useState(true);

  function defineStatus(current, xIsNextPlayer) {
    const result = calculateWinner(current.squares);
    let status;
    if (result) {
      status = `Winner: ${result.winner}`;
    } else if (current.draw) {
      status = 'Tie in the game!';
    } else {
      status = `Next player: ${xIsNextPlayer ? 'X' : 'O'}`;
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
  const status = defineStatus(current, xIsNext);
  const lastPosition = defineLastPosition(current);
  const moves = renderMoves();

  return (
    <StyledGameInfo>
      <div className="info">{status}</div>
      <div className="info">{lastPosition}</div>
      <label htmlFor="order-checkboox" className="info">
        {ascOrder ? 'Ascending order' : 'Descending order'}
        <input type="checkbox" id="order-checkboox" onChange={(e) => setAscOrder(e.target.checked)} checked={ascOrder} />
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
