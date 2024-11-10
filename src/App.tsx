import { Component } from "solid-js";
import { Navbar } from "./assets/Navbar";
import { Footer } from "./assets/Footer";
import { Router, Route } from "@solidjs/router";
import { Home } from "./assets/Home";
import { Labs } from "./assets/Labs";
import { Slots } from "./assets/Slots";
import { Crud } from "./assets/Crud";
import { History } from "./assets/History";

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
            <Route path="/labs" component={Labs} />
            <Route path="labs/pick/:id" component={Slots} />
            <Route path="/dashboard" component={Crud} />
            <Route path="/history" component={History} />
          </Router>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default App;
