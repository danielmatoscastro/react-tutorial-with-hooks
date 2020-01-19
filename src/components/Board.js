import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

function Board({ winLine, squares, onClick }) {
  function renderSquare(i) {
    const inWinLine = winLine ? winLine.includes(i) : false;

    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        inWinLine={inWinLine}
      />
    );
  }

  const linhas = [];
  for (let i = 0; i < 3; i += 1) {
    const linha = [];
    for (let j = 0; j < 3; j += 1) {
      linha.push(renderSquare(3 * i + j));
    }
    linhas.push(<div className="board-row" key={i}>{linha}</div>);
  }

  return (
    <div>
      {linhas}
    </div>
  );
}

Board.propTypes = {
  winLine: PropTypes.arrayOf(PropTypes.number),
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};

Board.defaultProps = {
  winLine: null,
};

export default Board;
