import { Select } from "@kobalte/core/select";
import { FaSolidArrowDown } from "solid-icons/fa";
import { Component, Signal } from "solid-js";

export const DropdownObject = <T extends { id: any, name: string },>(props: { data: T[], signal: Signal<T> }) => {
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

export const DropdownFilter = <T extends { filter: any, name: string },>(props: { data: T[], signal: Signal<T> }) => {
  const [get, set] = props.signal;
  return (
    <Select<T>
      value={get()}
      onChange={set}
      optionValue="filter"
      optionTextValue="name"
      disallowEmptySelection={true}
      options={props.data}
      itemComponent={props => (
        <Select.Item item={props.item} class="select__item">
          <Select.ItemLabel>{props.item.rawValue.name}</Select.ItemLabel>
        </Select.Item>
      )}
    >
      <Select.Trigger class="select__trigger" aria-label="Filter">
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

export const Dropdown: Component<{ data: string[], signal: Signal<string>, customOnChange?: Function }> = (props) => {
  const [get, set] = props.signal;
  return (
    <Select
      value={get()}
      onChange={(value) => {
        if (props.customOnChange) props.customOnChange();
        set(value!);
      }}
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
