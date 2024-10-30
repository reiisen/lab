import { Component } from "solid-js";
import { HasIndex, HasTimeslot, Lab, Reserve, Schedule, Timeslot } from "../utils/types";
import { Dialog } from "@kobalte/core/dialog";

export const LabCard: Component<Lab> = (props) => {
  return (
    <a
      href={`/schedule/${props.id}`}
    >
      <div class="flex flex-1 flex-col bg-zinc-800 h-44 rounded-lg p-4 shadow-xl hover:shadow-xl transition">
        <span class="text-xl font-bold text-gray-100 mb-1">{props.name}</span>
        <span class="text-gray-300 text-sm">{props.code}</span>
        <span class="text-gray-300 text-sm">Lantai {props.floor}</span>
        <span class="text-sm text-green-500 font-semibold self-end mt-auto">
          Available
        </span>
      </div>
    </a>
  );
};

export const TimeslotCard = <T extends Timeslot>(props: HasTimeslot<T>) => {
  const ChildComponent: Component<HasTimeslot<T>> = (props) => {
    return (
      <>
        <span class="text-gray-300">Timeslot: {timeslotToString(props.timeslot)}</span>
        <span class="text-red-500 font-semibold">UNAVAILABLE</span>
      </>
    );
  };
  return (
    <ChildComponent {...props} />
  );
};

export const ReservedCard = (props: HasIndex<Reserve>) => {
  return (
    <Dialog>
      <Dialog.Trigger class="text-left flex flex-1 flex-col bg-zinc-800 h-44 rounded-lg p-4 shadow-xl">
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
            <Dialog.Description class="dialog__description flex flex-col w-48">
              <span>Reserved by: {props.userId}</span>
              <span>Reason: {props.reason}</span>
              <span>From: {`${timeToString(props.timeslot)} - ${timeToString(props.timeslot + props.length)}`}</span>
            </Dialog.Description>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog>
  );
};

export const ScheduleCard = (props: HasIndex<Schedule>) => {
  return (
    <Dialog>
      <Dialog.Trigger class="text-left flex flex-1 flex-col bg-zinc-800 h-44 rounded-lg p-4 shadow-xl">
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
            <Dialog.Description class="dialog__description flex flex-col w-48">
              <span>Reserved for: {props.subjectId}</span>
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
    <div class="text-left flex flex-1 flex-col bg-zinc-800 h-44 rounded-lg p-4 shadow-xl">
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
