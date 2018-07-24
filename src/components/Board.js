import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import throttle from "lodash.throttle";

import {
  GAME_TILE_SPACING,
  GAME_GRID_SIZE,
  GAME_MOVE_COOLDOWN,
  GAME_SWIPE_MIN_DISTANCE
} from "../constants/game";
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

  touch-action: none;
  user-select: none;
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
  touch-action: none;
  user-select: none;
`;

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.board = React.createRef();

    this.handleKeyPress = throttle(this.handleKeyPress.bind(this), GAME_MOVE_COOLDOWN);
    this.handleSwipeStart = this.handleSwipeStart.bind(this);
    this.handleSwipeMove = this.handleSwipeMove.bind(this);
    this.handleSwipeEnd = throttle(this.handleSwipeEnd.bind(this), GAME_MOVE_COOLDOWN);
    this.swipeStart = null;
  }

  handleKeyPress(e) {
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

  handleSwipeStart(e) {
    if (!e.touches || e.touches.length > 1) {
      return;
    }

    const {clientX, clientY} = e.touches[0];
    this.swipeStart = {clientX, clientY};

    e.preventDefault();
  }

  handleSwipeMove(e) {
    e.preventDefault();
  }

  handleSwipeEnd(e) {
    if (!this.swipeStart) {
      return;
    }

    const {clientX, clientY} = e.changedTouches[0];
    const deltaX = clientX - this.swipeStart.clientX;
    const deltaY = clientY - this.swipeStart.clientY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (Math.max(absDeltaX, absDeltaY) < GAME_SWIPE_MIN_DISTANCE) {
      return;
    }

    const { shiftBoard } = this.props;
    shiftBoard(absDeltaX > absDeltaY ? (deltaX > 0 ? 'r' : 'l') : (deltaY > 0 ? 'd' : 'u'));
  }

  componentDidMount() {
    document.body.addEventListener("keydown", this.handleKeyPress);

    this.board.current.addEventListener("touchstart", this.handleSwipeStart);
    this.board.current.addEventListener("touchmove", this.handleSwipeMove);
    this.board.current.addEventListener("touchend", this.handleSwipeEnd);
  }

  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.handleKeyPress);
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
      <StyledBoard innerRef={this.board}>
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
