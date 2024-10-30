import { Component, For, Index, JSX } from "solid-js";
import type { Lab, Reserve, Schedule } from "../utils/types";
import { EmptyTimeslotCard, LabCard, ReservedCard, ScheduleCard } from "./Card";

export const LabGrid: Component<{ labs: Lab[] }> = (props) => {
  return (
    <div class="grid lg:grid-cols-4 grid-cols-3 gap-3 px-8 w-[1366px] m-auto">
      <For each={props.labs}>{(item) => <LabCard {...item} />}</For>
    </div>
  );
};

export const ScheduleGrid: Component<{
  schedules: Schedule[];
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
    <div class="grid lg:grid-cols-4 grid-cols-3 gap-4 px-8 w-[1200px] m-auto">
      <Index each={map}>
        {(value, index) => {
          const object = value();
          return object ? object : <EmptyTimeslotCard day={new Date().getDay()} timeslot={index} />
        }}
      </Index>
      <div class="flex flex-row justify-end items-end rounded-xl shadow-lg bg-purple-600 text-white px-4 py-2">
        <span class="font-bold">RESTRICTED</span>
      </div>
    </div>
  );
};
