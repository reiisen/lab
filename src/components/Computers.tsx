import { Component, createResource, Show } from "solid-js";
import { readComputers } from "../utils/fetch";
import { ComputerGrid } from "./Grid";
import { useParams } from "@solidjs/router";
import { Computer, WithInactive } from "../utils/types";
import { Loading } from "./Loading";

export const Computers: Component = () => {
  const [computerData] = createResource(parseInt(useParams().id), readComputers);
  return (
    <Show when={computerData.state === 'ready'} fallback={<Loading />}>
      <div class="">
        <ComputerGrid computers={computerData()! as WithInactive<Computer>[]} />
      </div>
    </Show>
  );
};
