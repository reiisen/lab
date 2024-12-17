import { Component } from "solid-js";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Router, Route } from "@solidjs/router";
import { Home } from "./components/Home";
import { Catalog, Labs } from "./components/Catalog";
import { Slots } from "./components/Slots";
import { History } from "./components/History";
import { Toast, Toaster } from "@ark-ui/solid";
import { toaster, ToasterElement } from "./components/ui/Toast";
import { Computers } from "./components/Computers";
import { Manager } from "./components/Manager";
import { Loading } from "./components/Loading";

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
            <Route path="/manage" component={Manager} />
          </Router>
        </div>

      </div>

      <ToasterElement />

      <Footer />
    </>
  );
};

export default App;
