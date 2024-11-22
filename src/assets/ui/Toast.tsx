import { Component, createSignal, Show } from "solid-js"
import { Portal } from "solid-js/web"

const toastStyle = "fixed w-screen h-screen bg-black top-0 left-0 translate";
const [visible, setVisible] = createSignal(false);
const [message, setMessage] = createSignal("");

export const Toast: Component = () => {
  return (
    <Show when={visible()}>
      <Portal>
        <div class={toastStyle}>
          {message()}
        </div>
      </Portal>
    </Show>
  )
}

export async function toast(message: string) {
  setMessage(message);
  setVisible(true);
  setTimeout(() => setVisible(false), 2000);
}

setInterval(() => console.log(visible()), 500);
