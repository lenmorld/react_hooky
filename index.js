import React from "react"
import ReactDOM from "react-dom"

import Formy from "./Formy"
import Battery from "./Battery"
import Texty from "./Texty"
import Todo from "./Todo"

class App extends React.Component {
  render() {
    return (
      <div>
        {/* <Formy /> */}
        {/* <Battery /> */}
        {/* <Texty /> */}
        <Todo />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
