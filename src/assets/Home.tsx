import { FiCodesandbox } from 'solid-icons/fi'
import { FiHelpCircle } from 'solid-icons/fi'
import type { IconTypes } from "solid-icons";
import type { Component, JSX } from "solid-js";

const homeCard = "lg:max-w-96 flex flex-col bg-neutral-100 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 border border-neutral-100"
const iconContainer = "bg-neutral-200 w-12 h-12 rounded-lg flex items-center justify-center"
const cardText = "font-semibold text-xl text-neutral-800 mt-4"
const cardGrid = "grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
const cardLink = "no-underline"

export const Home: Component = () => {
  return (
    <div class={cardGrid}>
      <a href="/reserve" class={cardLink}>
        <HomeCard text="Reserve" icon={FiCodesandbox}>Click here to start your reservation process</HomeCard>
      </a>
      <a href="/help" class={cardLink}>
        <HomeCard text="Help" icon={FiHelpCircle}>Click here to show a step by step process</HomeCard>
      </a>
    </div>
  );
};

const HomeCard = (props: { text: string, icon: IconTypes, children: JSX.Element }) => {
  return (
    <div class={homeCard}>
      <div class={iconContainer}>
        <props.icon size={24} color="#333333" />
      </div>
      <span class={cardText}>{props.text}</span>
      <span>{props.children}</span>
    </div>
  )
}
