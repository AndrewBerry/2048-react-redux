export const createBlankBoard = (width, height) =>
  Array.from({ length: height }, () =>
    Array.from({ length: width }, () => null)
  );

export const getEmptyCells = board => {
  const emptyCells = [];

  for (let y = 0; y < board.length; y += 1) {
    for (let x = 0; x < board[y].length; x += 1) {
      if (!board[y][x]) {
        emptyCells.push({ row: y, col: x });
      }
    }
  }

  return emptyCells;
};

export const addTileToBoard = (board, tileId, position, score) => {
  const emptyCells = getEmptyCells(board);
  if (emptyCells.length === 0) {
    return false;
  }

  const { row, col } = emptyCells[position % emptyCells.length];
  const boardWithTile = JSON.parse(JSON.stringify(board));
  boardWithTile[row][col] = { id: tileId, score };

  return boardWithTile;
};

export const reduceBoardToTiles = board => {
  const tiles = [];

  for (let y = 0; y < board.length; y += 1) {
    for (let x = 0; x < board[y].length; x += 1) {
      if (!board[y][x]) {
        continue;
      }

      tiles.push({
        ...board[y][x],
        y,
        x
      });
    }
  }

  return tiles;
};

export const getHighestScoreTile = board => {
  let highestTileScore = 0;

  for (let y = 0; y < board.length; y += 1) {
    for (let x = 0; x < board[y].length; x += 1) {
      if (!board[y][x]) {
        continue;
      }

      highestTileScore = Math.max(highestTileScore, board[y][x].score);
    }
  }

  return highestTileScore;
};

export const hasLost = board => {
  for (let y = 0; y < board.length; y += 1) {
    for (let x = 0; x < board[y].length; x += 1) {
      if (!board[y][x]) {
        return false;
      }

      const currentValue = board[y][x].score;
      if (
        y + 1 < board.length &&
        board[y + 1][x] &&
        board[y + 1][x].score === currentValue
      ) {
        return false;
      }
      if (
        x + 1 < board[y].length &&
        board[y][x + 1] &&
        board[y][x + 1].score === currentValue
      ) {
        return false;
      }
    }
  }

  return true;
};

export const buildTraversals = (direction, boardSize) => {
  const isLongRow = direction === "l" || direction === "r";

  return Array.from({ length: boardSize }, (v, long) => {
    const traversal = Array.from({ length: boardSize }, (vv, short) => ({
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
  const traversals = buildTraversals(direction, board.length);

  let moveScore = 0;
  let didAnythingMove = false;

  traversals.forEach(traversal => {
    let lastMerge = 0;
    for (let startIndex = 1; startIndex < traversal.length; startIndex += 1) {
      for (let currIndex = startIndex; currIndex > lastMerge; currIndex -= 1) {
        const { col: fCol, row: fRow } = traversal[currIndex];
        const { col: tCol, row: tRow } = traversal[currIndex - 1];
        const from = movedBoard[fRow][fCol];
        const to = movedBoard[tRow][tCol];

        if (!from) {
          continue;
        }

        if (!to) {
          movedBoard[tRow][tCol] = from;
          movedBoard[fRow][fCol] = null;

          didAnythingMove = true;
          continue;
        }

        if (to.score === from.score) {
          movedBoard[tRow][tCol] = from;
          movedBoard[fRow][fCol] = null;

          movedBoard[tRow][tCol].score += 1;
          moveScore += Math.pow(2, movedBoard[tRow][tCol].score);
          lastMerge = currIndex;
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
