import { Component, createResource, createSignal, For } from "solid-js";
import { fetchSchedules } from "../utils/fetch";
import { ScheduleCard } from "./Card"

const [query, setQuery] = createSignal<Partial<{ id: number, day: number }>>({});
const [scheduleData, { mutate, refetch }] = createResource(query, fetchSchedules);

export const Schedule: Component = () => {
  return (
    <div class="flex flex-row gap-1 flex-wrap">
    </div>
  )
}
