import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import throttle from "lodash.throttle";

import { GAME_TILE_SPACING, GAME_GRID_SIZE, GAME_MOVE_COOLDOWN } from "../constants/game";
import { Tile } from "./Tile";

const StyledBoard = styled.div`
  position: relative;
  max-width: 500px;
  max-height: 500px;
  width: 100%;
  height: 100vw;

  background-color: #bbada0;
  border: 5px solid #bbada0;
  border-radius: 6px;
`;

const tileWidth = Math.floor(100 / GAME_GRID_SIZE);
const StyledTilePlaceholder = styled.div`
  position: absolute;
  width: ${tileWidth - GAME_TILE_SPACING * 2}%;
  height: ${tileWidth - GAME_TILE_SPACING * 2}%;
  margin: ${GAME_TILE_SPACING}%;
  top: ${props => props.y * tileWidth}%;
  left: ${props => props.x * tileWidth}%;

  background-color: #cdc1b5;
  border-radius: 3px;
`;

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyPress = throttle(this.onKeyPress.bind(this), GAME_MOVE_COOLDOWN);
  }

  onKeyPress(e) {
    const { shiftBoard } = this.props;

    const keyBinds = {
      u: ["w", "ArrowUp"],
      r: ["d", "ArrowRight"],
      d: ["s", "ArrowDown"],
      l: ["a", "ArrowLeft"]
    };

    Object.entries(keyBinds).forEach(([direction, keys]) => {
      if (keys.indexOf(e.key) >= 0) {
        shiftBoard(direction);
      }
    });
  }

  componentDidMount() {
    document.body.addEventListener("keydown", this.onKeyPress);
  }

  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.onKeyPress);
  }

  render() {
    const { tiles } = this.props;

    const tilePlaceholders = [];
    for (let x = 0; x < GAME_GRID_SIZE; x += 1) {
      for (let y = 0; y < GAME_GRID_SIZE; y += 1) {
        tilePlaceholders.push(
          <StyledTilePlaceholder key={`${x},${y}`} x={x} y={y} />
        );
      }
    }

    return (
      <StyledBoard>
        {tilePlaceholders}
        {tiles.map(tile => <Tile key={tile.id} {...tile} />)}
      </StyledBoard>
    );
  }
}

Board.propTypes = {
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
