import React from "react"
import ThemeContext from "./ThemeContext"
import styles from "./styles"

// 2. Consumer using Class.contextType

class SomeClass extends React.Component {
  render() {
    // we can access context here
    const theme = this.context
    return (
      <div style={styles[theme]}>Class component with Class.contextType</div>
    )
  }
}

SomeClass.contextType = ThemeContext

export default SomeClass
