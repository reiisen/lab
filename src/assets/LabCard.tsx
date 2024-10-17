import { Component } from "solid-js";

export const LabCard: Component<{ name: string, code: string, floor: string }> = (props) => {
  return (
    <div class="flex flex-col gap-2">
      <span>{props.name}</span>
      <span>{props.code}</span>
      <span>{props.floor}</span>
    </div>
  )
}
