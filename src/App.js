import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { BoardContainer } from "./containers/BoardContainer";
import { game } from "./reducers/game";

const store = createStore(game);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <BoardContainer />
        </Provider>
      </div>
    );
  }
}

export default App;
