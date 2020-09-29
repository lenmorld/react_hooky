import React, { useState } from "react";

export default function Formy() {
  // const [text, setText] = useState("");
  // const [enabled, setEnabled] = useState(false);

  // combine - make it like orig setState API
  const [state, setState] = useState({
    text: "",
    enabled: false,
  });

  // individual handlers change only part of state
  const handleChange = (e) => {
    // setText(e.target.value);
    setState({
      ...state,
      text: e.target.value,
    });
  };

  const handleClick = (e) => {
    // setEnabled((prevEnabled) => !prevEnabled);
    // setState((oldState) => ({
    //   ...oldState,
    //   enabled: !state.enabled,
    // }));

    // not updater
    // setState({
    //   ...state,
    //   // enabled: e.target.checked,
    //   enabled: !state.enabled,
    // });

    // updater
    setState((prevState) => ({
      ...prevState,
      enabled: !prevState.enabled,
    }));
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
