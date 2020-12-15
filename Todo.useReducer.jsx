import React, { useState, useEffect, useReducer } from "react"

const ADD_TODO = "ADD_TODO"
const UPDATE_TODO = "UPDATE_TODO"
const DELETE_TODO = "DELETE_TODO"

function todosReducer (todos, action) {

  const { type, text, id } = action

  switch(type) {
    case ADD_TODO: {
      return [
          ...todos,
          {
            id: Date.now(),
            text,
            completed: false,
          },
        ]
      break;
    }

    case UPDATE_TODO: {
      return todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      })
    }

    case DELETE_TODO: {
      return todos.filter((todo) => todo.id !== id)
    }

    default: {
      throw new Error("unknown action")
    }
  }
}

export default function Todo() {
  // const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")

  const [todos, dispatch] = useReducer(todosReducer, [])

  const handleKeyDown = (e) => {
    console.log(e)
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
    console.log(e)

    // add one
    dispatch({ type: ADD_TODO,
      text: newTodo
    })
  }

  const handleNewChange = (e) => {
    setNewTodo(e.target.value)
  }

  const handleCompletedToggle = (id, e) => {
    // Update one
    dispatch({ type: UPDATE_TODO, id })
  }

  const handleDelete = (id, e) => {
    // Delete one
    dispatch({ type: DELETE_TODO, id })
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
