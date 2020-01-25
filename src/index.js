import React from 'react';
import ReactDOM from 'react-dom';
import MainStyle from './MainStyle';
import Game from './components/Game';

ReactDOM.render(
  <MainStyle>
    <Game />
  </MainStyle>,
  document.getElementById('root'),
);
