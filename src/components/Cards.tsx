import { Component, createSignal } from "solid-js"
import { Computer, Filter, FilterLabel, Lab, Reserve, Room, WithInactive, WithIndex } from "../utils/types"
import { IconTypes } from "solid-icons"
import { FiCpu, FiDatabase, FiActivity, FiCodepen, FiCheck, FiX } from 'solid-icons/fi'
import { useParams } from "@solidjs/router"
import { createReserve } from "../utils/fetch"
import { BasicPopup, Popup, PopupWithObject } from "./ui/Popup"
import { CardWithIcon } from "./ui/Card"
import { SignalInput, Input } from "./ui/Input"
import { toast } from "./ui/Toast"
import { FaSolidComputer } from "solid-icons/fa"
import { IoCube, IoCubeOutline } from 'solid-icons/io'

const formContainer = `flex flex-col gap-3`

export const TimeslotCard = <T extends object,>(props: WithIndex<{ value: T, timeslot: number, popup: Component<T> }>) => {
  const triggerCard = () => <CardWithIcon text={timeslotToString(props.index)} icon={FiX} class="hover:bg-red-300" iconColor="#FF0000">UNAVAILABLE</CardWithIcon>
  return (
    <div>
      <PopupWithObject<typeof props.value> value={props.value} trigger={triggerCard} content={props.popup} />
    </div>
  )
}

export const LabCard: Component<WithInactive<Lab>> = (props) => {
  if (props.inactive) {
    return <CardWithIcon text={props.name} icon={IoCube} class="brightness-50 hover:brightness-10">Check Here &nbsp;&#10551;</CardWithIcon>
  }
  return (
    <a href={`/lab/${props.id}`}>
      <CardWithIcon text={props.name} icon={IoCube}>Check Here &nbsp;&#10551;</CardWithIcon>
    </a>
  )
}

export const RoomCard: Component<WithInactive<Room>> = (props) => {
  if (props.inactive) {
    return <CardWithIcon text={props.name} icon={IoCubeOutline} class="brightness-50 hover:brightness-10">Check Here &nbsp;&#10551;</CardWithIcon>
  }
  return (
    <a href={`/room/${props.id}`}>
      <CardWithIcon text={props.name} icon={IoCubeOutline}>Check Here &nbsp;&#10551;</CardWithIcon>
    </a>
  )
}

export const ComputerCard: Component<WithInactive<Computer>> = (props) => {
  if (props.inactive) {
    return <CardWithIcon text={props.name} icon={FaSolidComputer} class="brightness-50 hover:brightness-10">Check Here &nbsp;&#10551;</CardWithIcon>
  }
  return (
    <a href={`/lab/${useParams().id}/c/${props.id}`}>
      <CardWithIcon text={props.name} icon={FaSolidComputer}>Reserve here &nbsp;&#10551;</CardWithIcon>
    </a>
  )
}

export const ReservedCard = (props: WithIndex<Reserve>) => {
  const ReservedPopup: Component<Reserve> = (props) => {
    return (
      <>
        <span>{`Reserved`}</span>
        <span>{`Reserved by: ${props.nim}`}</span>
        <span>{`Reason: ${props.reason}`}</span>
      </>
    )
  }
  return (
    <>
      <TimeslotCard<Reserve> value={props} timeslot={props.date.getHours()} popup={ReservedPopup} index={props.index} />
    </>
  )
}

export const VacantCard = (props: { index: number, filter: Filter, onClick?: Function }) => {
  const [nim, setNim] = createSignal<string>("");
  const [reason, setReason] = createSignal<string>("");
  const params = useParams();
  const date = new Date(props.filter.date);
  date.setHours(props.index, 0);
  const FormPopup: Component = () => {
    return (
      <div class={formContainer}>
        <Input signal={[nim, setNim]} label="NIM" />
        <Input signal={[reason, setReason]} label="Tujuan" />
        <button onClick={async () => {
          const result = await createReserve(
            {
              labId: props.filter.labId ? props.filter.labId : undefined,
              computerId: props.filter.computerId ? props.filter.computerId : undefined,
              roomId: props.filter.roomId ? props.filter.roomId : undefined,
              nim: nim(),
              reason: reason(),
              date: date,
              length: 1
            }
          );
          if (result && props.onClick) {
            toast("Success", "Reservation Successfully Booked");
            props.onClick();
          } else toast("Failed", undefined, "error");
        }}>
          Reserve
        </button>
      </div>
    )
  }
  const card = () => <CardWithIcon text={timeslotToString(props.index)} icon={FiCheck} class="hover:bg-green-300" iconColor="#00FF00">AVAILABLE</CardWithIcon>
  return (
    <Popup title="Fill the form" trigger={card} content={FormPopup} />
  )
}

export const RestrictedCard = () => {
  return (
    <CardWithIcon text="Restricted" icon={FiX} class="hover:brightness-50" />
  )
}

function timeslotToString(timeslot: number) {
  return `${timeslot}:00 - ${timeslot + 1}:00`;
}
