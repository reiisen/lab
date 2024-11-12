import { Component, createResource } from "solid-js";
import { readLabs } from "../utils/fetch";
import { LabGrid } from "./Grid";

export const [labData] = createResource(readLabs);

export const Labs: Component = () => {
  return (
    <div class="py-4">
      <LabGrid labs={labData()!} />
    </div>
  );
};
