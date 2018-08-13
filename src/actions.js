export const NEW_GAME = "NEW_GAME";
export const SHIFT_BOARD = "SHIFT_BOARD";

export const createNewGameAction = (seed, width, height, numberOfTiles) => {
  return {
    type: NEW_GAME,
    seed,
    width,
    height,
    numberOfTiles
  };
};

export const createShiftBoardAction = direction => ({
  type: SHIFT_BOARD,
  direction
});
