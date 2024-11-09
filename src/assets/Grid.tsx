import { Component, For, Index, JSX } from "solid-js";
import type { Lab, Reserve, CourseWithSubject } from "../utils/types";
import { EmptyTimeslotCard, LabCard, RestrictedTimeslotCard } from "./Card";
import { CourseCard, ReserveCard, RestrictedCard, VacantCard } from "./Curd";

export const LabGrid: Component<{ labs: Lab[] }> = (props) => {
  return (
    <div class="grid lg:grid-cols-4 grid-cols-3 gap-3 px-8 m-auto">
      <For each={props.labs}>{(item) => <LabCard {...item} />}</For>
    </div>
  );
};

export const ScheduleGrid: Component<{
  schedules: CourseWithSubject[];
  reserves: Reserve[];
}> = (props) => {
  const map = Array<JSX.Element>(11).fill(undefined);
  props.schedules.forEach((value) => {
    for (let i = 0; i < value.length; i++) {
      map[value.timeslot - 7 + i] = <CourseCard {...value} index={value.timeslot + i} />;
    }
  });
  props.reserves.forEach((value) => {
    for (let i = 0; i < value.length; i++) {
      map[value.date.getHours() - 7 + i] = <ReserveCard {...value} index={value.date.getHours() - 7 + i} />;
    }
  });
  return (
    <div class="grid lg:grid-cols-4 grid-cols-3 w-3/5 gap-3 px-8 m-auto">
      <Index each={map}>
        {(value, index) => {
          return value() ? value() : <VacantCard index={index + 7} />
        }}
      </Index>
      <RestrictedCard />
    </div>
  );
};
