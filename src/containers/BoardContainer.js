import { connect } from "react-redux";
import { Board } from "../components/Board";

import * as actions from "../actionCreators";

const mapStateToProps = (state, ownProps) => ({
  tiles: state.board
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
    .sort((a, b) => a.id - b.id),
  score: state.score
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  shiftBoard: direction => {
    dispatch(actions.shiftBoard(direction));
  }
});

export const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
