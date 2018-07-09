import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import { GAME_TILE_SPACING, GAME_GRID_SIZE } from "../constants/game";
import { Tile } from "./Tile";

const StyledBoard = styled.div`
  display: grid;
  grid-template: repeat(${GAME_GRID_SIZE}, 1fr) / repeat(${GAME_GRID_SIZE}, 1fr);
  grid-gap: ${GAME_TILE_SPACING}px;
  padding: ${GAME_TILE_SPACING}px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  max-height: 500px;
  width: 100%;
  height: 100vw;

  background-color: #bbada0;
  border-radius: 6px;
`;

const StyledTilePlaceholder = styled.div`
  background-color: #cdc1b5;
  border-radius: 3px;

  grid-column: ${props => props.x + 1} / span 1;
  grid-row: ${props => props.y + 1} / span 1;
`;

export class Board extends React.Component {
  constructor(props) {
    super(props);

    this.placeholders = {};
    this.onKeyPress = this.onKeyPress.bind(this);
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

  componentWillMount() {
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
          <StyledTilePlaceholder
            key={`${x},${y}`}
            x={x}
            y={y}
            innerRef={placeholder => {
              this.placeholders[`${x},${y}`] = placeholder;
            }}
          />
        );
      }
    }

    console.log(this.placeholders);
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
  ).isRequired
};
