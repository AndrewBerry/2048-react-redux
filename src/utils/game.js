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
