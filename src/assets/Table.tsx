import { For } from "solid-js"

export const Table = <T extends object,>(props: T[]) => {
  return (
    <div class="w-full rounded-lg border border-gray-200 overflow-hidden">
      <div class="bg-gray-100 p-4 font-medium grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] gap-4">
        {Object.keys(props[0]).map(key => (
          <span>{key}</span>
        ))}
      </div>
      <For each={props}>
        {(item) => {
          return (
            <div class="p-4 border-t border-gray-200 grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] gap-4">
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
