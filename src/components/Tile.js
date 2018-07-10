import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import {
  GAME_TILE_SPACING,
  GAME_GRID_SIZE,
  GAME_TILE_BG_COLORS,
  GAME_TILE_BG_COLOR_DEFAULT,
  GAME_TILE_FONT_COLORS,
  GAME_TILE_FONT_COLOR_DEFAULT,
  GAME_TILE_FONT_SIZES,
  GAME_TILE_FONT_SIZE_DEFAULT,
  GAME_MOVE_COOLDOWN
} from "../constants/game";

const tileWidth = Math.floor(100 / GAME_GRID_SIZE);
const StyledTile = styled.div`
  position: absolute;
  width: ${tileWidth - GAME_TILE_SPACING * 2}%;
  height: ${tileWidth - GAME_TILE_SPACING * 2}%;
  margin: ${GAME_TILE_SPACING}%;

  top: ${props => props.y * tileWidth}%;
  left: ${props => props.x * tileWidth}%;

  border-radius: 3px;
  background-color: ${props => props.backgroundColor};
  font-size: 32px;
  text-align: center;

  transition: top ${GAME_MOVE_COOLDOWN}ms ease-out, left ${GAME_MOVE_COOLDOWN}ms ease-out, transform ${Math.floor(GAME_MOVE_COOLDOWN * 0.75)}ms ease-in;
  transform: ${props => (!props.active ? "scale(0);" : "")};
`;

const StyledTileLabel = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${props => props.fontColor};
  font-size: ${props => `${props.fontSize}px`};

  @media (max-width: 415px) {
    font-size: ${props => `${Math.floor(props.fontSize * 0.75)}px`};
  }
`;

export const Tile = ({ active, score, x, y }) => {
  const scoreLabel = `${Math.pow(2, score)}`;

  return (
    <StyledTile
      x={x}
      y={y}
      active={active}
      backgroundColor={
        GAME_TILE_BG_COLORS[scoreLabel] || GAME_TILE_BG_COLOR_DEFAULT
      }
    >
      <StyledTileLabel
        fontColor={
          GAME_TILE_FONT_COLORS[scoreLabel] || GAME_TILE_FONT_COLOR_DEFAULT
        }
        fontSize={
          GAME_TILE_FONT_SIZES[`${scoreLabel.length}`] ||
          GAME_TILE_FONT_SIZE_DEFAULT
        }
      >
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
