import React, {
  Component,
  PureComponent,
  memo,
  useState,
  useCallback,
} from "react"
import ThemeContext from "./Todo.useReducer.localStorage"

// 1. ❌ render called on every key down, even if we don't need the text prop
//      class Item extends Component {
// 2. ❌ PureComponent didn't do anything
//      class Item extends PureComponent {
//      -> implements shouldComponentUpdate with a shallow prop and state comparison
//          but doesn't help if props and state changes
//      -> but since the onClick and onMouseOver function is re-created everytime, props is always different
// 3. ✅ Component + shouldComponentUpdate
// shouldComponentUpdate(nextProps) {
//     return nextProps.item !== this.props.item
//   }
//      -> works since now we explicitly only update if the prop we care about changes

// FUNCTIONS
// 4. ❌ function component instead of Component + shouldComponentUpdate / PureComponent
// even worse!
// const ItemFunc = ({ item, onClick, onMouseOver }) => {

// 5 ❌ memo HoC - didn't help
// const ItemFunc = memo(
// memo only does a shallow compare like PureComponent, so same problem
// onClick and onMouseOver keeps changing

// 6 ✅ memo with a custom compare function
// function areEqual(prevProps, nextProps) {
//     return nextProps.item === prevProps.item
//   },

// BTW, this has nothing to do with inline, or binding,
// when parent is a class component, declaring it outside and/or binding it to this
// instead of inlining it still produces same problem

// why do we still need the memo()
// -> https://kentcdodds.com/blog/usememo-and-usecallback#reactmemo-and-friends
// regardless if we use callback or not, the <ItemFunc is re-rendered for every state change in the parent
// the only way we can reduce that is via React.memo

const ItemFunc = memo(({ item, onClick, onMouseOver }) => {
  console.log("Func >> Item", { item, onClick, onMouseOver })

  return (
    <div onClick={onClick} onMouseOver={onMouseOver}>
      hey{item}
    </div>
  )
})

class ItemClass extends Component {
  // comment this out to see unneeded re-renders
  shouldComponentUpdate(nextProps) {
    return nextProps.item !== this.props.item
  }

  render() {
    console.log("Class >> Item", this.props)
    const { item, onClick, onMouseOver } = this.props

    return (
      <div onClick={onClick} onMouseOver={onMouseOver}>
        hey{item}
      </div>
    )
  }
}

// Parent can be a Class or Funtion, no difference
// the only different is starting #7 we can useCallback instead
const PureComponenty = () => {
  const [text, setText] = useState("")

  // these don't change, so we don't want any re-renders
  const [items, setItems] = useState([1, 2, 3])

  // 7 ❌ memo w/out custom compare, but parent class not inline anymore
  // same issue, it's not about inline or not
  // this is because within this component function, every time it's re-rendered
  // these functions are re-declared

  //   const handleClick = () => {
  //     console.log("click")
  //   }

  //   const handleMouseOver = () => {
  //     console.log("mouse over")
  //   }

  // -> we can useCallback to kepe the ref. equality of these functions

  // 8 ✅ memo + useCallback

  const handleClick = useCallback(() => {
    console.log("click")
  }, []) // we don't want memoized version to change

  const handleMouseOver = useCallback(() => {
    console.log("mouse over")
  }, [])

  const handleChange = (e) => setText(e.target.value)

  return (
    <div>
      <input value={text} onChange={handleChange} />
      <h2>Class</h2>
      {items.map((i) => (
        <ItemClass
          key={i}
          item={i}
          onClick={() => {
            console.log("click")
          }}
          onMouseOver={() => {
            console.log("mouse over")
          }}
        />
      ))}
      <h2>Function</h2>
      {/* INLINE: 1-6 */}
      {/* {[1, 2, 3].map((i) => (
        <ItemFunc
          key={i}
          item={i}
          onClick={() => {
            console.log("click")
          }}
          onMouseOver={() => {
            console.log("mouse over")
          }}
        />
      ))} */}
      {/* useCallback: 7 */}
      {items.map((i) => (
        <ItemFunc
          key={i}
          item={i}
          onClick={handleClick}
          onMouseOver={handleMouseOver}
        />
      ))}
    </div>
  )
}

export default function Usage() {
  return (
    <div>
      <PureComponenty />
    </div>
  )
}
