import { Accessor, Setter, createSignal, createEffect, For, Show } from 'solid-js';
import { FilterLabel } from '../../utils/types';

export const CustomSelector = (props: {
  options: FilterLabel[],
  selectedSignal: [Accessor<FilterLabel>, Setter<FilterLabel>],
  onSelect?: (option: FilterLabel) => void,
  placeholder?: string,
  searchable?: boolean,
  clearable?: boolean
}) => {
  const {
    options,
    selectedSignal,
    onSelect,
    placeholder = 'Select an option',
    searchable = true,
    clearable = false
  } = props;

  const [selectedOption, setSelectedOption] = selectedSignal;

  let dropdownRef: HTMLDivElement | undefined;
  let triggerRef: HTMLDivElement | undefined;

  const [isOpen, setIsOpen] = createSignal(false);
  const [searchTerm, setSearchTerm] = createSignal('');
  const [focusedIndex, setFocusedIndex] = createSignal(-1);

  const filteredOptions = () =>
    options.filter(option =>
      option.name.toLowerCase().includes(searchTerm().toLowerCase())
    );

  const handleSelect = (option: FilterLabel) => {
    setSelectedOption(option);

    onSelect?.(option);

    setIsOpen(false);
    setSearchTerm('');
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef &&
      triggerRef &&
      !dropdownRef.contains(e.target as Node) &&
      !triggerRef.contains(e.target as Node)
    ) {
      setIsOpen(false);
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  };

  createEffect(() => {
    if (isOpen()) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen()) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev =>
          Math.min(prev + 1, filteredOptions().length - 1)
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        if (focusedIndex() >= 0) {
          handleSelect(filteredOptions()[focusedIndex()]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  createEffect(() => {
    if (isOpen()) {
      setFocusedIndex(-1);
    }
  });

  return (
    <div
      class="custom-selector relative w-64"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        ref={triggerRef}
        class="selector-trigger flex items-center justify-between p-2 border rounded-lg cursor-pointer"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span>
          {selectedOption().name}
        </span>
        <div class="flex items-center">
          {clearable && (
            <button
              class="mr-2 text-gray-500 hover:text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedOption(options[0]);
              }}
            >
              ✕
            </button>
          )}
          <span class="text-gray-500">▼</span>
        </div>
      </div>

      <Show when={isOpen()}>
        <div
          ref={dropdownRef}
          class={`
            absolute z-10 w-full mt-1 border rounded-lg shadow-lg bg-white
            transition-all duration-200 ease-in-out
            opacity-0 translate-y-[-10px]
            ${isOpen() ? 'opacity-100 translate-y-0' : ''}
          `}
        >
          <Show when={searchable}>
            <input
              type="text"
              placeholder="Search..."
              class="w-full p-2 border-b rounded-t-lg"
              value={searchTerm()}
              onInput={(e) => setSearchTerm(e.target.value)}
            />
          </Show>

          <ul class="max-h-60 overflow-y-auto rounded-b-lg">
            <For each={filteredOptions()} fallback={
              <li class="p-2 text-gray-500 text-center rounded-b-lg">
                No options found
              </li>
            }>
              {(option, index) => (
                <li
                  class={`
                    p-2 cursor-pointer
                    ${selectedOption().name === option.name ? 'bg-blue-100' : ''}
                    ${focusedIndex() === index() ? 'bg-gray-100' : ''}
                    hover:bg-gray-100
                    ${index() === filteredOptions().length - 1 ? 'rounded-b-lg' : ''}
                  `}
                  onClick={() => handleSelect(option)}
                >
                  {option.name}
                </li>
              )}
            </For>
          </ul>
        </div>
      </Show>
    </div>
  );
};
