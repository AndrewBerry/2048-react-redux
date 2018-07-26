import React from "react";
import propTypes from "prop-types";
import { Board } from "../Board";

import './Game.css';

export const Game = props => (
  <div className="Game" {...props}>
    <h1>2048</h1>
    <p>Score: {props.score}</p>
    <Board {...props} />
  </div>
);

Game.propTypes = {
  score: propTypes.number.isRequired,

  tiles: propTypes.arrayOf(
    propTypes.shape({
      active: propTypes.bool.isRequired,
      id: propTypes.number.isRequired,
      score: propTypes.number.isRequired,
      x: propTypes.number.isRequired,
      y: propTypes.number.isRequired
    })
  ).isRequired,

  shiftBoard: propTypes.func.isRequired
};
