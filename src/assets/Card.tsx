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

// const TimeslotCard = <T extends Timeslot,>(props: {
//   child?: Component<{ attributes: HasTimeslot<T> }>,
//   childProps?: HasTimeslot<T>
// }) => {
//   return (
//     <div class="flex flex-col">
//       {props.child && props.childProps ? <props.child attributes={props.childProps} /> : <Empty />}
//     </div>
//   )
// }
//

const TimeslotCard = <T extends Timeslot,>(props: HasTimeslot<T>) => {
  const ChildComponent: Component<HasTimeslot<T>> = (props) => {
    return (
      <>
        {props.length}
        {props.day}
        {props.timeslot}
      </>
    )
  }
  return (
    <div class="flex flex-col">
      <ChildComponent {...props} />
    </div>
  )
}

/**
 * Example usage?
 * <TimeslotCard child={**the time component**} childProps={**its properties**}
 * */
