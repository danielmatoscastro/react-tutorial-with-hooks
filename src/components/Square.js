import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSquare = styled.button`
  background: ${(props) => (props.inWinLine ? '#f00' : '#fff')};
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;

  &:focus{
    outline: none;
    background: ${(props) => (props.inWinLine ? '#f00' : '#ddd')};
  }
`;


function Square(props) {
  const { inWinLine, onClick, value } = props;

  return (
    <StyledSquare
      type="button"
      inWinLine={inWinLine}
      onClick={onClick}
    >
      {value}
    </StyledSquare>
  );
}

Square.propTypes = {
  inWinLine: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
};

Square.defaultProps = {
  value: null,
};

export default Square;
