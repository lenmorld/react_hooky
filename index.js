import React from "react";
import ReactDOM from "react-dom";

import Formy from "./Formy";
import Battery from "./Battery";

class App extends React.Component {
  render() {
    return (
      <div>
        {/* <Formy /> */}
        <Battery />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
