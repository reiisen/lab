import { Component } from "solid-js";
import { LabCard } from "./LabCard";

export const Reserve: Component = () => {
  return (
    <div class="flex flex-col gap-1">
      reserve..<br />
      <LabCard name="Lab Basis Kontol" code="LBK" floor="2" />
      <LabCard name="Lab Basis Memek" code="LBM" floor="2" />
      <LabCard name="Lab Basis Titit" code="LBT" floor="2" />
    </div>
  )
}
