import React from "react";

import { Scorebox } from "../Scorebox";
import { Button } from "../Button";
import "./GameOver.css";

export const GameOver = ({ score, newGame }) => {
  return (
    <div className="GameOver">
      <h2 className="GameOver__title">Game Over!</h2>
      <Scorebox score={score} label="Final Score" isLarge={true} />
      <p>
        <Button onClick={newGame} modifiers={['large', 'block']}>New Game</Button>
      </p>
    </div>
  );
};
