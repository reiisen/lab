import { Component } from "solid-js";

export const Navbar: Component = () => {
  return (
    <div class="absolute flex flex-row gap-6 h-[3rem] p-2 ml-6 mt-6 shadow-md border-2 border-white bg-slate-100 font-bold text-slate-600 rounded-xl">
      <a
        href="/"
        class="hover:opacity-50 px-4 rounded transition"
      >
        Home
      </a>
      <a
        href="/reserve"
        class="hover:opacity-50 px-4 rounded transition"
      >
        Labs
      </a>
      <a
        href="/history"
        class="hover:opacity-50 px-4 rounded transition"
      >
        History
      </a>
      <a
        href="/dashboard"
        class="hover:opacity-50 px-4 rounded transition"
      >
        Dashboard
      </a>
    </div>
  );
};
