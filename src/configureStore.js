import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import { createNewGameAction } from "./actions";
import { persistToStorage, getInitialState } from "./middleware/persistToStorage";

export const configureStore = () => {
  const initialState = getInitialState(window.localStorage);

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      persistToStorage(window.localStorage)
    )
  );

  if (!initialState.board) {
    store.dispatch(createNewGameAction(Date.now(), 4, 4, 2));
  }

  return store;
};
