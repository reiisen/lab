import {
  Component,
  createEffect,
  createMemo,
  createResource,
  createSignal,
  Match,
  Show,
  Switch,
} from "solid-js";

import { readIncompleteReserves, readCourses } from "../utils/fetch";
import { useParams } from "@solidjs/router";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { ScheduleGrid } from "./Grid";
import { SimpleDatepicker } from "solid-simple-datepicker";
import { Portal } from "solid-js/web";
import { CourseWithSubject, Reserve } from "../utils/types";

const overlay = "h-screen w-screen backdrop-blur-sm backdrop-brightness-75 fixed left-1 top-1 -translate-x-1 -translate-y-1"

async function pack(param: [{ labId: number, day: number }, { labId: number, date: Date }]): Promise<[CourseWithSubject[], Reserve[]]> {
  return [await readCourses(param[0]), await readIncompleteReserves(param[1])];
}

export const Slots: Component = () => {
  const [date, setDate] = createSignal<Date>(new Date());
  const [open, setOpen] = createSignal(false);
  const [courseParam, setCourseParam] = createSignal({
    labId: parseInt(useParams().id),
    day: date().getDay(),
  });
  const [reserveParam, setReserveParam] = createSignal({
    labId: parseInt(useParams().id),
    date: date(),
  });
  const [filter, setFilter] = createSignal
    <[{ labId: number, day: number }, { labId: number, date: Date }]>([courseParam(), reserveParam()]);

  const [data, { mutate, refetch }] = createResource(filter, pack);

  const DateButton = () =>
    <button
      class="select__trigger"
      onClick={() => {
        setOpen(true);

        const handleEscape = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            setOpen(false);
            document.removeEventListener('keydown', handleEscape);
          }
        };

        document.addEventListener('keydown', handleEscape);
      }}
    >Pick Date
    </button>;

  const DatePicker = () =>
    <SimpleDatepicker
      class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      selectedDate={date()}
      onChange={(date) => { setDate(date); refetch(); }}
      onFooterDone={() => setOpen(false)}
    />;

  createMemo(() => setFilter([courseParam(), reserveParam()]));
  createMemo(() => setCourseParam({ labId: parseInt(useParams().id), day: date().getDay() }));
  createMemo(() => setReserveParam({ labId: parseInt(useParams().id), date: date() }));

  createEffect(() => {
    console.log('Current params:', filter());
    console.log('Current data:', data());
  });

  setInterval(() => console.log(filter()), 2000);

  return (
    <>
      <DateButton />
      <Switch>
        <Match
          when={data.state === "ready"}
        >
          <ScheduleGrid data={data()!} date={date()} />
        </Match>
        <Match when={data.loading}>
          <Loading />
        </Match>
        <Match when={data.error}>
          <Error />
        </Match>
      </Switch>
      <Show when={open()}>
        <Portal>
          <div class={overlay} onClick={() => setOpen(false)} />
          <DatePicker />
        </Portal>
      </Show>
    </>
  );
};
