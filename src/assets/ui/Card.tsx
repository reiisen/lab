import { IconTypes } from "solid-icons"
import { createSignal, JSX } from "solid-js"
import { colorCycle } from "../../utils/rgb"

const cardContainer = `
  lg:max-w-96 flex gap-3 flex-col bg-neutral-100 rounded-lg p-6 hover:brightness-90
  transition-brightness duration-200 border border-neutral-100
`
const cardIconContainer = "bg-neutral-200 w-12 h-12 rounded-lg flex items-center justify-center"
const cardText = "font-semibold text-xl text-neutral-800 mt-2"

const [iconColor, setIconColor] = createSignal("#666666");
colorCycle(setIconColor);

export const CardWithIcon = (props: { text: string, icon: IconTypes, children?: JSX.Element }) => {
  return (
    <div class={cardContainer}>
      <div class={cardIconContainer}>
        <props.icon size={24} color={iconColor()} />
      </div>
      <span class={cardText}>{props.text}</span>
      <span>{props.children}</span>
    </div>
  )
}

