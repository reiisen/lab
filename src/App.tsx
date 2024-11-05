import { Component } from "solid-js";
import { Navbar } from "./assets/Navbar";
import { Footer } from "./assets/Footer";
import { Router, Route } from "@solidjs/router";
import { Home } from "./assets/Home";
import { Reserve } from "./assets/Reserve";
import { Schedule } from "./assets/Schedule";
import { Crud } from "./assets/Crud";
import { AppHistory } from "./assets/History";

const App: Component = () => {
  const path = window.location.pathname;
  return (
    <>
      <div class="relative bg-slate-200 min-h-screen min-w-screen flex flex-col">
        {path !== '/dashboard' && <Navbar />}
        <div class="flex-1 w-full flex flex-col items-center justify-center">
          <Router>
            <Route path="/" component={Home} />
            <Route path="/reserve" component={Reserve} />
            <Route path="/schedule/:id" component={Schedule} />
            <Route path="/dashboard" component={Crud} />
            <Route path="/history" component={AppHistory} />
          </Router>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
