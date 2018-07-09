import { connect } from "react-redux";

import { Game } from "../components/Game";

import { shiftBoard } from "../actionCreators";
import { reduceBoardToTiles } from "../utils/game";

const mapStateToProps = state => ({
  score: state.score,
  tiles: reduceBoardToTiles(state.board)
});

const mapDispatchToProps = dispatch => ({
  shiftBoard: direction => dispatch(shiftBoard(direction))
});

export const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
