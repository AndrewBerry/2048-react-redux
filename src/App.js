import React, { Component } from "react";
import { Provider } from "react-redux";

import { configureStore } from "./configureStore";
import { GameContainer } from "./containers/GameContainer";

const store = configureStore();

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
