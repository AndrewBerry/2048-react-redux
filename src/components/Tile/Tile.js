import React from "react";
import propTypes from "prop-types";

import { GAME_TILE_SPACING, GAME_MOVE_COOLDOWN } from "../../constants/game";

import "./Tile.css";

export const TileStyle = ({ gameSize }) => {
  const tileWidth = Math.floor(100 / gameSize);

  return (
    <style>
      .Tile {"{"}
      width: {tileWidth - GAME_TILE_SPACING * 2}%; height:{" "}
      {tileWidth - GAME_TILE_SPACING * 2}%; margin: {GAME_TILE_SPACING}%;
      animation: Tile__pop {GAME_MOVE_COOLDOWN * 2}ms ease-out; transition: top{" "}
      {GAME_MOVE_COOLDOWN}ms ease-out, left {GAME_MOVE_COOLDOWN}ms ease-out,
      transform {Math.floor(GAME_MOVE_COOLDOWN * 0.75)}ms ease-in;
      {"}"}
    </style>
  );
};

export const Tile = ({ active, score, x, y, gameSize }) => {
  const tileWidth = Math.floor(100 / gameSize);

  const tileStyle = {
    top: `${y * tileWidth}%`,
    left: `${x * tileWidth}%`,
  };

  return (
    <div className={`Tile Tile--t${score} ${active ? '' : 'Tile--dead'}`} style={tileStyle}>
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
