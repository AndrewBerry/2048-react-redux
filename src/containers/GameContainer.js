import { connect } from "react-redux";

import { createNewGameAction, createShiftBoardAction } from "../actions";
import {
  reduceBoardToTiles,
  getHighestScoreTile,
  hasLost
} from "../helpers/board";
import { Game } from "../components/Game";

const mapStateToProps = state => ({
  score: state.score,
  bestScore: state.bestScore,
  tiles: reduceBoardToTiles(state.board),
  gameSize: state.board.length,
  seed: state.seed,
  hasLost: hasLost(state.board),
  highestTile: getHighestScoreTile(state.board),
  gameState: state.nextTileId,
});

const mapDispatchToProps = dispatch => ({
  newGame: () => {
    dispatch(createNewGameAction(Date.now(), 4, 4, 2));
  },
  shiftBoard: direction => {
    dispatch(createShiftBoardAction(direction));
  }
});

export const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
