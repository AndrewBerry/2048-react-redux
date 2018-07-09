import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import { Board } from "./Board";

const StyledGame = styled.div`
  max-width: 500px;
  margin: auto;
`;

export const Game = props => (
  <StyledGame {...props}>
    <h1>2048</h1>
    <p>Score: {props.score}</p>
    <Board {...props} />
  </StyledGame>
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
