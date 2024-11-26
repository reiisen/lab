import { Field } from "@ark-ui/solid";
import { Component, Signal } from "solid-js";

export const SignalInput: Component<{ signal: Signal<string> }> = (props) => {
  const [text, setText] = props.signal;
  const handleType = (e: any) => setText(e.target.value);
  return (
    <input type="text" value={text()} onInput={handleType} />
  )
}

type TextFieldProps = {
  signal: Signal<string>,
  label?: string,
  description?: string
}

export const TextField: Component<TextFieldProps> = (props) => {
  const [text, setText] = props.signal;
  const handleType = (e: any) => setText(e.target.value);
  return (
    <Field.Root class="flex flex-col">
      {props.label ? <Field.Label>{props.label}</Field.Label> : <></>}
      <Field.Input onInput={handleType} value={text()} />
      {props.description ? <Field.HelperText>{props.description}</Field.HelperText> : <></>}
    </Field.Root>
  )
}
