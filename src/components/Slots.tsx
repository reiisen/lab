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

import { readIncompleteReserves } from "../utils/fetch";
import { useParams } from "@solidjs/router";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { ScheduleGrid } from "./Grid";
import { SimpleDatepicker } from "solid-simple-datepicker";
import { Portal } from "solid-js/web";
import { Filter } from "../utils/types";

const overlay = "h-screen w-screen backdrop-blur-sm backdrop-brightness-75 fixed left-1 top-1 -translate-x-1 -translate-y-1"


export const Slots: Component = () => {
  const [date, setDate] = createSignal<Date>(new Date());
  const [open, setOpen] = createSignal(false);
  const params = useParams();

  const [filter, setFilter] = createSignal<Filter>({
    labId: useParams().id ? parseInt(useParams().id) : undefined,
    computerId: useParams().cid ? parseInt(useParams().cid) : undefined,
    roomId: useParams().rid ? parseInt(useParams().rid) : undefined,
    date: date()
  });

  // const [filter, setFilter] = createSignal({
  //   labId: parseInt(useParams().id),
  //   date: date(),
  // });

  const currentYear = new Date().getFullYear();

  const [data, { mutate, refetch }] = createResource(filter, readIncompleteReserves);

  const DateButton = () =>
    <div class="flex flex-row gap-1">
      <button
        class="mt-2 px-3 py-2 hover:brightness-90 bg-white text-neutral-600"
        onClick={() => { const newDate = new Date(date()); newDate.setDate(newDate.getDate() - 1); setDate(newDate) }}
      >
        {`<`}
      </button>
      <button
        class="mt-2 px-3 py-2 border-b-2 border-neutral-400 hover:brightness-90 bg-white text-neutral-600"
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
      >
        {date().toLocaleDateString('id-ID')}
      </button>
      <button
        class="mt-2 px-3 py-2 hover:brightness-90 bg-white text-neutral-600"
        onClick={() => { const newDate = new Date(date()); newDate.setDate(newDate.getDate() + 1); setDate(newDate) }}
      >
        {`>`}
      </button>
    </div>;

  const DatePicker = () =>
    <SimpleDatepicker
      class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      selectedDate={date()}
      onChange={(date) => { setDate(date); refetch(); }}
      onFooterDone={() => setOpen(false)}
      startYear={currentYear}
      endYear={currentYear + 3}
    />;

  createMemo(() => setFilter({
    labId: useParams().id ? parseInt(useParams().id) : undefined,
    computerId: useParams().cid ? parseInt(useParams().cid) : undefined,
    roomId: useParams().rid ? parseInt(useParams().rid) : undefined,
    date: date()
  }))

  createEffect(() => {
    console.log('Current params:', filter());
    console.log('Current data:', data());
  });

  return (
    <>
      <DateButton />
      <Switch>
        <Match
          when={data.state === "ready"}
        >
          <ScheduleGrid data={data()!} filter={filter()} refetcher={refetch} />
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
