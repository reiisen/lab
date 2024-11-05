import {
  Component,
  createResource,
  createSignal,
  Match,
  Switch,
} from "solid-js";

import { readReserves, readSchedules } from "../utils/fetch";
import { useParams } from "@solidjs/router";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { ScheduleGrid } from "./Grid";

export const Schedule: Component = () => {
  const [param] = createSignal({
    labId: parseInt(useParams().id),
    day: new Date().getDay() - 1,
  });
  const [scheduleData] = createResource(param(), readSchedules);
  const [reserveData] = createResource(param(), readReserves);
  return (
    <Switch>
      <Match
        when={scheduleData.state === "ready" && reserveData.state === "ready"}
      >
        <ScheduleGrid schedules={scheduleData()!} reserves={reserveData()!} />
      </Match>
      <Match when={scheduleData.loading || reserveData.loading}>
        <Loading />
      </Match>
      <Match when={scheduleData.error || reserveData.error}>
        <Error />
      </Match>
    </Switch>
  );
};
