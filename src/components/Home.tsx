import { FiCodesandbox } from "solid-icons/fi";
import { FiHelpCircle } from "solid-icons/fi";
import { createSignal, type Component } from "solid-js";
import { CardWithIcon } from "./ui/Card";
import { colorCycle } from "../utils/rgb";

const cardGrid = "grid grid-cols-1 md:grid-cols-2 gap-4 p-4";
const cardLink = "no-underline";
const welcomeContainer = "text-center p-4";
const welcomeTextTop = "text-3xl font-bold";
const welcomeTextBottom = "text-4xl font-bold mt-2";

export const Home: Component = () => {
  return (
    <>
      <div class={welcomeContainer}>
        <div class={welcomeTextBottom}>Reservasi Lab</div>
      </div>
      <div class={cardGrid}>
        <a href="/labs" class={cardLink}>
          <CardWithIcon text="Reserve" icon={FiCodesandbox}>
            Click here to start your reservation process
          </CardWithIcon>
        </a>
        <a href="/help" class={cardLink}>
          <CardWithIcon text="Help" icon={FiHelpCircle}>
            Click here to show a step by step process
          </CardWithIcon>
        </a>
      </div>
    </>
  );
};
