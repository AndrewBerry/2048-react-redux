import React from "react";
import propTypes from "prop-types";

import { Scorebox } from "../Scorebox";
import { Board } from "../Board";
import { Button } from "../Button";

import { GAME_TILE_SPACING } from "../../constants/game";

import "./Game.css";

export const Game = ({
  seed,
  score,
  tiles,
  gameSize,
  hasLost,
  highestTile,
  shiftBoard,
  newGame
}) => (
  <div className="Game">
    <style>
      .Game__board {"{"}
      padding: {GAME_TILE_SPACING}%;
      {"}"}
    </style>

    <div className="Game__header">
      <h1 className="Game__title">2048</h1>
      <Scorebox className="Game__score" label="Score" score={score} />
      <Scorebox className="Game__best" label="Best" score={score} />
      <Button className="Game__new" onClick={newGame}>
        New Game
      </Button>
      <p className="Game__target">
        Join the numbers and get the{" "}
        <strong>{Math.pow(2, Math.max(11, highestTile + 1))}</strong> tile!
      </p>
    </div>

    <div className="Game__board">
      <Board
        seed={seed}
        tiles={tiles}
        shiftBoard={shiftBoard}
        gameSize={gameSize}
        hasLost={hasLost}
      />
    </div>

    <div className="Game__footer">
      <p>
        <strong>HOW TO PLAY</strong>: Use your <strong>arrow keys</strong> to
        move the tiles. When two tiles with the same number touch, they{" "}
        <strong>merge into one</strong>!
      </p>
      <hr />
      <p>
        <strong>NOTE</strong>: This version of 2048 is remake of{" "}
        <a
          href="http://gabrielecirulli.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gabriele Cirulli's
        </a>{" "}
        <a href="http://git.io/2048" target="_blank" rel="noopener noreferrer">
          2048
        </a>. Gabriele's version was originally based on{" "}
        <a
          href="https://itunes.apple.com/us/app/1024!/id823499224"
          target="_blank"
          rel="noopener noreferrer"
        >
          1024 by Veewo Studio
        </a>{" "}
        and conceptually similar to{" "}
        <a
          href="http://asherv.com/threes/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Threes by Asher Vollmer
        </a>.
      </p>
    </div>
  </div>
);

Game.propTypes = {
  score: propTypes.number.isRequired,
  highestTile: propTypes.number.isRequired,

  tiles: propTypes.arrayOf(
    propTypes.shape({
      active: propTypes.bool.isRequired,
      id: propTypes.number.isRequired,
      score: propTypes.number.isRequired,
      x: propTypes.number.isRequired,
      y: propTypes.number.isRequired
    })
  ).isRequired,

  shiftBoard: propTypes.func.isRequired,
  newGame: propTypes.func.isRequired
};
