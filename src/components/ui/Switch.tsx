import { Switch as d } from '@ark-ui/solid'
import { createSignal, Signal } from 'solid-js'

export const Switch = (props: { title?: string, signal: Signal<boolean> }) => {
  const [checked, setChecked] = props.signal;

  return (
    <d.Root checked={checked()} onCheckedChange={(e) => setChecked(e.checked)}>
      <d.Control>
        <d.Thumb />
      </d.Control>
      <d.Label>{props.title ? props.title : ""}</d.Label>
      <d.HiddenInput />
    </d.Root>
  )
}
