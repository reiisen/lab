import { Component } from "solid-js";
import { WithIndex, WithTimeslot, Lab, Reserve, Course, Subject, Timeslot } from "../utils/types";
import { Dialog } from "@kobalte/core/dialog";
import { TextField } from "@kobalte/core/text-field";

export const cardStyle = "text-left flex flex-1 flex-col bg-slate-100 border-2 min-h-44 border-white rounded-lg p-4 shadow-md text-slate-700";


export const LabCard: Component<Lab> = (props) => {
  return (
    <a
      href={`/course/${props.id}`}
    >
      <div class={cardStyle}>
        <span class="text-xl font-bold mb-1">{props.name}</span>
        <span class="text-sm">{props.code}</span>
        <span class="text-sm">Lantai {props.floor}</span>
        <span class="text-sm text-green-500 font-semibold self-end mt-auto">
          Available
        </span>
      </div>
    </a>
  );
};

export const TimeslotCard = <T extends Timeslot | { date: Date }>(props: WithTimeslot<T>) => {
  const ChildComponent: Component<WithTimeslot<T>> = (props) => {
    return (
      <>
        <span class="">Timeslot: {timeslotToString(props.timeslot)}</span>
        <span class="text-red-500 font-semibold">UNAVAILABLE</span>
      </>
    );
  };
  return (
    <ChildComponent {...props} />
  );
};

export const Redux = (): Function => {
  return Redux();
}

export const ReservedCard = (props: WithIndex<Reserve>) => {
  return (
    <Dialog>
      <Dialog.Trigger class={cardStyle}>
        <TimeslotCard<typeof props> {...props} timeslot={props.index} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="dialog__overlay" />
        <div class="dialog__positioner">
          <Dialog.Content class="dialog__content">
            <div class="dialog__header">
              <Dialog.Title class="dialog__title">Information</Dialog.Title>
              <Dialog.CloseButton class="dialog__close-button">
                <button>X</button>
              </Dialog.CloseButton>
            </div>
            <Dialog.Description class="dialog__description flex flex-col w-fit">
              <span>Reserved by: {props.name}</span>
              <span>Reason: {props.reason}</span>
              <span>From: {`${timeToString(props.timeslot)} - ${timeToString(props.timeslot + props.length)}`}</span>
            </Dialog.Description>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog>
  );
};


export const ScheduleCard = (props: WithIndex<Course & { subject: Subject }>) => {
  return (
    <Dialog>
      <Dialog.Trigger class={cardStyle}>
        <TimeslotCard<typeof props> {...props} timeslot={props.index} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="dialog__overlay" />
        <div class="dialog__positioner">
          <Dialog.Content class="dialog__content">
            <div class="dialog__header">
              <Dialog.Title class="dialog__title">Information</Dialog.Title>
              <Dialog.CloseButton class="dialog__close-button">
                <button>X</button>
              </Dialog.CloseButton>
            </div>
            <Dialog.Description class="dialog__description flex flex-col w-fit">
              <span>Reserved for: {props.subject.name}</span>
              <span>Dosen: {props.subject.dosen}</span>
              <span>From: {`${timeToString(props.timeslot)} - ${timeToString(props.timeslot + props.length)}`}</span>
            </Dialog.Description>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog>
  );
};

export const EmptyTimeslotCard: Component<{ timeslot: number; day: number }> = (
  props
) => {
  return (
    <Dialog>
      <Dialog.Trigger class={cardStyle}>
        <span class="">
          Timeslot: {timeslotToString(props.timeslot)} <br />
          <span class="text-green-500 font-semibold">AVAILABLE</span>
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="dialog__overlay" />
        <div class="dialog__positioner">
          <Dialog.Content class="dialog__content">
            <div class="dialog__header">
              <Dialog.Title class="dialog__title">Information</Dialog.Title>
              <Dialog.CloseButton class="dialog__close-button">
                <button>X</button>
              </Dialog.CloseButton>
            </div>
            <Dialog.Description class="dialog__description flex flex-col w-fit">
              <TextField class="text-field">
                <TextField.Label class="text-field__label">Nama</TextField.Label>
                <TextField.Input class="text-field__input" />
              </TextField>
              <TextField class="text-field">
                <TextField.Label class="text-field__label">Alasan</TextField.Label>
                <TextField.Input class="text-field__input" />
              </TextField>
              <button>Submit</button>
            </Dialog.Description>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog>
  );
};

export const RestrictedTimeslotCard: Component = () => {
  return (
    <div class={cardStyle}>
      <span class="">
        <span class="text-purple-500 font-semibold">RESTRICTED</span>
      </span>
    </div>
  )
}

function timeslotToString(timeslot: number) {
  switch (timeslot) {
    case 0:
      return "07:00 - 08:00";
    case 1:
      return "08:00 - 09:00";
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

function timeToString(timeslot: number) {
  switch (timeslot) {
    case 0:
      return "07:00";
    case 1:
      return "08:00";
    case 2:
      return "09:00";
    case 3:
      return "10:00";
    case 4:
      return "11:00";
    case 5:
      return "12:00";
    case 6:
      return "13:00";
    case 7:
      return "14:00";
    case 8:
      return "15:00";
    case 9:
      return "16:00";
    case 10:
      return "17:00";
    case 11:
      return "18:00";
    default:
      return "INVALID TIMESLOT";
  }
}
