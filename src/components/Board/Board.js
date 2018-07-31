import React from "react";
import propTypes from "prop-types";
import throttle from "lodash.throttle";

import {
  GAME_TILE_SPACING,
  GAME_MOVE_COOLDOWN,
  GAME_SWIPE_MIN_DISTANCE
} from "../../constants/game";

import { Tile, TileStyle } from "../Tile";
import "./Board.css";

const throttledPreventDefaultHandler = (handler, wait) => {
  const throttledHandler = throttle(handler, wait);

  return (event) => {
    event.preventDefault();
    throttledHandler(event);
  }
}

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.board = React.createRef();

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSwipeStart = this.handleSwipeStart.bind(this);
    this.handleSwipeMove = this.handleSwipeMove.bind(this);
    this.handleSwipeEnd = this.handleSwipeEnd.bind(this);

    this.swipeStart = null;
  }

  handleKeyPress(e) {
    if (this.props.hasLost) {
      return;
    }

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
        e.preventDefault();
        return;
      }
    });
  }

  handleSwipeStart(e) {
    if (this.props.hasLost || !e.touches || e.touches.length > 1) {
      return;
    }

    const { clientX, clientY } = e.touches[0];
    this.swipeStart = { clientX, clientY };

    e.preventDefault();
  }

  handleSwipeMove(e) {
    if (this.props.hasLost) {
      return;
    }

    e.preventDefault();
  }

  handleSwipeEnd(e) {
    if (!this.swipeStart || this.props.hasLost) {
      return;
    }

    const { clientX, clientY } = e.changedTouches[0];
    const deltaX = clientX - this.swipeStart.clientX;
    const deltaY = clientY - this.swipeStart.clientY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (Math.max(absDeltaX, absDeltaY) < GAME_SWIPE_MIN_DISTANCE) {
      return;
    }

    const { shiftBoard } = this.props;
    shiftBoard(
      absDeltaX > absDeltaY ? (deltaX > 0 ? "r" : "l") : deltaY > 0 ? "d" : "u"
    );
  }

  componentDidMount() {
    document.body.addEventListener("keydown", throttledPreventDefaultHandler(this.handleKeyPress, GAME_MOVE_COOLDOWN));

    this.board.current.addEventListener("touchstart", throttledPreventDefaultHandler(this.handleSwipeStart, GAME_MOVE_COOLDOWN));
    this.board.current.addEventListener("touchmove", this.handleSwipeMove);
    this.board.current.addEventListener("touchend", this.handleSwipeEnd);
  }

  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    const { tiles } = this.props;

    const cellWidth = Math.floor(100 / this.props.gameSize);
    const tilePlaceholders = [];
    for (let x = 0; x < this.props.gameSize; x += 1) {
      for (let y = 0; y < this.props.gameSize; y += 1) {
        tilePlaceholders.push(
          <div
            key={`${x},${y}`}
            style={{
              top: `${cellWidth * y}%`,
              left: `${cellWidth * x}%`
            }}
            className="Board__placeholder"
          />
        );
      }
    }

    const placeholderStyle = `
      .Board__placeholder {
        width: ${cellWidth - GAME_TILE_SPACING * 2}%;
        height: ${cellWidth - GAME_TILE_SPACING * 2}%;
        margin: ${GAME_TILE_SPACING}%;
      }
    `;

    return (
      <div
        className={`Board ${this.props.hasLost ? "Board--hasLost" : ""}`}
        ref={this.board}
      >
        <style>{placeholderStyle}</style>
        <TileStyle gameSize={this.props.gameSize} />

        {tilePlaceholders}

        {tiles.map(tile => (
          <Tile key={tile.id} {...tile} gameSize={this.props.gameSize} />
        ))}

        <div className="Board__lostScreen">
          <h2>Game over!</h2>
        </div>
      </div>
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
