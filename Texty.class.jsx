import React from "react"

export default class Todo extends React.Component {
  constructor() {
    super()
    this.inputRef = React.createRef()
  }

  handleClick() {
    this.inputRef.current.focus()
    this.inputRef.current.select()
  }

  render() {
    return (
      <div>
        <input autoFocus ref={this.inputRef} />
        <button onClick={() => this.handleClick()}>Focus</button>
      </div>
    )
  }
}
