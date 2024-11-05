import { Component, For, Index, JSX } from "solid-js";
import type { Lab, Reserve, Schedule, ScheduleWithSubject, Subject } from "../utils/types";
import { EmptyTimeslotCard, LabCard, ReservedCard, RestrictedTimeslotCard, ScheduleCard } from "./Card";


export const LabGrid: Component<{ labs: Lab[] }> = (props) => {
  return (
    <div class="grid lg:grid-cols-4 grid-cols-3 gap-3 px-8 m-auto">
      <For each={props.labs}>{(item) => <LabCard {...item} />}</For>
    </div>
  );
};

export const ScheduleGrid: Component<{
  schedules: ScheduleWithSubject[];
  reserves: Reserve[];
}> = (props) => {
  const map = Array<JSX.Element>(11);
  props.schedules.forEach((value) => {
    for (let i = 0; i < value.length; i++) {
      map[value.timeslot + i] = <ScheduleCard {...value} index={value.timeslot + i} />;
    }
  });
  props.reserves.forEach((value) => {
    for (let i = 0; i < value.length; i++) {
      map[value.timeslot + i] = <ReservedCard {...value} index={value.timeslot + i} />;
    }
  });
  return (
    <div class="grid lg:grid-cols-4 grid-cols-3 w-3/5 gap-3 px-8 m-auto">
      <Index each={map}>
        {(value, index) => {
          return value() ? value() : <EmptyTimeslotCard day={new Date().getDay()} timeslot={index} />
        }}
      </Index>
      <RestrictedTimeslotCard />
    </div>
  );
};
