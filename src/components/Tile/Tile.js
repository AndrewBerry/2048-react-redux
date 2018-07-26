import React from "react";
import propTypes from "prop-types";

import {
  GAME_TILE_SPACING,
  GAME_GRID_SIZE,
  GAME_MOVE_COOLDOWN
} from "../../constants/game";

import "./Tile.css";

const tileWidth = Math.floor(100 / GAME_GRID_SIZE);

export const staticTileStyles = `
  .Tile {
    width: ${tileWidth - GAME_TILE_SPACING * 2}%;
    height: ${tileWidth - GAME_TILE_SPACING * 2}%;
    margin: ${GAME_TILE_SPACING}%;

    animation: Tile__pop ${GAME_MOVE_COOLDOWN * 2}ms ease-out;
    transform:
      top ${GAME_MOVE_COOLDOWN}ms ease-out,
      left ${GAME_MOVE_COOLDOWN}ms ease-out,
      transform ${Math.floor(GAME_MOVE_COOLDOWN * 0.75)}ms ease-in;
  }
`;

export const Tile = ({ active, score, x, y }) => {
  const tileStyle = {
    top: `${y * tileWidth}%`,
    left: `${x * tileWidth}%`,
    transform: active ? null : "scale(0)",
  };

  return (
    <div
      className={`Tile Tile--t${score}`}
      style={tileStyle}
    >
      <span className="Tile__label">{Math.pow(2, score)}</span>
    </div>
  );
};

Tile.propTypes = {
  active: propTypes.bool.isRequired,
  score: propTypes.number.isRequired,
  x: propTypes.number.isRequired,
  y: propTypes.number.isRequired
};
