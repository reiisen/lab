import { Component, createResource, Show } from "solid-js";
import { readLabs, readLabsWithInactive, readRooms } from "../utils/fetch";
import { CombinedGrid, LabGrid, RoomGrid } from "./Grid";
import { Lab, Room, WithInactive } from "../utils/types";
import { Loading } from "./Loading";


export const Labs: Component = () => {
  const [labData] = createResource(readLabsWithInactive);
  return (
    <Show when={labData.state === 'ready'} fallback={<Loading />}>
      <div class="py-4">
        <LabGrid labs={labData()! as WithInactive<Lab>[]} />
      </div>
    </Show>
  );
};

export const Rooms: Component = () => {
  const [roomData] = createResource(readRooms);
  return (
    <Show when={roomData.state === 'ready'} fallback={<Loading />}>
      <div class="py-4">
        <RoomGrid rooms={roomData()! as WithInactive<Room>[]} />
      </div>
    </Show>
  );
};

export const Catalog: Component = () => {
  const [labData] = createResource(readLabs);
  const [roomData] = createResource(readRooms);
  return (
    <Show when={labData.state === 'ready' && roomData.state === 'ready'} fallback={<Loading />}>
      <div class="py-4">
        <CombinedGrid labs={labData()! as WithInactive<Lab>[]} rooms={roomData() as WithInactive<Room>[]} />
      </div>
    </Show>
  );
};
