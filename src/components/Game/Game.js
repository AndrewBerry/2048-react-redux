import React from "react";
import propTypes from "prop-types";

import { Scorebox } from "../Scorebox";
import { Board } from "../Board";
import { Button } from "../Button";
import { GameOver } from "../GameOver";
import { NewGame } from "../NewGame";

import { GAME_TILE_SPACING } from "../../constants/game";

import "./Game.css";

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newGameConfirmationOpen: false
    };

    this.confirmedNewGame = this.confirmedNewGame.bind(this);
    this.closeNewGameConfirmation = this.closeNewGameConfirmation.bind(this);
    this.forceNewGame = this.forceNewGame.bind(this);
  }

  confirmedNewGame() {
    if (this.props.score > 0 && !this.props.hasLost) {
      this.setState({ newGameConfirmationOpen: true });
      return;
    }

    this.forceNewGame();
  }

  closeNewGameConfirmation() {
    this.setState({ newGameConfirmationOpen: false });
  }

  forceNewGame() {
    this.props.newGame();
    this.closeNewGameConfirmation();
  }

  render() {
    const {
      seed,
      score,
      bestScore,
      tiles,
      gameSize,
      hasLost,
      highestTile,
      gameState,
      shiftBoard
    } = this.props;

    return (
      <div className="Game">
        <style>
          .Game__board {"{"}
          padding: {GAME_TILE_SPACING}%;
          {"}"}
        </style>

        <div className="Game__header">
          <h1 className="Game__title">2048</h1>
          <Scorebox className="Game__score" label="Score" score={score} />
          <Scorebox className="Game__best" label="Best" score={bestScore} />
          <Button className="Game__new" onClick={this.confirmedNewGame}>
            New Game
          </Button>
          <p className="Game__target">
            Join the numbers and get the{" "}
            <strong>{Math.pow(2, Math.max(11, highestTile + 1))}</strong> tile!
          </p>
        </div>

        <div className="Game__board">
          {hasLost && (
            <div className="Game__overlay">
              <GameOver score={score} newGame={this.forceNewGame} />
            </div>
          )}

          {!hasLost &&
            this.state.newGameConfirmationOpen && (
              <div className="Game__overlay">
                <NewGame
                  noClick={this.closeNewGameConfirmation}
                  yesClick={this.forceNewGame}
                />
              </div>
            )}

          <Board
            seed={seed}
            tiles={tiles}
            shiftBoard={shiftBoard}
            score={score}
            gameSize={gameSize}
            hasLost={hasLost}
            gameState={gameState}
          />
        </div>

        <div className="Game__footer">
          <p>
            <strong>HOW TO PLAY</strong>: Use your <strong>arrow keys</strong>{" "}
            to move the tiles. When two tiles with the same number touch, they{" "}
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
            <a
              href="http://git.io/2048"
              target="_blank"
              rel="noopener noreferrer"
            >
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
  }
}

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
