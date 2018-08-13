import { NEW_GAME, SHIFT_BOARD } from "./actions";

import {
  createBlankBoard,
  addTileToBoard,
  attemptToMoveBoard,
  getEmptyCells
} from "./helpers/board";

import { MAX_PRNG_VALUE, nextPRNG } from "./helpers/rng";

const defaultState = {
  score: 0,
  bestScore: 0,
  board: null,
  nextTileId: 0,
  lastPRNGValue: 0,
  seed: 0
};

export const newGame = (state, action) => {
  const { seed, width, height, numberOfTiles } = action;

  let board = createBlankBoard(width, height);

  let lastPRNGValue = seed;
  let nextTileId = 0;

  for (var tileIndex = 0; tileIndex < numberOfTiles; tileIndex += 1) {
    const position = nextPRNG(lastPRNGValue);
    const valuePRNG = nextPRNG(position);
    const value = valuePRNG / MAX_PRNG_VALUE < 0.9 ? 1 : 2;
    lastPRNGValue = valuePRNG;

    const boardWithTile = addTileToBoard(board, nextTileId, position, value);
    if (!!boardWithTile) {
      board = boardWithTile;
    }

    nextTileId += 1;
  }

  return {
    ...state,
    seed,
    lastPRNGValue,
    nextTileId,
    board,
    score: 0
  };
};

export const shiftBoard = (state, action) => {
  const moveAttempt = attemptToMoveBoard(state.board, action.direction);
  if (!moveAttempt) {
    return state;
  }

  const { board: movedBoard, moveScore } = moveAttempt;
  const emptyTiles = getEmptyCells(movedBoard);

  if (emptyTiles.length === 0) {
    return state;
  }

  const tilePositionPRNG = nextPRNG(state.lastPRNGValue);
  const tileValuePRNG = nextPRNG(tilePositionPRNG);
  const tileValue = tileValuePRNG / MAX_PRNG_VALUE < 0.9 ? 1 : 2;
  const boardWithTile = addTileToBoard(
    movedBoard,
    state.nextTileId,
    tilePositionPRNG,
    tileValue
  );

  return {
    ...state,
    score: state.score + moveScore,
    board: boardWithTile,
    lastPRNGValue: tileValuePRNG,
    nextTileId: state.nextTileId + 1
  };
};

export const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case NEW_GAME:
      return newGame(state, action);

    case SHIFT_BOARD:
      return shiftBoard(state, action);

    default:
      return state;
  }
};
