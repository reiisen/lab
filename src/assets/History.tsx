import { Component, createResource, For, Show } from "solid-js"
import { Reserve, Course } from "../utils/types"
import { readReserves, readCourses } from "../utils/fetch";

export const AppHistory: Component = () => {
  const [reserveData] = createResource({ labId: 1, day: 0 }, readCourses);
  return (
    <div>
      <Show when={reserveData.state === 'ready'}>
        <History {...reserveData()!} />
      </Show>
    </div>
  )
}

const History: Component<Course[]> = (props) => {
  return (
    <For each={props}>
      {(item) => <span>{item.id}</span>}
    </For>
  )
}
