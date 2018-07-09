import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import { GAME_TILE_SIZE, GAME_TILE_SPACING } from "../constants/game";

const StyledTile = styled.div`
  position: absolute;
  width: ${GAME_TILE_SIZE}px;
  height: ${GAME_TILE_SIZE}px;

  border-radius: 3px;
  background-color: #eee4da;
  font-size: 32px;
  text-align: center;

  transition: top 100ms ease-out, left 100ms ease-out, transform 75ms ease-in;
  transform: ${props => (!props.active ? "scale(0);" : "")};
`;

const StyledTileLabel = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Tile = ({ active, score, x, y }) => {
  const position = {
    top: `${y * (GAME_TILE_SPACING + GAME_TILE_SIZE) + GAME_TILE_SPACING}px`,
    left: `${x * (GAME_TILE_SPACING + GAME_TILE_SIZE) + GAME_TILE_SPACING}px`
  };

  const scoreLabel = `${Math.pow(2, score)}`;

  return (
    <StyledTile style={position} active={active}>
      <StyledTileLabel fontSize={scoreLabel.length}>
        {scoreLabel}
      </StyledTileLabel>
    </StyledTile>
  );
};

Tile.propTypes = {
  active: propTypes.bool.isRequired,
  score: propTypes.number.isRequired,
  x: propTypes.number.isRequired,
  y: propTypes.number.isRequired
};
