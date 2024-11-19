import { Component, For, Index, JSX } from "solid-js";
import type { Lab, Reserve, CourseWithSubject } from "../utils/types";
import {
  CourseCard,
  LabCard,
  ReservedCard,
  RestrictedCard,
  VacantCard,
} from "./Curd";

export const LabGrid: Component<{ labs: Lab[] }> = (props) => {
  return (
    <div class="grid lg:grid-cols-4 md:grid-cols-3 gap-3 px-8 m-auto">
      <For each={props.labs}>{(item) => <LabCard {...item} />}</For>
    </div>
  );
};

export const ScheduleGrid: Component<{
  data: [CourseWithSubject[], Reserve[]]
  date: Date
}> = (props) => {
  const map = Array<JSX.Element>(11).fill(undefined);
  props.data[0].forEach((value) => {
    for (let i = 0; i < value.length; i++) {
      map[value.timeslot - 7 + i] = (
        <CourseCard {...value} index={value.timeslot + i} />
      );
    }
  });
  props.data[1].forEach((value) => {
    const date: Date = new Date(value.date);
    for (let i = 0; i < value.length; i++) {
      map[date.getHours() - 7 + i] = (
        <ReservedCard {...value} index={date.getHours() + i} />
      );
    }
  });
  console.log("CURRENNN : " + props.date);
  return (
    <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3 px-8 m-auto">
      <Index each={map}>
        {(value, index) => {
          return value() ? value() : <VacantCard index={index + 7} date={props.date} />;
        }}
      </Index>
      <RestrictedCard />
    </div>
  );
};
