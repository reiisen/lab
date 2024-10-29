import { Component } from "solid-js";

export const Footer: Component = () => {
  return (
    <div class="flex flex-row gap-3 p-4 bg-gray-800 text-gray-100 justify-center shadow-inner">
      <a href="" class="hover:bg-gray-700 px-4 py-2 rounded transition">
        About
      </a>
      <a href="" class="hover:bg-gray-700 px-4 py-2 rounded transition">
        FAQ
      </a>
      <a href="" class="hover:bg-gray-700 px-4 py-2 rounded transition">
        Report a bug
      </a>
    </div>
  );
};
