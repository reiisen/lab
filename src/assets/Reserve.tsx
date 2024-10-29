import { Component, createResource, For } from "solid-js";
import { LabCard } from "./Card";
import { fetchLabs } from "../utils/fetch";
import { LabGrid } from "./Grid";

const [labData] = createResource(fetchLabs);

export const Reserve: Component = () => {
  return (
    <LabGrid labs={labData()!} />
  )
}
