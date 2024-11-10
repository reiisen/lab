import { For } from "solid-js"

const tableContainer = "w-full rounded-lg border border-gray-200 overflow-hidden";
const tableColumn = "bg-gray-100 p-4 font-medium grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] gap-4"
const tableRow = "p-4 border-t border-gray-200 grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] gap-4"

export const Table = <T extends object,>(props: { data: T[] }) => {
  return (
    <div class={tableContainer}>
      <div class={tableColumn}>
        {Object.keys(props.data[0]).map(key => (
          <span>{key}</span>
        ))}
      </div>
      <For each={props.data}>
        {(item) => {
          return (
            <div class={tableRow}>
              {Object.values(item as object).map(value => (
                <span>{`${value}`}</span>
              ))}
            </div>
          )
        }}
      </For>
    </div>
  )
}
