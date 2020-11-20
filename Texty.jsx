import React, { useRef } from "react"

export default function Todo() {
  const inputRef = useRef(null)

  function handleClick() {
    inputRef.current.focus()
    inputRef.current.select()
  }

  return (
    <div>
      <input autoFocus ref={inputRef} />
      <button onClick={() => handleClick()}>Focus</button>
    </div>
  )
}
