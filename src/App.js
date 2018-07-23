import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { game } from "./reducers/game";
import { GameContainer } from "./containers/GameContainer";

const store = createStore(
  game,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <GameContainer />
        </Provider>
      </div>
    );
  }
}

export default App;
