import {
  NEW_GAME, SHIFT_BOARD
} from "../actions";

export const GAME_STATE = "GAME_STATE";
export const BEST_SCORE = "BEST_SCORE";

export const persistToStorage = storage => store => next => action => {  
  next(action);

  // eslint-disable-next-line
  switch (action.type) {
    case NEW_GAME:
        storage.removeItem(GAME_STATE);
      break;

    case SHIFT_BOARD:
        const state = store.getState();
        
        storage.setItem(GAME_STATE, JSON.stringify(state));
        storage.setItem(BEST_SCORE, JSON.stringify(state.bestScore));
      break;
  }
};

export const getInitialState = storage => {
  const state = storage.getItem(GAME_STATE);
  const bestScore = storage.getItem(BEST_SCORE);

  if (!state) {
    return { bestScore: (bestScore && JSON.parse(bestScore)) || 0 };
  }

  return JSON.parse(state);
};
