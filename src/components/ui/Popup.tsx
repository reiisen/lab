import { Dialog } from "@ark-ui/solid";
import { FiX } from "solid-icons/fi";
import { Component, createSignal, Show } from "solid-js";
import { Portal } from "solid-js/web";
import createPreventScroll from "solid-prevent-scroll";

const popupContent = `
  fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
  flex flex-col bg-neutral-100 rounded-lg p-6
`
const popupOverlay = `h-screen w-screen backdrop-blur-sm backdrop-brightness-75 fixed left-1 top-1 -translate-x-1 -translate-y-1`
const popupClose = `
  absolute top-0 right-0 bg-neutral-200 w-10 h-10 rounded-lg flex items-center
  justify-center hover:brightness-75 transition-brightness duration-200
`;

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
      <Dialog.Root open={open()} onOpenChange={() => setOpen(false)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              {props.title ? <Dialog.Title>Dialog Title</Dialog.Title> : <></>}
              <props.content />
              <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
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
      <Dialog.Root open={open()} onOpenChange={() => setOpen(false)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <props.content {...props.value} />
              <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
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
