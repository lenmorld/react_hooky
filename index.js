import React from "react"
import ReactDOM from "react-dom"

import Formy from "./Formy"
import Header from "./Header"
import Battery from "./Battery"
import Texty from "./Texty"
// import Todo from "./Todo"
// import Todo from "./Todo.useReducer"
import Todo from "./Todo.useReducer.localStorage"
import SomeClass from "./SomeClass"
import SomeFunction from "./SomeFunction"

import ThemeContext from "./ThemeContext"

const Container = ({ children }) => {
  return <div>{children}</div>
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: "light",
    }
  }

  changeTheme = () => {
    console.log("change")
    this.setState(prevTheme => {
      if (prevTheme.theme === 'light') {
        return {
          theme: 'dark'
        }
      } else {
        return {
          theme: 'light'
        }
      }
    })
  }

  render() {
    const { theme } = this.state
    return (
      <ThemeContext.Provider value={theme}>
        <Container>
          <Header changeTheme={this.changeTheme} />
          {/* <Formy /> */}
          {/* <Battery /> */}
          {/* <Texty /> */}
          < hr />
          <SomeClass />
          <hr/>
          <SomeFunction />
          <Todo />
        </Container>
      </ThemeContext.Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
