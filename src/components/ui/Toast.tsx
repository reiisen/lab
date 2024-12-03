import { createToaster, CreateToasterReturn, Toast, Toaster } from '@ark-ui/solid'
import { createSignal } from 'solid-js'
import { _toast_container, _toast_description, _toast_title } from './styles/Toast'

export const toaster = createToaster({
  placement: 'top-end',
  overlap: false,
  gap: 24,
})

export function toast(title: string, description?: string, type?: string) {
  toaster.create({
    title: title,
    description: description ? description : "",
    type: type ? type : 'info',
  })
}

export const ToasterElement = () => {
  return (
    <Toaster toaster={toaster}>
      {(toast) => (
        <Toast.Root class={_toast_container}>
          <Toast.Title class={_toast_title}>{toast().title}</Toast.Title>
          <Toast.Description class={_toast_description}>{toast().description}</Toast.Description>
        </Toast.Root>
      )}
    </Toaster>
  )
}
