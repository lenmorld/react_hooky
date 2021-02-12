import React from "react"
import ThemeContext from "./ThemeContext"

import styles from "./styles"

// 1. Consume context using Consumer
class Header extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          return (
            <header style={styles[theme]}>
              <nav>Thebest</nav>
              <div>
                Theme:
                {theme}
              </div>
              <button onClick={this.props.changeTheme}>Change theme</button>
            </header>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Header
