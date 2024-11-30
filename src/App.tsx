import { Component } from "solid-js";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Router, Route } from "@solidjs/router";
import { Home } from "./components/Home";
import { Catalog, Labs } from "./components/Catalog";
import { Slots } from "./components/Slots";
import { History } from "./components/History";
import { Toast, Toaster } from "@ark-ui/solid";
import { toaster } from "./components/ui/Toast";
import { Computers } from "./components/Computers";

const base = "relative bg-white min-h-screen min-w-screen flex flex-col"
const inner = "flex-1 w-full flex flex-col items-center justify-center"

const App: Component = () => {
  const path = window.location.pathname;
  return (
    <>
      <div class={base}>

        {path !== '/dashboard' && <Navbar />}

        <div class={inner}>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/labs" component={Catalog} />
            <Route path="/history" component={History} />
            <Route path="/lab/:id" component={Computers} />
            <Route path="/room/:rid" component={Slots} />
            <Route path="/lab/:id/c/:cid" component={Slots} />
          </Router>
        </div>

      </div>
      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast.Root>
            <Toast.Title>{toast().title}</Toast.Title>
            <Toast.Description>{toast().description}</Toast.Description>
          </Toast.Root>
        )}
      </Toaster>
      <Footer />
    </>
  );
};

export default App;
