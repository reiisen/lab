import { Component, createResource } from "solid-js";
import { fetchLabs } from "../utils/fetch";
import { LabGrid } from "./Grid";

const [labData] = createResource(fetchLabs);

export const Reserve: Component = () => {
  return (
    <LabGrid labs={labData()!} />
  )
}
