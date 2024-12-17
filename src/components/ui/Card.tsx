import { IconTypes } from "solid-icons"
import { createSignal, JSX } from "solid-js"
import { colorCycle } from "../../utils/rgb"
import { _card_container, card_icon_container, _card_text } from "./styles/Card";


// const [iconColor, setIconColor] = createSignal("#666666");
// colorCycle(setIconColor);

export const CardWithIcon = (props: { text: string, icon: IconTypes, children?: JSX.Element, class?: string, iconColor?: string }) => {
  return (
    <div class={`${_card_container} ${props.class ? props.class : ""}`}>
      <div class={card_icon_container}>
        <props.icon size={24} color={props.iconColor ? props.iconColor : "#666666"} />
      </div>
      <span class={_card_text}>{props.text}</span>
      <span>{props.children}</span>
    </div>
  )
}
