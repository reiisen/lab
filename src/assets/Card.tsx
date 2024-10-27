import { Component } from "solid-js";
import { HasTimeslot, Lab, Reserve, Schedule, Timeslot } from "../utils/types";

export const LabCard: Component<Lab> = (props) => {
  return (
    <a href={`/schedule/${props.id}`}>
      <div class="flex flex-col bg-red-200 w-64 rounded-lg px-2 py-1">
        <span>{props.name}</span>
        <span>{props.code}</span>
        <span>Lantai {props.floor}</span>
      </div>
    </a>
  )
}

export const Empty: Component<{}> = () => {
  return (
    <></>
  )
}

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

export const TimeslotCard = <T extends Timeslot,>(props: HasTimeslot<T>) => {
  const ChildComponent: Component<HasTimeslot<T>> = (props) => {
    return (
      <>
        <span>Timeslot: {timeslotToString(props.timeslot)} UNAVAILABLE</span>
      </>
    )
  }
  return (
    <div class="flex flex-col">
      <ChildComponent {...props} />
    </div>
  )
}

export const EmptyTimeslotCard: Component<{ timeslot: number, day: number }> = (props) => {
  return (
    <div>
      <span>Timeslot: {timeslotToString(props.timeslot)} AVAILABLE</span>
    </div>
  )
}
