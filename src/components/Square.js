import React from 'react';
import PropTypes from 'prop-types';

function Square(props) {
  const { inWinLine, onClick, value } = props;

  return (
    <button
      type="button"
      className={`square ${inWinLine ? 'red' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
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
