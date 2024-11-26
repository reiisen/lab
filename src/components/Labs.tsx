import { Component, createResource } from "solid-js";
import { readLabs } from "../utils/fetch";
import { LabGrid } from "./Grid";


export const Labs: Component = () => {
  const [labData] = createResource(readLabs);
  return (
    <div class="py-4">
      <LabGrid labs={labData()!} />
    </div>
  );
};
