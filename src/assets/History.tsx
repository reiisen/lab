import { Component, For } from "solid-js"
import { Reserve } from "../utils/types"

export const History: Component<Reserve[]> = (props) => {
  return (
    <For each={props}>
      {(item) => <span>{item.id}</span>}
    </For>
  )
}
