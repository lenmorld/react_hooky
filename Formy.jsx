import React, { useState } from "react"

export default function Formy() {
  const [text, setText] = useState("")

  const [enabled, setEnabled] = useState(false)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  // updater function
  const handleClick = (e) => {
    setEnabled((prevEnabled) => !prevEnabled)
  }

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <p>{text}</p>
      <input type="checkbox" checked={enabled} onClick={handleClick} />
      {enabled.toString()}
    </div>
  )
}
