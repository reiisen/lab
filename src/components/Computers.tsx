import { Component, createResource } from "solid-js";
import { readComputers } from "../utils/fetch";
import { ComputerGrid } from "./Grid";
import { useParams } from "@solidjs/router";

export const Computers: Component = () => {
  const [computerData] = createResource(parseInt(useParams().id), readComputers);
  return (
    <div class="">
      <ComputerGrid computers={computerData()!} />
    </div>
  );
};
