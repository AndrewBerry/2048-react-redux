import { createStore } from "redux";
import { rootReducer } from "./reducers";
import { createNewGameAction } from "./actions";

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.dispatch(createNewGameAction(Date.now(), 4, 4, 2));

  return store;
};
