import { Component, createResource, For, Show } from "solid-js"
import { Reserve, Schedule } from "../utils/types"
import { readReserves, readSchedules } from "../utils/fetch";

export const AppHistory: Component = () => {
  const [reserveData] = createResource({ labId: 1, day: 0 }, readSchedules);
  return (
    <div>
      <Show when={reserveData.state === 'ready'}>
        <History {...reserveData()!} />
      </Show>
    </div>
  )
}

const History: Component<Schedule[]> = (props) => {
  return (
    <For each={props}>
      {(item) => <span>{item.id}</span>}
    </For>
  )
}
