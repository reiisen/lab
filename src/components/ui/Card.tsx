import { IconTypes } from "solid-icons"
import { createSignal, JSX } from "solid-js"
import { colorCycle } from "../../utils/rgb"
import { cardContainer, cardIconContainer, cardText } from "./styles/Card";


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
