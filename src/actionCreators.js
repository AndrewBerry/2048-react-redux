import seedrandom from "seedrandom";
import { SHIFT_BOARD, ADD_TILE } from "./constants/actionTypes";

const rng = seedrandom();

export const shiftBoard = direction => ({
  type: SHIFT_BOARD,
  direction,
  score: 1 + Math.floor(rng() * 2),
  nextTileIndex: Math.floor(Number.MAX_SAFE_INTEGER * rng())
});

export const addTile = (value, colIndex, rowIndex) => ({
  type: ADD_TILE
});
