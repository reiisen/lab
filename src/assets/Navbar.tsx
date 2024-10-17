import { Component } from "solid-js";

export const Navbar: Component = () => {
  return (
    <div class="flex flex-row gap-3">
      <a href="/">Home</a>
      <a href="/reserve">Labs</a>
      <a href="/history">History</a>
    </div>
  )
}
