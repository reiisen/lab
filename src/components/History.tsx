import { createEffect, createMemo, createResource, createSignal, Show } from "solid-js"
import { Computer, FilterLabel, Lab, Reserve, Room, WithTimestamp } from "../utils/types"
import { DropdownFilter, DropdownObject } from "./ui/Dropdown"
import { readComputers, readLabs, readReserves, readRooms } from "../utils/fetch"
import { Table } from "./ui/Table";
import { SimpleDatepicker } from "solid-simple-datepicker";
import { Loading } from "./Loading";
import "solid-simple-datepicker/styles.css";
import { Portal } from "solid-js/web";
import { Switch } from "./ui/Switch";
import { CustomSelector } from "./ui/Select";

function isoToFormattedDateString(iso: string): string {
  // Validate ISO format (basic validation)
  if (!/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/.test(iso)) {
    throw new Error("Invalid ISO date format");
  }

  // Month names and weekday names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const weekdayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  // Extract parts from the ISO string
  const [datePart, timePart] = iso.split("T");
  const [year, month, day] = datePart.split("-").map(Number);

  // Handle time part and remove milliseconds and trailing Z or timezone offset
  const timeComponents = timePart.replace(/[Z+].*$/, "").split(":");
  const hours = parseInt(timeComponents[0], 10);
  const minutes = parseInt(timeComponents[1], 10);
  const seconds = parseInt(timeComponents[2].split(".")[0], 10); // Remove milliseconds if present

  // Calculate day of the week using a Date object
  const jsDate = new Date(year, month - 1, day);
  const dayOfWeek = weekdayNames[jsDate.getUTCDay()];

  // Format the date string as "Day of the week, day month year, time"
  const formattedDate = `${dayOfWeek}, ${day.toString().padStart(2, '0')} ${monthNames[month - 1]
    } ${year}, ${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return formattedDate;
}

const overlay = "h-screen w-screen backdrop-blur-sm backdrop-brightness-75 fixed left-1 top-1 -translate-x-1 -translate-y-1"

type HistoryRecord = {
  NIM: string,
  Reason: string,
  Created: string,
  Date: string,
  Status: string
}

const dummyRecord = {
  NIM: "-",
  Reason: "-",
  Created: "-",
  Date: "-",
  Status: "-"
}


const toFilter = (lab?: Lab, room?: Room): FilterLabel => {
  if (lab) {
    return {
      filter: {
        labId: lab.id,
      },
      name: lab.name
    }
  } else if (room) {
    return {
      filter: {
        roomId: room.id,
      },
      name: room.name
    }
  } else return { filter: {}, name: "Error" }
}

const createFilters = (labs: Lab[], rooms: Room[], date: Date): FilterLabel[] => {
  const fLabs: FilterLabel[] = labs.map((value) => { return { ...toFilter(value, undefined), date: date } });
  const fRooms: FilterLabel[] = rooms.map((value) => { return { ...toFilter(undefined, value), date: date } });
  return [...fLabs, ...fRooms];
}

function reserveToRecord(reserve: WithTimestamp<Reserve>): HistoryRecord {
  return {
    NIM: reserve.nim,
    Reason: reserve.reason,
    Created: isoToFormattedDateString(reserve.createdAt.toString()),
    Date: isoToFormattedDateString(reserve.date.toString()),
    Status: reserve.status
  }
}

export const History = () => {
  const [labs] = createResource(readLabs, { initialValue: [] });
  const [rooms] = createResource(readRooms, { initialValue: [] });
  return (
    <div class="flex flex-col w-3/4">
      <Show when={labs.state === 'ready' && rooms.state === 'ready'} fallback={<Loading />}>
        <HistoryRoot labs={labs()} rooms={rooms()} />
      </Show>
    </div>
  )
}

const HistoryRoot = (props: { labs: Lab[], rooms: Room[] }) => {
  const [lab, setLab] = createSignal<Lab>(props.labs[0]);
  const [room, setRoom] = createSignal<Room>(props.rooms[0]);
  const [date, setDate] = createSignal<Date>(new Date());
  const [open, setOpen] = createSignal(false);
  const filters = createFilters(props.labs, props.rooms, date());
  const [filter, setFilter] = createSignal(filters[0]);
  const [F, setF] = createSignal({ ...filter().filter, date: date() });
  createMemo(() => {
    setF({ ...filter().filter, date: date() })
  })
  const [reserves] = createResource(F, readReserves, { initialValue: [] });
  console.log(filters);
  console.log(props.labs)
  createEffect(() => console.log(F()))

  return (
    <>
      <div class="flex flex-row">
        <CustomSelector
          options={filters}
          selectedSignal={[filter, setFilter]}
          placeholder="Select a controlled location"
        />
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
        </button>

      </div>
      <Show when={reserves.state === 'ready'}>
        <Table<HistoryRecord> data={reserves() ? reserves().map((value) => reserveToRecord(value as WithTimestamp<Reserve>)) : [dummyRecord]} />
      </Show>
      <Show when={open()}>
        <Portal>
          <div class={overlay} onClick={() => setOpen(false)} />
          <SimpleDatepicker
            class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            selectedDate={date()}
            onChange={(date) => { setDate(date) }}
            onFooterDone={() => setOpen(false)}
          />
        </Portal>
      </Show>
    </>
  )
}
