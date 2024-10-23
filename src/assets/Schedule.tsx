import { Component, createResource, createSignal, For, Match, Show, Switch } from "solid-js";
import { fetchSchedules } from "../utils/fetch";
import { ScheduleCard } from "./Card"
import { useParams } from "@solidjs/router";
import { Loading } from "./Loading";
import { Error } from "./Error";

export const Schedule: Component = () => {
  const [param] = createSignal({ labId: parseInt(useParams().id), day: new Date().getDay() - 1 });
  const [scheduleData] = createResource(param(), fetchSchedules);
  return (
    <div>
      <span>Schedule</span>
      <div class="flex flex-row gap-1 flex-wrap">
        <Switch>
          <Match when={scheduleData.state === "ready"}>
            <For each={scheduleData()} fallback={<></>}>
              {(item) => <ScheduleCard
                id={item.id}
                timeslot={item.timeslot}
                day={item.day}
                length={item.length}
                subjectId={item.subjectId}
                labId={item.labId}
              />}
            </For>
          </Match>
          <Match when={scheduleData.error}>
            <Error />
          </Match>
          <Match when={scheduleData.loading}>
            <Loading />
          </Match>
        </Switch>
      </div>
    </div>
  )
}
