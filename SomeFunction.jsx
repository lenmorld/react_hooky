import React from "react"
import ThemeContext from "./ThemeContext"
import styles from "./styles"

export default function SomeFunction() {
  const theme = React.useContext(ThemeContext)

  return <div style={styles[theme]}>Function component with useContext</div>
}
