import { Component } from "solid-js";

export const Footer: Component = () => {
  return (
    <div class="text-zinc-100 flex flex-row gap-6 px-5 bg-black shadow-md">
      <span class="text-2xl">Project Labo</span>
      <a
        href="/"
        class="hover:bg-gray-700 px-4 py-2 rounded transition"
      >
        Home
      </a>
      <a
        href="/reserve"
        class="hover:bg-gray-700 px-4 py-2 rounded transition"
      >
        Labs
      </a>
      <a
        href="/history"
        class="hover:bg-gray-700 px-4 py-2 rounded transition"
      >
        History
      </a>
    </div>
  );
};
