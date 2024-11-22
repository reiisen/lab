import { Component, createSignal } from "solid-js"
import { Lab, Reserve, WithIndex } from "../utils/types"
import { IconTypes } from "solid-icons"
import { FiCpu, FiDatabase, FiActivity, FiCodepen, FiCheck, FiX } from 'solid-icons/fi'
import { useParams } from "@solidjs/router"
import { createReserve } from "../utils/fetch"
import { BasicPopup, Popup } from "./ui/Popup"
import { CardWithIcon } from "./ui/Card"
import { SignalInput } from "./ui/TextInput"
import { toast } from "./ui/Toast"

const formContainer = `flex flex-col gap-3`

const jaringanRegex = /Jaringan/;
const basisRegex = /Basis/;
const dasarRegex = /Dasar/;

function checkIcon(str: string): IconTypes {
  if (jaringanRegex.test(str)) return FiActivity;
  if (basisRegex.test(str)) return FiDatabase;
  if (dasarRegex.test(str)) return FiCpu;
  return FiCodepen;
}

export const TimeslotCard = <T extends object,>(props: WithIndex<{ value: T, timeslot: number, popup: Component<T> }>) => {
  const triggerCard = () => <CardWithIcon text={timeslotToString(props.index)} icon={FiX}>UNAVAILABLE</CardWithIcon>
  return (
    <div>
      <Popup<typeof props.value> value={props.value} trigger={triggerCard} content={props.popup} />
    </div>
  )
}

export const LabCard: Component<Lab> = (props) => {
  const labIcon = checkIcon(props.name);
  return (
    <a href={`labs/pick/${props.id}`}>
      <CardWithIcon text={props.name} icon={labIcon}>Reserve here &nbsp;&#10551;</CardWithIcon>
    </a>
  )
}

export const ReservedCard = (props: WithIndex<Reserve>) => {
  const ReservedPopup: Component<Reserve> = (props) => {
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
      <TimeslotCard<Reserve> value={props} timeslot={props.date.getHours()} popup={ReservedPopup} index={props.index} />
    </>
  )
}

export const VacantCard = (props: { index: number, date: Date, refetcher?: Function }) => {
  const [name, setName] = createSignal<string>("");
  const [reason, setReason] = createSignal<string>("");
  const params = useParams();
  const date = new Date(props.date);
  date.setHours(props.index, 0);
  const FormPopup: Component = () => {
    return (
      <div class={formContainer}>
        <label>Name:</label>
        <SignalInput signal={[name, setName]} />
        <label>Reason:</label>
        <SignalInput signal={[reason, setReason]} />
        <button onClick={async () => {
          const result = await createReserve(
            {
              labId: parseInt(params.id),
              name: name(),
              reason: reason(),
              date: date,
              length: 1
            }
          );
          if (result && props.refetcher) {
            toast("Nice");
            props.refetcher();
          }
        }}>
          Reserve
        </button>
      </div>
    )
  }
  const card = () => <CardWithIcon text={timeslotToString(props.index)} icon={FiCheck}>AVAILABLE</CardWithIcon>
  return (
    <BasicPopup trigger={card} content={FormPopup} />
  )
}

export const RestrictedCard = () => {
  return (
    <CardWithIcon text="Restricted" icon={FiX} />
  )
}

function timeslotToString(timeslot: number) {
  return `${timeslot}:00 - ${timeslot + 1}:00`;
}

function timeToString(timeslot: number) {
  return `${timeslot}:00`;
}
