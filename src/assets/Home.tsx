import { FiCodesandbox } from 'solid-icons/fi'
import { FiHelpCircle } from 'solid-icons/fi'
import type { Component } from "solid-js";
import { CardWithIcon } from './ui/Card';

const cardGrid = "grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
const cardLink = "no-underline"

export const Home: Component = () => {
  return (
    <>
      <div class={cardGrid}>
        <a href="/labs" class={cardLink}>
          <CardWithIcon text="Reserve" icon={FiCodesandbox}>Click here to start your reservation process</CardWithIcon>
        </a>
        <a href="/help" class={cardLink}>
          <CardWithIcon text="Help" icon={FiHelpCircle}>Click here to show a step by step process</CardWithIcon>
        </a>
      </div>
    </>
  );
};
