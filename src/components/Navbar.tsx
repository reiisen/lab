import { Component } from "solid-js";

export const Navbar: Component = () => {
  return (
    <div class="text-zinc-100 flex flex-row gap-6 px-5 bg-black shadow-md">
      <a href="/" class="hover:opacity-50 px-4 py-5 rounded transition">
        Home
      </a>
      <a href="/labs" class="hover:opacity-50 px-4 py-5 rounded transition">
        Labs
      </a>
      <a href="/history" class="hover:opacity-50 px-4 py-5 rounded transition">
        History
      </a>
    </div>
  );
};
