import { Component, createResource, For } from "solid-js";
import { LabCard } from "./Card";
import { fetchLabs } from "../utils/fetch";

const [labData, { mutate, refetch }] = createResource(fetchLabs);

export const Reserve: Component = () => {
  return (
    <div class="flex flex-row gap-1 flex-wrap">
      <For each={labData()} fallback={<>kontol</>}>
        {(item) => <LabCard name={item.name} code={item.code} floor={item.floor} />}
      </For>
    </div>
  )
}
