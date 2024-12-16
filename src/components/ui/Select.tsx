import { Accessor, Setter, createSignal, createEffect, For, Show } from 'solid-js';
import { FilterLabel } from '../../utils/types';

// Custom Selector Dropdown Component
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
    searchable = true,
    clearable = true
  } = props;

  // Destructure the signal
  const [selectedOption, setSelectedOption] = selectedSignal;

  // State management
  const [isOpen, setIsOpen] = createSignal(false);
  const [searchTerm, setSearchTerm] = createSignal('');
  const [focusedIndex, setFocusedIndex] = createSignal(-1);

  // Filtered and searchable options
  const filteredOptions = () =>
    options.filter(option =>
      option.name.toLowerCase().includes(searchTerm().toLowerCase())
    );

  // Handle option selection
  const handleSelect = (option: FilterLabel) => {
    // Update selected option
    setSelectedOption(option);

    // Call onSelect if provided
    onSelect?.(option);

    // Close dropdown
    setIsOpen(false);
    setSearchTerm('');
  };

  // Handle clearing selection
  const handleClear = () => {
    // This would need to be adjusted based on your specific requirements
    // If you never want it to be null, you might want to reset to a default option
    const defaultOption = options[0]; // Or however you want to handle this
    setSelectedOption(defaultOption);
    onSelect?.(defaultOption);
  };

  // Keyboard navigation
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

  // Reset focused index when options change
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
        class="selector-trigger flex items-center justify-between p-2 border rounded cursor-pointer"
        onClick={() => setIsOpen(!isOpen())}
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
                handleClear();
              }}
            >
              ✕
            </button>
          )}
          <span class="text-gray-500">▼</span>
        </div>
      </div>

      <Show when={isOpen()}>
        <div class="absolute z-10 w-full mt-1 border rounded shadow-lg bg-white">
          {/* Searchable input */}
          <Show when={searchable}>
            <input
              type="text"
              placeholder="Search..."
              class="w-full p-2 border-b"
              value={searchTerm()}
              onInput={(e) => setSearchTerm(e.target.value)}
            />
          </Show>

          {/* Options List */}
          <ul class="max-h-60 overflow-y-auto">
            <For each={filteredOptions()} fallback={
              <li class="p-2 text-gray-500 text-center">
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
