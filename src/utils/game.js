import { GAME_GRID_SIZE } from "../constants/game";

export const reduceBoardToTiles = board =>
  board
    .reduce(
      (tiles, row, rowIndex) => [
        ...tiles,
        ...row.reduce(
          (rowTiles, cell, colIndex) => [
            ...rowTiles,
            ...cell.map(({ id, score }, cellIndex) => ({
              id,
              score,
              x: colIndex,
              y: rowIndex,
              active: cellIndex === cell.length - 1
            }))
          ],
          []
        )
      ],
      []
    )
    .sort((a, b) => a.id - b.id);

export const removeDeadTiles = board =>
  board.map(row => row.map(cell => cell.slice(-1)));

export const buildTraversals = direction => {
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
};

export const attemptToMoveBoard = (board, direction) => {
  const movedBoard = JSON.parse(JSON.stringify(board));
  const traversals = buildTraversals(direction);

  let moveScore = 0;
  let didAnythingMove = false;

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
        const from = movedBoard[fRow][fCol];
        const to = movedBoard[tRow][tCol];

        if (from.length === 0) {
          continue;
        }

        if (to.length === 0) {
          movedBoard[tRow][tCol] = from;
          movedBoard[fRow][fCol] = [];

          didAnythingMove = true;
          continue;
        }

        if (to[to.length - 1].score === from[from.length - 1].score) {
          movedBoard[tRow][tCol] = [
            ...movedBoard[tRow][tCol],
            ...movedBoard[fRow][fCol]
          ];
          movedBoard[tRow][tCol][movedBoard[tRow][tCol].length - 1].score += 1;
          movedBoard[fRow][fCol] = [];

          lastMerge = currentIndex;
          moveScore += Math.pow(
            2,
            movedBoard[tRow][tCol][movedBoard[tRow][tCol].length - 1].score
          );

          didAnythingMove = true;
          continue;
        }
      }
    }
  });

  if (!didAnythingMove) {
    return false;
  }

  return {
    board: movedBoard,
    moveScore
  };
};

export const getEmptyTiles = board => {
  const emptyCells = [];

  for (let row = 0; row < GAME_GRID_SIZE; row += 1) {
    for (let col = 0; col < GAME_GRID_SIZE; col += 1) {
      if (board[row][col].length === 0) {
        emptyCells.push({ col, row });
      }
    }
  }

  return emptyCells;
};

export const addTileToBoard = (board, position, score, id) => {
  const boardWithTile = JSON.parse(JSON.stringify(board));

  boardWithTile[position.row][position.col].push({
    id,
    score
  });

  return boardWithTile;
};
