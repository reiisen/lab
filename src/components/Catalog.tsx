import { Component, createResource } from "solid-js";
import { readLabs, readLabsWithInactive, readRooms } from "../utils/fetch";
import { CombinedGrid, LabGrid, RoomGrid } from "./Grid";
import { Lab, Room, WithInactive } from "../utils/types";


export const Labs: Component = () => {
  const [labData] = createResource(readLabsWithInactive);
  return (
    <div class="py-4">
      <LabGrid labs={labData()! as WithInactive<Lab>[]} />
    </div>
  );
};

export const Rooms: Component = () => {
  const [roomData] = createResource(readRooms);
  return (
    <div class="py-4">
      <RoomGrid rooms={roomData()! as WithInactive<Room>[]} />
    </div>
  );
};

export const Catalog: Component = () => {
  const [labData] = createResource(readLabs);
  const [roomData] = createResource(readRooms);
  return (
    <div class="py-4">
      <CombinedGrid labs={labData()! as WithInactive<Lab>[]} rooms={roomData() as WithInactive<Room>[]} />
    </div>
  );
};
