import * as actionTypes from "../constants/actionTypes";
import { GAME_GRID_SIZE } from "../constants/game";

const initialState = {
  board: [
    [
      [{ score: 8, id: 4 }],
      [{ score: 8, id: 5 }],
      [{ score: 8, id: 6 }],
      [{ score: 8, id: 7 }]
    ],
    [[], [{ score: 8, id: 0 }, { score: 1, id: 1 }], [], []],
    [[{ score: 2, id: 2 }], [], [], [{ score: 2, id: 3 }]],
    [[], [], [], []]
  ],
  nextTileId: 8
};

function buildTraversals(direction) {
  const isLongRow = direction === "l" || direction === "r";

  return Array.from({ length: GAME_GRID_SIZE }, (v, long) => {
    const traversal = Array.from({ length: GAME_GRID_SIZE }, (vv, short) => ({
      [isLongRow ? "row" : "col"]: long,
      [isLongRow ? "col" : "row"]: short
    }));

    return direction === "r" || direction === "d"
      ? traversal.reverse()
      : traversal;
  });
}

export const game = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHIFT_BOARD:
      const nextBoard = state.board.map(row =>
        row.map(cell => cell.splice(-1, 1))
      );

      const traversals = buildTraversals(action.direction);
      traversals.forEach(traversal => {
        let lastMerge = 0;
        for (let startIndex = 1; startIndex < GAME_GRID_SIZE; startIndex += 1) {
          for (
            let currentIndex = startIndex;
            currentIndex > lastMerge;
            currentIndex -= 1
          ) {
            const { col: fCol, row: fRow } = traversal[currentIndex];
            const { col: tCol, row: tRow } = traversal[currentIndex - 1];
            const from = nextBoard[fRow][fCol];
            const to = nextBoard[tRow][tCol];

            if (from.length === 0) {
              continue;
            }

            if (to.length === 0) {
              nextBoard[tRow][tCol] = from;
              nextBoard[fRow][fCol] = [];

              continue;
            }

            if (to[to.length - 1].score === from[from.length - 1].score) {
              nextBoard[tRow][tCol] = [
                ...nextBoard[tRow][tCol],
                ...nextBoard[fRow][fCol]
              ];
              nextBoard[tRow][tCol][
                nextBoard[tRow][tCol].length - 1
              ].score += 1;
              nextBoard[fRow][fCol] = [];

              lastMerge = currentIndex;

              continue;
            }
          }
        }
      });

      return { ...state, board: nextBoard };

    default:
      return state;
  }
};
