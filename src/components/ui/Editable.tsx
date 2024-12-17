import { Editable as Edit } from '@ark-ui/solid' import { Show } from 'solid-js'
export const Editable = (props: { init: string }) => (
  <Edit.Root placeholder="enter a value" value={props.init}>
    <Edit.Area class="h-full">
      <Edit.Input />
      <Edit.Preview />
    </Edit.Area>
    <Edit.Context>
      {(editable) => (
        <Edit.Control>
          <Show
            when={editable().editing}
            fallback={<Edit.EditTrigger>Edit</Edit.EditTrigger>}
          >
            <Edit.SubmitTrigger>Save</Edit.SubmitTrigger>
            <Edit.CancelTrigger>Cancel</Edit.CancelTrigger>
          </Show>
        </Edit.Control>
      )}
    </Edit.Context>
  </Edit.Root>
)
