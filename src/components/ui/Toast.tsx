import { createToaster, Toast, Toaster } from '@ark-ui/solid'
import { createSignal } from 'solid-js'

export const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 24,
})

export function toast(message: string, description?: string) {
  toaster.create({
    title: message,
    description: description ? description : "",
    type: 'info',
  })
}
