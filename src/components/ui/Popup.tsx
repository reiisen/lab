import { Dialog } from "@ark-ui/solid";
import { FiX } from "solid-icons/fi";
import { Component, createSignal, JSX, Show, Signal } from "solid-js";
import { Portal } from "solid-js/web";
import createPreventScroll from "solid-prevent-scroll";
import { popupClose, popupContent, popupOverlay } from "./styles/Popup";


type PopupProps = {
  trigger: Component,
  content: Component,
  title?: string
}

type PopupWithObjectProps<T extends object> = {
  value: T
  trigger: Component,
  content: Component<T>,
  title?: string
}

export const Popup = (props: PopupProps) => {
  const [open, setOpen] = createSignal<boolean>(false);
  return (
    <>
      <div
        class="cursor-pointer"
        onClick={
          () => {
            setOpen(true);

            const handleEscape = (event: KeyboardEvent) => {
              if (event.key === 'Escape') {
                setOpen(false);
                document.removeEventListener('keydown', handleEscape);
              }
            };

            document.addEventListener('keydown', handleEscape);
          }}>
        <props.trigger />
      </div>
      <PopupRoot openSignal={[open, setOpen]}>{() => <props.content />}</PopupRoot>
    </>
  )
}

export const PopupWithObject = <T extends object,>(props: PopupWithObjectProps<T>) => {
  const [open, setOpen] = createSignal<boolean>(false);
  return (
    <>
      <div
        class="cursor-pointer"
        onClick={
          () => {
            setOpen(true);

            const handleEscape = (event: KeyboardEvent) => {
              if (event.key === 'Escape') {
                setOpen(false);
                document.removeEventListener('keydown', handleEscape);
              }
            };

            document.addEventListener('keydown', handleEscape);
          }}>
        <props.trigger />
      </div>
      <PopupRoot<typeof props.value> openSignal={[open, setOpen]} value={props.value} >{(value) => <props.content {...value!} />}</PopupRoot>
    </>
  )
}

const PopupRoot = <T extends object,>(props: { openSignal: Signal<boolean>, value?: T, children?: (value?: T) => JSX.Element }) => {
  const [open, setOpen] = props.openSignal;
  return (
    <Dialog.Root open={open()} onOpenChange={() => setOpen(false)}>
      <Show when={open()}>
        <Portal>
          <Dialog.Backdrop class={popupOverlay} />
          <Dialog.Positioner>
            <Dialog.Content class={popupContent}>
              {
                props.value && props.children ?
                  props.children(props.value) :
                  props.children ?
                    props.children() :
                    <></>
              }
              <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Show>
    </Dialog.Root>
  )
}

// export const Popup = <T extends object,>(props: { value: T, trigger: Component, content: Component<T> }) => {
//
//   const [open, setOpen] = createSignal<boolean>(false);
//
//   //scroll-stop function from corvu, thanks
//   createPreventScroll({
//     enabled: () => open(), // default = true
//     hideScrollbar: true, // default
//     preventScrollbarShift: true, // default
//     preventScrollbarShiftMode: 'padding', // default, `padding` or `margin`
//     restoreScrollPosition: true, // default
//     allowPinchZoom: false, // default
//   })
//   return (
//     <>
//       <div
//         class="cursor-pointer"
//         onClick={
//           () => {
//             setOpen(true);
//
//             const handleEscape = (event: KeyboardEvent) => {
//               if (event.key === 'Escape') {
//                 setOpen(false);
//                 document.removeEventListener('keydown', handleEscape);
//               }
//             };
//
//             document.addEventListener('keydown', handleEscape);
//           }}>
//         <props.trigger />
//       </div>
//       <Show when={open()}>
//         <Portal>
//           <div class={popupOverlay} onClick={() => setOpen(false)} />
//           <div class={popupContent}>
//             <div class={`cursor-pointer ${popupClose}`} onClick={() => setOpen(false)}><FiX /></div>
//             <props.content {...props.value} />
//           </div>
//         </Portal>
//       </Show >
//     </>
//   )
// }


export const BasicPopup = (props: { trigger: Component, content: Component }) => {
  const [open, setOpen] = createSignal<boolean>(false);

  //scroll-stop function from corvu, thanks
  createPreventScroll({
    enabled: () => open(), // default = true
    hideScrollbar: true, // default
    preventScrollbarShift: true, // default
    preventScrollbarShiftMode: 'padding', // default, `padding` or `margin`
    restoreScrollPosition: true, // default
    allowPinchZoom: false, // default
  })
  return (
    <>
      <div
        class="cursor-pointer"
        onClick={
          () => {
            setOpen(true);

            const handleEscape = (event: KeyboardEvent) => {
              if (event.key === 'Escape') {
                setOpen(false);
                document.removeEventListener('keydown', handleEscape);
              }
            };

            document.addEventListener('keydown', handleEscape);
          }}>
        <props.trigger />
      </div>
      <Show when={open()}>
        <Portal>
          <div class={popupOverlay} onClick={() => setOpen(false)} />
          <div class={popupContent}>
            <div class={`cursor-pointer ${popupClose}`} onClick={() => setOpen(false)}><FiX /></div>
            <props.content />
          </div>
        </Portal>
      </Show >
    </>
  )
}
