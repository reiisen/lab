import { Component } from "solid-js";
import { ThreeDots } from "solid-spinner";
import { overlay } from "./ui/styles/Loading";

export const Loading: Component = () => {
  return (
    <>
      <div class={overlay}>
        <ThreeDots color="#FFFFFF" />
      </div>
    </>
  );
}
