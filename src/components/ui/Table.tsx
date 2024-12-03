import { For } from "solid-js";
import { _table_scrollable, _table_column, _table_container, _table_row } from "./styles/Table";


export const Table = <T extends object>(props: { data: T[] }) => {
  if (!props.data?.length) {
    return (
      <div class={_table_container}></div>
    )
  }

  const headers = Object.keys(props.data[0]);

  return (
    <div class={_table_container}>
      {/* Only render the table structure if we have headers */}
      {headers.length > 0 && (
        <>
          <div class={_table_column}>
            {headers.map((key) => (
              <span>{key}</span>
            ))}
          </div>
          <div class={_table_scrollable}>
            <For each={props.data}>
              {(item) => (
                <div class={_table_row}>
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
