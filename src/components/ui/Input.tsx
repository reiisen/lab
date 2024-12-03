import { Field } from "@ark-ui/solid";
import { Component, Signal } from "solid-js";
import { _field_description, _field_input, _field_label, _field_root } from "./styles/Input";

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

export const Input: Component<TextFieldProps> = (props) => {
  const [text, setText] = props.signal;
  const handleType = (e: any) => setText(e.target.value);
  return (
    <Field.Root class={_field_root}>
      {props.label ? <Field.Label class={_field_label}>{props.label}</Field.Label> : <></>}
      <Field.Input onInput={handleType} value={text()} class={_field_input} />
      {props.description ? <Field.HelperText class={_field_description}>{props.description}</Field.HelperText> : <></>}
    </Field.Root>
  )
}
