import { Component } from "solid-js";

export const Footer: Component = () => {
  return (
    <div class="flex flex-row gap-6 h-[5vh] px-5 bg-gray-800 shadow-md">
      <a
        href="/"
        class="text-gray-100 hover:bg-gray-700 px-4 py-2 rounded transition"
      >
        Home
      </a>
      <a
        href="/reserve"
        class="text-gray-100 hover:bg-gray-700 px-4 py-2 rounded transition"
      >
        Labs
      </a>
      <a
        href="/history"
        class="text-gray-100 hover:bg-gray-700 px-4 py-2 rounded transition"
      >
        History
      </a>
    </div>
  );
};
