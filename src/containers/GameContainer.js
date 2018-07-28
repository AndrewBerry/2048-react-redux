import { connect } from "react-redux";

import { Game } from "../components/Game";

import { shiftBoard, newBoard } from "../actionCreators";
import { reduceBoardToTiles, hasLost } from "../utils/game";

const mapStateToProps = state => ({
  score: state.score,
  tiles: reduceBoardToTiles(state.board),
  gameSize: state.board.length,
  hasLost: hasLost(state.board)
});

const mapDispatchToProps = dispatch => ({
  shiftBoard: direction => dispatch(shiftBoard(direction)),
  newBoard: () => dispatch(newBoard(4, Date.now().toString(), 2))
});

export const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
