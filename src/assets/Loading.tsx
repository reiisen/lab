import HuoHuo from "./huo.gif";
import { Component } from "solid-js";

export const Loading: Component = () => {
  return (
    <div>
      Fetching Resources
      <img src={HuoHuo} alt="Loading" class="w-96" />
    </div>
  );
}
