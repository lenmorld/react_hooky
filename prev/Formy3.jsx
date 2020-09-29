import React, { useState } from "react";

export default function Formy() {
  // const [text, setText] = useState("");
  // const [enabled, setEnabled] = useState(false);

  // combine - make it like orig setState API
  const [state, setState] = useState({
    text: "",
    enabled: false,
  });

  // combine the indiv. handlers
  const mergeState = (partialState) => {
    setState((prevState) => ({
      ...prevState,
      ...partialState,
    }));
  };

  // NOTE that since we merge, we can't use the specific prevState
  // of the inputes anymore, we have to use either the
  // event value or the state

  const handleChange = (e) => {
    mergeState({
      text: e.target.value,
    });
  };

  const handleClick = (e) => {
    mergeState({
      // enabled: e.target.checked,
      enabled: !state.enabled,
    });

    // setState((prevState) => ({
    //   ...prevState,
    //   enabled: !prevState.enabled,
    // }));
  };

  return (
    <div>
      <input type="text" value={state.text} onChange={handleChange} />
      <p>{state.text}</p>
      <input type="checkbox" checked={state.enabled} onClick={handleClick} />
      {state.enabled ? "Yes" : "No"}
    </div>
  );
}
