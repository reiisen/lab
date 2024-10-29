import { Component } from "solid-js";
import { HasTimeslot, Lab, Reserve, Schedule, Timeslot } from "../utils/types";

export const LabCard: Component<Lab> = (props) => {
  return (
    <a
      href={`/schedule/${props.id}`}
      class="block hover:scale-105 transform transition duration-300"
    >
      <div class="flex flex-1 flex-col bg-gray-800 h-36 rounded-lg p-4 shadow-lg hover:shadow-xl transition">
        <span class="text-xl font-bold text-gray-100 mb-1">{props.name}</span>
        <span class="text-gray-300 text-sm">{props.code}</span>
        <span class="text-gray-300 text-sm">Lantai {props.floor}</span>
        <span class="text-sm text-green-500 font-semibold self-end mt-auto">
          Reservation Available
        </span>
      </div>
    </a>
  );
};

export const TimeslotCard = <T extends Timeslot>(props: HasTimeslot<T>) => {
  const ChildComponent: Component<HasTimeslot<T>> = (props) => {
    return (
      <>
        <span class="text-gray-300">
          Timeslot: {timeslotToString(props.timeslot)} <br />
          <span class="text-red-500 font-semibold">UNAVAILABLE</span>
        </span>
      </>
    );
  };
  return (
    <div class="flex flex-col bg-gray-800 shadow-lg h-32 rounded-lg px-4 py-2">
      <ChildComponent {...props} />
    </div>
  );
};

export const ReservedCard: Component<Reserve> = (props) => {
  return (
    <a href="/lol">
      <TimeslotCard<typeof props> {...props} />
    </a>
  );
};

export const ScheduleCard: Component<Schedule> = (props) => {
  return (
    <a href="/iidx">
      <TimeslotCard<typeof props> {...props} />
    </a>
  );
};

export const EmptyTimeslotCard: Component<{ timeslot: number; day: number }> = (
  props
) => {
  return (
    <div class="flex flex-col bg-gray-800 shadow-lg h-32 rounded-lg px-4 py-2">
      <span class="text-gray-300">
        Timeslot: {timeslotToString(props.timeslot)} <br />
        <span class="text-green-500 font-semibold">AVAILABLE</span>
      </span>
    </div>
  );
};

function timeslotToString(timeslot: number) {
  switch (timeslot) {
    case 0:
      return "07:00 - 08:00";
    case 1:
      return "08:00 - 08:00";
    case 2:
      return "09:00 - 10:00";
    case 3:
      return "10:00 - 11:00";
    case 4:
      return "11:00 - 12:00";
    case 5:
      return "12:00 - 13:00";
    case 6:
      return "13:00 - 14:00";
    case 7:
      return "14:00 - 15:00";
    case 8:
      return "15:00 - 16:00";
    case 9:
      return "16:00 - 17:00";
    case 10:
      return "17:00 - 18:00";
    default:
      return "INVALID TIMESLOT";
  }
}
