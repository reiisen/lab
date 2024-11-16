import { For } from "solid-js";

const tableContainer =
  "w-full rounded-lg border border-gray-200 overflow-hidden";
const tableColumn =
  "bg-gray-100 p-4 font-medium grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] gap-4";
const tableRow =
  "p-4 border-t border-gray-200 grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] gap-4";
const scrollableRowsContainer = "max-h-96 overflow-y-auto"; // Adjust max height as needed

export const Table = <T extends object>(props: { data: T[] }) => {
  if (!props.data?.length) {
    return (
      <div class={tableContainer}></div>
    )
  }

  const headers = Object.keys(props.data[0]);

  return (
    <div class={tableContainer}>
      {/* Only render the table structure if we have headers */}
      {headers.length > 0 && (
        <>
          <div class={tableColumn}>
            {headers.map((key) => (
              <span>{key}</span>
            ))}
          </div>
          <div class={scrollableRowsContainer}>
            <For each={props.data}>
              {(item) => (
                <div class={tableRow}>
                  {Object.values(item as object).map((value) => (
                    <span>{value ?? '-'}</span>
                  ))}
                </div>
              )}
            </For>
          </div>
        </>
      )}
    </div>
  );
};
