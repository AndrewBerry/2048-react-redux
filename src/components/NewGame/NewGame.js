import React from "react";

import { Button } from "../Button";

import "./NewGame.css";

export const NewGame = ({ noClick, yesClick }) => {
  return (
    <div className="NewGame">
      <h2 className="NewGame__title">Are you sure?</h2>
      <div className="NewGame__controls">
        <Button onClick={noClick} modifiers={["muted", "medium"]}>
          Cancel
        </Button>
        <Button onClick={yesClick} modifiers={["medium"]}>
          New Game
        </Button>
      </div>
    </div>
  );
};
