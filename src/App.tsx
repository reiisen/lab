import { Component } from "solid-js"
import { Navbar } from "./assets/Navbar"
import { Footer } from "./assets/Footer";
import { Router, Route } from "@solidjs/router";
import { Home } from "./assets/Home";
import { Reserve } from "./assets/Reserve";
import { Schedule } from "./assets/Schedule";

const App: Component = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/reserve" component={Reserve} />
        <Route path="/schedule/:id" component={Schedule} />
      </Router>
      <Footer />
    </>
  );
}

export default App;
