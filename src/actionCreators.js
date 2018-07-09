import * as types from "./constants/actionTypes";

export const shiftBoard = direction => ({ type: types.SHIFT_BOARD, direction });
export const undo = () => ({ type: types.UNDO });
export const redo = () => ({ type: types.REDO });
