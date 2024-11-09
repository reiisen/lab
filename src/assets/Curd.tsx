import { Component } from "solid-js"
import { CourseWithSubject, Reserve, WithIndex } from "../utils/types"

export const TimeslotCard = <T extends object,>(props: WithIndex<T & { timeslot: number, popup: Component<T> }>) => {
  return (
    <div>
      {timeslotToString(props.index)}
    </div>
  )
}

export const CourseCard = (props: WithIndex<CourseWithSubject>) => {
  const CoursePopup: Component<CourseWithSubject> = (props) => {
    return (
      <>
        <span>{`Used for a course`}</span>
        <span>{`Course name: ${props.subject.name}`}</span>
        <span>{`Course dosen: ${props.subject.dosen}`}</span>
        <span>{`Course period: ${timeToString(props.timeslot)}`}</span>
      </>
    )
  }
  return (
    <>
      <TimeslotCard<CourseWithSubject> {...props} popup={CoursePopup} index={props.index} />
    </>
  )
}

export const ReserveCard = (props: WithIndex<Reserve>) => {
  const ReservePopup: Component<Reserve> = (props) => {
    return (
      <>
        <span>{`Reserved`}</span>
        <span>{`Reserved by: ${props.name}`}</span>
        <span>{`Reason: ${props.reason}`}</span>
      </>
    )
  }
  return (
    <>
      <TimeslotCard<Reserve> {...props} timeslot={props.date.getHours()} popup={ReservePopup} index={props.index} />
    </>
  )
}

export const VacantCard = (props: { index: number }) => {
  return (
    <div class="">
      {timeslotToString(props.index)}
    </div>
  )
}

export const RestrictedCard = () => {
  return (
    <div>
      RESTRICTED
    </div>
  )
}

function timeslotToString(timeslot: number) {
  return `${timeslot}:00 - ${timeslot + 1}:00`;
}

function timeToString(timeslot: number) {
  return `${timeslot}:00`;
}
