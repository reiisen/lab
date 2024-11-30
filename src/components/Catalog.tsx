import { Component, createResource } from "solid-js";
import { readLabs, readRooms } from "../utils/fetch";
import { CombinedGrid, LabGrid, RoomGrid } from "./Grid";


export const Labs: Component = () => {
  const [labData] = createResource(readLabs);
  return (
    <div class="py-4">
      <LabGrid labs={labData()!} />
    </div>
  );
};

export const Rooms: Component = () => {
  const [roomData] = createResource(readRooms);
  return (
    <div class="py-4">
      <RoomGrid rooms={roomData()!} />
    </div>
  );
};

export const Catalog: Component = () => {
  const [labData] = createResource(readLabs);
  const [roomData] = createResource(readRooms);
  return (
    <div class="py-4">
      <CombinedGrid labs={labData()!} rooms={roomData()!} />
    </div>
  );
};
