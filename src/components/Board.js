import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Square from './Square';

const StyledBoardRow = styled.div`
  display: flex;
  justify-content: center;

  &:after {
    clear: both;
    content: "";
    display: table;
  }
`;

function Board({
  winLine, squares, onClick, className,
}) {
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
    linhas.push(<StyledBoardRow key={i}>{linha}</StyledBoardRow>);
  }

  return (
    <div className={className}>
      {linhas}
    </div>
  );
}

Board.propTypes = {
  winLine: PropTypes.arrayOf(PropTypes.number),
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Board.defaultProps = {
  winLine: null,
  className: '',
};

export default Board;
