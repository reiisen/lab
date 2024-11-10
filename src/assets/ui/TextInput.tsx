import { Component, Signal } from "solid-js";

export const SignalInput: Component<{ signal: Signal<string> }> = (props) => {
  const [text, setText] = props.signal;
  const handleType = (e: any) => setText(e.target.value);
  return (
    <input type="text" value={text()} onInput={handleType} />
  )
}
