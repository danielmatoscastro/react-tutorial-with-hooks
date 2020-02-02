import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSquare = styled.button`
  background: ${(props) => (props.inWinLine ? '#61DAFB' : '#fff')};
  border: 1px solid #999;
  float: left;
  font-size: 48px;
  font-weight: bold;
  line-height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 112px;
  
  &::before {
    content: "";
    display: block;
    padding-top: ${(props) => (props.value ? 'calc((100% - 34px) / 2)' : '50%')};
  }

  &::after {
    content: "";
    display: block;
    padding-bottom: ${(props) => (props.value ? 'calc((100% - 34px) / 2)' : '50%')};
  }

  &:focus{
    outline: none;
    background: ${(props) => (props.inWinLine ? '#61DAFB' : '#ddd')};
  }
`;

function Square(props) {
  const { inWinLine, onClick, value } = props;

  return (
    <StyledSquare
      type="button"
      inWinLine={inWinLine}
      onClick={onClick}
      value={value}
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
