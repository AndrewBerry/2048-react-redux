import {
  getEmptyTiles,
  addTileToBoard,
  removeDeadTiles,
  attemptToMoveBoard
} from "../utils/game";

import { SHIFT_BOARD } from "../constants/actionTypes";

const initialState = {
  board: [
    [[], [], [], []],
    [[], [], [{ id: 1, score: 1 }], []],
    [[], [{ id: 2, score: 1 }], [], []],
    [[], [], [], []]
  ],
  nextTileId: 3,
  score: 0
};

export const game = (state = initialState, action) => {
  switch (action.type) {
    case SHIFT_BOARD:
      const activeBoard = removeDeadTiles(state.board);
      const moveAttempt = attemptToMoveBoard(activeBoard, action.direction);

      if (!moveAttempt) {
        return state;
      }
      const { board: movedBoard, moveScore } = moveAttempt;

      const emptyTiles = getEmptyTiles(movedBoard);

      if (emptyTiles.length === 0) {
        return state; // lose?
      }

      const newTilePosition =
        emptyTiles[action.nextTileIndex % emptyTiles.length];
      const boardWithNewTile = addTileToBoard(
        movedBoard,
        newTilePosition,
        action.score,
        state.nextTileId
      );

      return {
        ...state,
        score: state.score + moveScore,
        board: boardWithNewTile,
        nextTileId: state.nextTileId + 1
      };

    default:
      return state;
  }
};
