import { Component } from "solid-js";
import { Lab, Schedule } from "../utils/types";

export const LabCard: Component<Omit<Lab, 'id'>> = (props) => {
  return (
    <div class="flex flex-col bg-red-200 w-64 rounded-lg px-2 py-1">
      <span>{props.name}</span>
      <span>{props.code}</span>
      <span>Lantai {props.floor}</span>
    </div>
  )
}

export const ScheduleCard: Component<Omit<Schedule, 'id'>> = (props) => {
  return (
    <div class="flex flex-col bg-red-200 w-64 rounded-lg px-2 py-1">
      <span>{props.timeslot}</span>
      <span>{props.day}</span>
      <span>{props.length}</span>
      <span>{props.subjectId}</span>
      <span>{props.labId}</span>
    </div>
  )
}
