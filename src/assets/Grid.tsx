import { Component, For } from "solid-js"
import type { Reserve, Schedule } from "../utils/types"
import { EmptyTimeslotCard, TimeslotCard } from "./Card"

export const ScheduleGrid: Component<{ schedules: Schedule[], reserves: Reserve[] }> = (props) => {
  type Content = { id: number, fill: Schedule | Reserve | undefined };
  console.log(props.schedules);
  console.log(props.reserves);
  const map = Array<Content>(11);
  for (let i = 0; i < map.length; i++) {
    map[i] = { id: i, fill: undefined };
  }
  props.schedules.forEach((value) => {
    for (let i = 0; i < value.length; i++) {
      map[value.timeslot + i] = { id: map[value.timeslot + i].id, fill: value };
    }
  });
  props.reserves.forEach((value) => {
    for (let i = 0; i < value.length; i++) {
      map[value.timeslot + i] = { id: map[value.timeslot + i].id, fill: value };
    }
  });
  console.log(map);
  return (
    <div>
      <For each={map}>
        {(item) => {
          return item.fill ?
            <TimeslotCard<typeof item.fill> {...item.fill} timeslot={item.id} /> :
            <EmptyTimeslotCard timeslot={item.id} day={new Date().getDay()} />
        }}
      </For>
    </div>
  )
}
