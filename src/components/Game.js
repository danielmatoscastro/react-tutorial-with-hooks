/* eslint-disable react/no-array-index-key */
import React from 'react';
import Board from './Board';

class Game extends React.Component {
  static calculateWinner(squares) {
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

  constructor(props) {
    super(props);

    this.state = {
      history: [{
        squares: Array(9).fill(null),
        position: [null, null],
        winLine: null,
        draw: false,
      }],
      stepNumber: 0,
      xIsNext: true,
      ascOrder: true,
    };
  }

  handleClick(i) {
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
    const { stepNumber, xIsNext } = this.state;
    let { history } = this.state;
    history = history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let { winLine, draw } = current;

    if (winLine || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    const result = Game.calculateWinner(squares);
    if (result) {
      winLine = result.line;
    } else {
      draw = !squares.includes(null);
    }

    const position = positions[i].slice();
    this.setState({
      history: history.concat([{
        squares, position, winLine, draw,
      }]),
      stepNumber: history.length,
      xIsNext: !xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleChangeCheckbox(e) {
    this.setState({ ascOrder: e.target.checked });
  }

  defineStatus(current) {
    const { xIsNext } = this.state;

    const result = Game.calculateWinner(current.squares);
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

  defineLastPosition() {
    const { history, stepNumber } = this.state;
    const current = history[stepNumber];

    return current.position.every((p) => p == null)
      ? ''
      : `Last position clicked: (${current.position[0]}, ${current.position[1]})`;
  }

  renderMoves(history) {
    const { stepNumber, ascOrder } = this.state;

    let moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        <li key={move}>
          <button type="button" onClick={() => this.jumpTo(move)}>
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

  render() {
    const { history, stepNumber, ascOrder } = this.state;
    const current = history[stepNumber];
    const lastPosition = this.defineLastPosition();
    const moves = this.renderMoves(history);
    const status = this.defineStatus(current);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winLine={current.winLine}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{lastPosition}</div>
          <label htmlFor="order-checkboox">
            Ordem ascendente
            <input type="checkbox" id="order-checkboox" onChange={(e) => this.handleChangeCheckbox(e)} checked={ascOrder} />
          </label>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
