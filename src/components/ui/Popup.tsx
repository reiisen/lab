import { Dialog } from "@ark-ui/solid";
import { FiX } from "solid-icons/fi";
import { Component, createSignal, JSX, Show, Signal } from "solid-js";
import { Portal } from "solid-js/web";
import createPreventScroll from "solid-prevent-scroll";
import { _popup_x, _popup_content, _popup_overlay, _popup_header } from "./styles/Popup";


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

const Header = (props: { title?: string }) => {
  return (
    <div class={_popup_header}>
      <span>{props.title ? props.title : "Info"}</span>
      <Dialog.CloseTrigger class={_popup_x}>
        <FiX size={24} color={"#666666"} />
      </Dialog.CloseTrigger>
    </div>
  )
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
      <PopupRoot title={props.title} openSignal={[open, setOpen]}>{() => <props.content />}</PopupRoot>
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

const PopupRoot = <T extends object,>(props: { openSignal: Signal<boolean>, title?: string, value?: T, children?: (value?: T) => JSX.Element }) => {
  const [open, setOpen] = props.openSignal;
  return (
    <Dialog.Root open={open()} onOpenChange={() => setOpen(false)}>
      <Show when={open()}>
        <Portal>
          <Dialog.Backdrop class={_popup_overlay} />
          <Dialog.Positioner>
            <Dialog.Content class={_popup_content}>
              <Header title={props.title ? props.title : undefined} />
              {
                props.value && props.children ?
                  props.children(props.value) :
                  props.children ?
                    props.children() :
                    <></>
              }
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
          <div class={_popup_overlay} onClick={() => setOpen(false)} />
          <div class={_popup_content}>
            <div class={`cursor-pointer ${_popup_x}`} onClick={() => setOpen(false)}><FiX /></div>
            <props.content />
          </div>
        </Portal>
      </Show >
    </>
  )
}
