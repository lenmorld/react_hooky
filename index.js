import React from "react";
import ReactDOM from "react-dom";

import Formy from "./Formy";

class App extends React.Component {
  render() {
    return (
      <div>
        <Formy />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
