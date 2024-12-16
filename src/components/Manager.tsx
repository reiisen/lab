import { createResource, createSignal, For, Setter, Show, Signal } from "solid-js"
import { readLabs, readRooms } from "../utils/fetch"
import { Lab, Room } from "../utils/types"

const opts = ['Labs', 'Rooms'];

type Data = {
  labs: Lab[],
  rooms: Room[]
};

const read = async (): Promise<Data> => {
  return {
    labs: await readLabs(),
    rooms: await readRooms()
  }
};

export const Selector = (props: { setter: Setter<string>, selected: string }) => {
  return (
    <div class="flex space-x-4 mb-4 bg-gray-100 p-2 rounded-lg">
      <For each={opts}>
        {(item) => (
          <button
            onClick={() => props.setter(item)}
            class={`
              px-4 py-2 rounded-md transition-colors duration-200
              ${props.selected === item
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
            `}
          >
            {item}
          </button>
        )}
      </For>
    </div>
  )
}

const LabCard = (props: { lab: Lab }) => {
  const { lab } = props;
  return (
    <div class="bg-white shadow-md rounded-lg p-4 mb-3">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold text-gray-800">{lab.name}</h3>
        <span class="text-sm text-gray-500">{lab.id}</span>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div>
          <p class="text-sm text-gray-600">Name: {lab.name}</p>
        </div>
      </div>
    </div>
  )
}

const RoomCard = (props: { room: Room }) => {
  const { room } = props;
  return (
    <div class="bg-white shadow-md rounded-lg p-4 mb-3">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold text-gray-800">{room.name}</h3>
        <span class="text-sm text-gray-500">{room.id}</span>
      </div>
    </div>
  )
}

const Display = (props: { data: Data, current: string }) => {
  return (
    <div class="grid gap-4">
      <Show when={props.current === 'Labs'}>
        <For each={props.data.labs}>
          {(item) => <LabCard lab={item} />}
        </For>
      </Show>
      <Show when={props.current === 'Rooms'}>
        <For each={props.data.rooms}>
          {(item) => <RoomCard room={item} />}
        </For>
      </Show>
    </div>
  )
}

export const Manager = () => {
  const [selected, setSelected] = createSignal('Labs');
  const [data] = createResource(read, { initialValue: { labs: [], rooms: [] } })

  return (
    <div class="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 class="text-2xl font-bold mb-6 text-gray-900">Facility Management</h1>
      <Selector setter={setSelected} selected={selected()} />
      <Show
        when={!data.loading}
        fallback={<div class="text-center text-gray-600">Loading...</div>}
      >
        <Display data={data()} current={selected()} />
      </Show>
    </div>
  )
}
