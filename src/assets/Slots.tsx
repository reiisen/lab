import {
  Component,
  createResource,
  createSignal,
  Match,
  Switch,
} from "solid-js";

import { readReserves, readCourses } from "../utils/fetch";
import { useParams } from "@solidjs/router";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { ScheduleGrid } from "./Grid";

export const Course: Component = () => {
  const [courseParam] = createSignal({
    labId: parseInt(useParams().id),
    day: new Date().getDay(),
  });
  const [reserveParam] = createSignal({
    labId: parseInt(useParams().id),
    date: new Date(),
  });
  const [courseData] = createResource(courseParam(), readCourses);
  const [reserveData] = createResource(reserveParam(), readReserves);
  return (
    <Switch>
      <Match
        when={courseData.state === "ready" && reserveData.state === "ready"}
      >
        <ScheduleGrid schedules={courseData()!} reserves={reserveData()!} />
      </Match>
      <Match when={courseData.loading || reserveData.loading}>
        <Loading />
      </Match>
      <Match when={courseData.error || reserveData.error}>
        <Error />
      </Match>
    </Switch>
  );
};
