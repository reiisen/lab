import { createResource, createSignal, For, Index, Setter, Show, Signal } from "solid-js"
import { deleteLab, deleteRoom, readLabs, readRooms, toggleLab, toggleRoom, updateLab, updateRoom } from "../utils/fetch"
import { Lab, Room } from "../utils/types"
import { FiTool, FiTrash2 } from "solid-icons/fi";
import { CgUnavailable } from 'solid-icons/cg'
import { Editable } from "./ui/Editable";
import { Popup } from "./ui/Popup";
import { Portal } from "solid-js/web";

const opts = ['Labs', 'Rooms'];

type Data = {
  labs: Lab[],
  rooms: Room[]
};

const read = async (): Promise<Data> => {
  return {
    labs: await readLabs(),
    rooms: await readRooms()
  };
};

export const Manager = () => {
  return (
    <Root />
  );
};

export const Selector = (props: { setter: Setter<string> }) => {
  return (
    <div class="flex flex-col gap-4 bg-gray-100 h-full w-full py-3 px-2">
      <For each={opts}>
        {(item) => (
          <span
            onClick={() => { props.setter(item); }}
            class="cursor-pointer text-lg font-medium px-4 py-2 rounded-md hover:bg-gray-200 transition">
            {item}
          </span>
        )}
      </For>
    </div>
  );
};

const Editor = <T extends { id: number },>(props: { value: T, push: (id: number, data: Partial<T> | string) => any, refetcher: (info?: unknown) => Data | Promise<Data> | null | undefined }) => {
  const trigger = () => {
    return (
      <button
        onClick={() => { updateLab(props.value.id, {}); }}
        class="flex bg-yellow-200 text-yellow-800 px-4 py-2 rounded-md hover:bg-yellow-300 transition">
        <FiTool />
      </button>
    )
  }

  const content = () => {
    const [value, setValue] = createSignal(JSON.stringify(props.value, undefined, 2))
    return (
      <div class="flex flex-col gap-2">
        <span>Edit</span>
        <textarea value={value()} onInput={(e: any) => { setValue(e.target.value) }} class="bg-neutral-100 p-2 rounded-lg text-neutral-600" />
        <button class="rounded-lg p-3 bg-sky-300 hover:bg-sky-400 transition-all mt-4 w-1/2 self-center" onClick={() => { props.push(props.value.id, value()); setTimeout(() => props.refetcher(), 300) }}>Push Changes</button>
      </div>
    )
  }

  const popupProps = {
    trigger: trigger,
    content: content
  }

  return (
    <Popup {...popupProps} />
  )
}

const Toggle = <T extends { id: number },>(props: { value: T, push: (id: number) => any, refetcher: (info?: unknown) => Data | Promise<Data> | null | undefined }) => {
  const trigger = () => {
    return (
      <button
        onClick={() => { updateLab(props.value.id, {}); }}
        class="flex bg-neutral-300 text-neutral-800 px-4 py-2 rounded-md hover:bg-neutral-400 transition">
        <CgUnavailable />
      </button>
    )
  }

  const content = () => {
    return (
      <div class="flex flex-col gap-2">
        <span>Continuing will disable this entity for use. You can toggle this again anytime</span>
        <button class="rounded-lg p-3 bg-sky-300 hover:bg-sky-400 transition-all mt-4 w-1/2 self-center" onClick={() => { props.push(props.value.id); setTimeout(() => props.refetcher(), 300) }}>Continue</button>
      </div>
    )
  }

  const popupProps = {
    trigger: trigger,
    content: content
  }

  return (
    <Popup {...popupProps} />
  )
}

const Display = (props: { data: Data, current: string, refetcher: (info?: unknown) => Data | Promise<Data> | null | undefined }) => {
  return (
    <div class="flex-1">
      <Show when={props.current === 'Labs'}>
        <div class="flex flex-col gap-6 overflow-y-auto h-full">
          <For each={props.data.labs}>
            {(item) => {
              const keys = Object.keys(item);
              const values = Object.values(item);
              return (
                <div
                  class="flex flex-row items-center gap-4 rounded-lg bg-neutral-100 p-4 animate-fade-in-up"
                >
                  <div class="flex flex-col gap-1">
                    <Index each={keys}>
                      {(item, index) => (
                        <span class="text-sm text-gray-600">{`${keys[index]}: ${values[index]}`}</span>
                      )}
                    </Index>
                  </div>
                  <div class="flex gap-2 ml-auto self-start ">
                    <Editor value={item} push={updateLab} refetcher={props.refetcher} />
                    <Toggle value={item} push={toggleLab} refetcher={props.refetcher} />
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      </Show>

      <Show when={props.current === 'Rooms'}>
        <div class="flex flex-col gap-6 overflow-y-auto h-full">
          <For each={props.data.rooms}>
            {(item) => {
              const keys = Object.keys(item);
              const values = Object.values(item);
              return (
                <div
                  class="flex flex-row items-center gap-4 rounded-lg bg-neutral-100 p-4 animate-fade-in-up"
                >
                  <div class="flex flex-col gap-1">
                    <Index each={keys}>
                      {(item, index) => (
                        <span class="text-sm text-gray-600">{`${keys[index]}: ${values[index]}`}</span>
                      )}
                    </Index>
                  </div>
                  <div class="flex gap-2 ml-auto self-start ">
                    <Editor value={item} push={updateRoom} refetcher={props.refetcher} />
                    <Toggle value={item} push={toggleRoom} refetcher={props.refetcher} />
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      </Show>
    </div>
  );
};

const Root = () => {
  const [selected, setSelected] = createSignal('Labs');
  const [data, { mutate, refetch }] = createResource(read, { initialValue: { labs: [], rooms: [] } });
  return (
    <div class="flex flex-row bg-neutral-100 rounded-lg w-[90vw] h-[75vh] mt-2">
      <div class="flex w-1/4 h-full">
        <Selector setter={setSelected} />
      </div>
      <div class="flex-1 bg-neutral-50 rounded-lg p-6 h-full overflow-auto">
        <Show when={data.state === 'ready'}>
          <Display data={data()} current={selected()} refetcher={refetch} />
        </Show>
      </div>
    </div>
  );
};
