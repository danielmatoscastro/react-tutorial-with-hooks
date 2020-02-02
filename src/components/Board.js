import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Square from './Square';

const StyledBoard = styled.div`
  width: min(100%, 300px);
  margin: auto;

  @media (min-width: 991.98px) {
    margin: 0;
  }

  @media (min-width: 1980px) {
    margin: 0;
  }
`;

const StyledBoardRow = styled.div`
  display: flex;
  justify-content: center;

  &:after {
    clear: both;
    content: "";
    display: table;
  }
`;

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
    linhas.push(<StyledBoardRow key={i}>{linha}</StyledBoardRow>);
  }

  return (
    <StyledBoard>
      {linhas}
    </StyledBoard>
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
