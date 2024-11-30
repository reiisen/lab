import { Component, For, Index, JSX } from "solid-js";
import type { Computer, Filter, Lab, Reserve, Room } from "../utils/types";
import {
  ComputerCard,
  LabCard,
  ReservedCard,
  RestrictedCard,
  RoomCard,
  VacantCard,
} from "./Cards";

export const LabGrid: Component<{ labs: Lab[] }> = (props) => {
  return (
    <div class="grid lg:grid-cols-3 md:grid-cols-3 gap-3 px-8 m-auto">
      <For each={props.labs}>{(item) => <LabCard {...item} />}</For>
    </div>
  );
};

export const RoomGrid: Component<{ rooms: Room[] }> = (props) => {
  return (
    <div class="grid lg:grid-cols-3 md:grid-cols-3 gap-3 px-8 m-auto">
      <For each={props.rooms}>{(item) => <LabCard {...item} />}</For>
    </div>
  );
};

export const CombinedGrid: Component<{ rooms: Room[], labs: Lab[] }> = (props) => {
  return (
    <div class="grid lg:grid-cols-3 md:grid-cols-3 gap-3 px-8 m-auto">
      <For each={props.labs}>{(item) => <LabCard {...item} />}</For>
      <For each={props.rooms}>{(item) => <RoomCard {...item} />}</For>
    </div>
  );
};

export const ComputerGrid: Component<{ computers: Computer[] }> = (props) => {
  return (
    <div class="grid lg:grid-cols-4 md:grid-cols-3 gap-3 px-8 m-auto">
      <For each={props.computers}>{(item) => <ComputerCard {...item} />}</For>
    </div>
  );
};

export const ScheduleGrid: Component<{
  data: Reserve[]
  filter: Filter
  refetcher?: Function
}> = (props) => {

  const map = Array<JSX.Element>(11).fill(undefined);

  props.data.forEach((value) => {
    const date: Date = new Date(value.date);
    for (let i = 0; i < value.length; i++) {
      map[date.getHours() - 7 + i] = (
        <ReservedCard {...value} index={date.getHours() + i} />
      );
    }
  });

  return (
    <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3 px-8 m-auto">
      <Index each={map}>
        {(value, index) => {
          return value() ? value() : <VacantCard index={index + 7} filter={props.filter} onClick={props.refetcher ? props.refetcher : undefined} />;
        }}
      </Index>
      <RestrictedCard />
    </div>
  );
};
