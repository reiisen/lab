import { Component, For } from "solid-js"
import type { Reserve, Schedule } from "../utils/types"

const Empty: Component = () => {
  return (
    <></>
  )
}

// export const TimeGrid: Component<{ schedules: Schedule[], reserves: Reserve[] }> = (props) => {
//   const map = Array<Component<any>>(10).fill(Empty);
//   props.schedules.forEach((value) => {
//     map[value.timeslot] = ;
//   });
//   props.reserves.forEach((value) => {
//     map[value.timeslot] = value;
//   });
//   return (
//     <div>
//       <For each={map}>
//         {(item) => {
//           return <></>
//         }}
//       </For>
//     </div>
//   )
// }
