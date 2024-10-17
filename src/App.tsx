import { Component } from "solid-js"
import { Navbar } from "./assets/Navbar"
import { Footer } from "./assets/Footer";
import { Router, Route } from "@solidjs/router";
import { Home } from "./assets/Home";
import { Reserve } from "./assets/Reserve";

const App: Component = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/reserve" component={Reserve} />
      </Router>
      <Footer />
    </>
  );
}

export default App;
