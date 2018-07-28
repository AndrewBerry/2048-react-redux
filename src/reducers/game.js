import {
  getEmptyTiles,
  addTileToBoard,
  removeDeadTiles,
  attemptToMoveBoard
} from "../utils/game";

import { SHIFT_BOARD, NEW_GAME } from "../constants/actionTypes";

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
        emptyTiles[Math.floor(action.nextTilePosition * emptyTiles.length)];
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

    case NEW_GAME:
      const length = action.size;
      const newBoard = Array.from({length}, () => (Array.from({length}, () => [])));

      const newBoardWithTiles = action.tilePositions.reduce((board, position, tileIndex) => {
        const emptyTilePositions = getEmptyTiles(board);
        const newTilePosition = emptyTilePositions[Math.floor(position * emptyTilePositions.length)];
        
        return addTileToBoard(
          board,
          newTilePosition,
          action.tileScores[tileIndex] < 0.9 ? 1 : 2,
          tileIndex
        );
      }, newBoard);

      return {
        ...state,
        score: 0,
        board: newBoardWithTiles,
        nextTileId: action.tilePositions.length,
      };

    default:
      return state;
  }
};
