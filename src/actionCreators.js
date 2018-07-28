import seedrandom from "seedrandom";
import { SHIFT_BOARD, NEW_GAME } from "./constants/actionTypes";

let rng = seedrandom();

export const shiftBoard = direction => ({
  type: SHIFT_BOARD,
  direction,
  score: rng() < 0.9 ? 1 : 2,
  nextTilePosition: rng()
});

export const newBoard = (size, seed, tiles = 2) => {
  rng = seedrandom(seed);

  return {
    type: NEW_GAME,
    seed,
    size,
    tileScores: Array.from({ length: tiles }, () => rng()),
    tilePositions: Array.from({ length: tiles }, () => rng())
  };
};
