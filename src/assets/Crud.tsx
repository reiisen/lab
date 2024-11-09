import { Component, createResource, createSignal, Show, Signal } from "solid-js"
import { Tabs } from "@kobalte/core/tabs";
import { Select } from "@kobalte/core/select";
import type { Lab, Subject } from "../utils/types";
import { createCourse, readLabs, readSubjects } from "../utils/fetch";
import { FaSolidArrowDown } from 'solid-icons/fa'
import { Table } from "./Table";

const crudContentStyle = "flex flex-col gap-8";
const dayIndex = new Map<string, number>()
  .set('monday', 0).set('tuesday', 1)
  .set('wednesday', 2).set('thursday', 3)
  .set('friday', 4).set('saturday', 5);

const timeIndex = new Map<string, number>()
  .set('07:00', 0).set('08:00', 1)
  .set('09:00', 2).set('10:00', 3)
  .set('11:00', 4).set('12:00', 5)
  .set('13:00', 6).set('14:00', 7)
  .set('15:00', 8).set('16:00', 9)
  .set('17:00', 10)

export const Crud: Component = () => {
  const [labData] = createResource(readLabs);
  const [subjectData] = createResource(readSubjects);
  return (
    <div class="flex flex-1 flex-row py-10 lg:w-3/4 md:w-3/4">
      <Tabs aria-label="Main navigation" class="tabs">
        <Tabs.List class="tabs__list">
          <Tabs.Trigger class="tabs__trigger" value="create">Create</Tabs.Trigger>
          <Tabs.Trigger class="tabs__trigger" value="read">Read</Tabs.Trigger>
          <Tabs.Trigger class="tabs__trigger" value="update">Update</Tabs.Trigger>
          <Tabs.Trigger class="tabs__trigger" value="delete">Delete</Tabs.Trigger>
          <Tabs.Indicator class="tabs__indicator" />
        </Tabs.List>

        <Tabs.Content class="tabs__content" value="create">
          <Show when={labData.state === 'ready' && subjectData.state === 'ready'}>
            <CrudCreate labs={labData()!} subjects={subjectData()!} />
          </Show>
        </Tabs.Content>

        <Tabs.Content class="tabs__content" value="read">
          <Show when={labData.state === 'ready' && subjectData.state === 'ready'}>
            <CrudRead labs={labData()!} subjects={subjectData()!} />
          </Show>
        </Tabs.Content>

        <Tabs.Content class="tabs__content" value="update">
          <CrudUpdate />
        </Tabs.Content>

        <Tabs.Content class="tabs__content" value="delete">
          <CrudDelete />
        </Tabs.Content>

      </Tabs>
    </div>
  )
}

const DropdownObject = <T extends { id: number, name: string },>(props: { data: T[], signal: Signal<T> }) => {
  const [get, set] = props.signal;
  return (
    <Select<T>
      value={get()}
      onChange={set}
      optionValue="id"
      optionTextValue="name"
      disallowEmptySelection={true}
      options={props.data}
      itemComponent={props => (
        <Select.Item item={props.item} class="select__item">
          <Select.ItemLabel>{props.item.rawValue.name}</Select.ItemLabel>
        </Select.Item>
      )}
    >
      <Select.Trigger class="select__trigger" aria-label="Fruit">
        <Select.Value<T> class="select__value">
          {state => state.selectedOption().name}
        </Select.Value>
        <Select.Icon class="select__icon">
          <FaSolidArrowDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content class="select__content">
          <Select.Listbox class="select__listbox" />
        </Select.Content>
      </Select.Portal>
    </Select>
  );
}

const Dropdown: Component<{ data: string[], signal: Signal<string> }> = (props) => {
  const [get, set] = props.signal;
  return (
    <Select
      value={get()}
      onChange={set}
      options={props.data}
      disallowEmptySelection={true}
      itemComponent={props => (
        <Select.Item item={props.item} class="select__item">
          <Select.ItemLabel>{props.item.rawValue}</Select.ItemLabel>
        </Select.Item>
      )}
    >
      <Select.Trigger class="select__trigger" aria-label="Fruit">
        <Select.Value<string> class="select__value">
          {state => state.selectedOption()}
        </Select.Value>
        <Select.Icon class="select__icon">
          <FaSolidArrowDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content class="select__content">
          <Select.Listbox class="select__listbox" />
        </Select.Content>
      </Select.Portal>
    </Select>
  );
}

const CrudCreate: Component<{ labs: Lab[], subjects: Subject[] }> = (props) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const lengths = ["1", "2", "3"];
  const timeslots = [
    "07:00", "08:00",
    "09:00", "10:00",
    "11:00", "12:00",
    "13:00", "14:00",
    "15:00", "16:00",
    "17:00", "18:00",
  ];

  const [lab, setLab] = createSignal<Lab>(props.labs[0]);
  const [subject, setSubject] = createSignal<Subject>(props.subjects[0]);
  const [day, setDay] = createSignal<string>("Monday");
  const [length, setLength] = createSignal<string>("1");
  const [timeslot, setTimeslot] = createSignal<string>("07:00");
  return (
    <div class={crudContentStyle}>
      <div class="flex flex-col gap-2">
        <label>Choose a lab</label>
        <DropdownObject data={props.labs} signal={[lab, setLab]} />
      </div>
      <div class="flex flex-col gap-2">
        <label>Choose a subject</label>
        <DropdownObject data={props.subjects} signal={[subject, setSubject]} />
      </div>
      <div class="flex flex-col gap-2">
        <label>Choose a day</label>
        <Dropdown data={days} signal={[day, setDay]} />
      </div>
      <div class="flex flex-col gap-2">
        <label>Choose the length</label>
        <Dropdown data={lengths} signal={[length, setLength]} />
      </div>
      <div class="flex flex-col gap-2">
        <label>Choose the start time</label>
        <Dropdown data={timeslots} signal={[timeslot, setTimeslot]} />
      </div>
      <button
        onClick={() => createCourse({
          labId: lab().id,
          subjectId: subject().id,
          day: dayIndex.get(day().toLowerCase())!,
          length: parseInt(length()),
          timeslot: timeIndex.get(timeslot())!
        })}
        class="w-fit p-4"
      >
        Create
      </button>
    </div>
  )
}

const CrudRead: Component<{ labs: Lab[], subjects: Subject[] }> = (props) => {
  const [lab, setLab] = createSignal<Lab>(props.labs[0]);
  const [subject, setSubject] = createSignal<Subject>(props.subjects[0]);
  return (
    <div class={crudContentStyle}>
      <div class='flex flex-row gap-4'>
        <div class="flex flex-col gap-2">
          <label>Choose a lab</label>
          <DropdownObject data={props.labs} signal={[lab, setLab]} />
        </div>
        <div class="flex flex-col gap-2">
          <label>Choose a subject</label>
          <DropdownObject data={props.subjects} signal={[subject, setSubject]} />
        </div>
      </div>
      <Table<Lab> {...props.labs} />
    </div>
  )
}

const CrudUpdate: Component = () => {
  return (
    <div class={crudContentStyle}>
      hi
    </div>
  )
}

const CrudDelete: Component = () => {
  return (
    <div class={crudContentStyle}>
      hi
    </div>
  )
}
