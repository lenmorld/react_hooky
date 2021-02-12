import React, { useState, useEffect } from "react"

export default function Todo() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")

  const handleKeyDown = (e) => {
    // console.log(e)
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // ---- CRUD methods ----

  const handleNewSubmit = (e) => {
    e.preventDefault()
    // console.log(e)

    // add one
    setTodos((prevTodos) => [
      ...todos,
      {
        id: Date.now(),
        text: newTodo,
        completed: false,
      },
    ])
  }

  const handleNewChange = (e) => {
    setNewTodo(e.target.value)
  }

  const handleCompletedToggle = (id, e) => {
    // Update one
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      }),
    )
  }

  const handleDelete = (id, e) => {
    // Delete one
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  return (
    <div>
      <h1>TODOs</h1>
      <form onSubmit={handleNewSubmit}>
        <input
          autoFocus
          placeholder="New Todo"
          value={newTodo}
          onChange={handleNewChange}
        />
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => handleCompletedToggle(todo.id, e)}
            />
            {todo.text}
            <button onClick={(e) => handleDelete(todo.id, e)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
