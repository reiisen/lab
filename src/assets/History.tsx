import { createResource, createSignal, Resource, Show, Signal } from "solid-js"
import { Lab, Reserve } from "../utils/types"
import { Dropdown, DropdownObject } from "./ui/Dropdown"
import { readLabs, readReserves } from "../utils/fetch"
import { Table } from "./ui/Table";

const daysData = [...Array(32).keys().map((value) => value.toString())];
const monthsData = [...Array(13).keys().map((value) => value.toString())];
daysData.shift();
monthsData.shift();

type HistoryParams = {
  labs: Lab[],
  days: Signal<string[]>,
  months: Signal<string[]>,
  years: string[]
}

type HistorySignals = {
  lab: Signal<Lab>,
  day: Signal<string>,
  days: Signal<string[]>,
  month: Signal<string>,
  months: Signal<string[]>,
  year: Signal<string>,
}

export const History = () => {
  const [labs] = createResource(readLabs);
  const years = ['2024'];

  const [days, setDays] = createSignal(daysData);
  const [months, setMonths] = createSignal(monthsData);

  return (
    <div class="flex flex-col gap-5 w-3/4">
      <Show when={labs.state === 'ready'}>
        <HistoryRoot params={{ labs: labs()!, days: [days, setDays], months: [months, setMonths], years: years }} />
      </Show>
    </div>
  )
}

const LabOption = (props: { labs: Lab[], labSignal: Signal<Lab> }) => {
  return (
    <DropdownObject<Lab> data={props.labs} signal={props.labSignal} />
  )
}

const DayMonthOption = (props: { days: Signal<string[]>, daySignal: Signal<string>, months: Signal<string[]>, monthSignal: Signal<string> }) => {
  const [days, setDays] = props.days;
  const [months, setMonths] = props.months;

  const [day, setDay] = props.daySignal;
  const [month, setMonth] = props.monthSignal;

  const checkIfThisMonthIsEitherThirtyOrThirtyOne = () => {
    if (month() === '7' || month() === '8' || parseInt(month()) % 2 === 1) {
      setDays(daysData);
    } else {
      const data = [...daysData];
      data.pop();
      setDays([...data]);
    }
  }
  return (
    <>
      <Dropdown data={days()} signal={props.daySignal} />
      <Dropdown data={months()} signal={props.monthSignal} customOnChange={() => checkIfThisMonthIsEitherThirtyOrThirtyOne()} />
    </>
  )
}

const YearOption = (props: { years: string[], yearSignal: Signal<string> }) => {
  return (
    <Dropdown data={props.years} signal={props.yearSignal} />
  )
}

const Options = (props: { params: HistoryParams, signals: HistorySignals }) => {
  return (
    <div class="flex flex-row gap-2">
      <LabOption labs={props.params.labs} labSignal={props.signals.lab} />
      <DayMonthOption days={props.params.days} daySignal={props.signals.day} months={props.params.months} monthSignal={props.signals.month} />
      <YearOption years={props.params.years} yearSignal={props.signals.year} />
    </div>
  )
}

const HistoryRoot = (props: { params: HistoryParams }) => {

  const [days, setDays] = props.params.days;
  const [months, setMonths] = props.params.months;

  //Signals
  const [lab, setLab] = createSignal(props.params.labs[0]);
  const [day, setDay] = createSignal(days()[0]);
  const [month, setMonth] = createSignal(months()[0]);
  const [year, setYear] = createSignal(props.params.years[0]);

  const [filter, setFilter] = createSignal({ labId: lab().id, date: new Date() });

  //Resource, i will kys
  const [reserves] = createResource(filter(), readReserves, { initialValue: [] });

  return (
    <>
      <Options
        params={{ ...props.params }}
        signals={
          {
            lab: [lab, setLab],
            day: [day, setDay],
            month: [month, setMonth],
            year: [year, setYear],
            days: [days, setDays],
            months: [months, setMonths]
          }
        }
      />
      <Show when={reserves.state === 'ready'}>
        <Table<Reserve> data={reserves()} />
      </Show>
    </>
  )
}
