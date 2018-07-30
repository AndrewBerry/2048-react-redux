import { createStore } from "redux";

import { game } from "./reducers/game";

export const configureStore = () => {
  return createStore(
    game,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};
